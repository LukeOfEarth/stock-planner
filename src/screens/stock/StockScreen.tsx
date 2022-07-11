import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { screens, text } from '../../styles';
import { useFocusEffect } from '@react-navigation/native';
import { IStockItem } from '../../models';
import { useFileSystem } from '../../hooks/useFileSystem';
import { StockSearch } from './components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IStackScreenProps } from '../../navigation/Stack';
import PopUp, { EPopUpType } from '../../components/PopUp';
import ContentTabs from './components/ContentTabs';
import { StatusBar } from 'expo-status-bar';
import { CustomText } from '../../components';

type PopUpHandle = React.ElementRef<typeof PopUp>;
type TabHandle = React.ElementRef<typeof ContentTabs>;

export const StockScreen : React.FC<IStackScreenProps> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { getAllStockItems, storeStockItem } = useFileSystem();
    
    const [stock, setStock] = useState<Array<IStockItem>>([]);
    const [filter, setFilter] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<IStockItem | undefined>(undefined);

    const stockDiff = useRef<Array<IStockItem>>([]);
    const updateItemTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const popUpRef = useRef<PopUpHandle>(null);
    const tabRef = useRef<TabHandle>(null);

    const stockedItems = stock.filter(s => s.value >= s.greenValue);
    const listedItems = stock.filter(s => s.value < s.greenValue);

    const filteredStock = filter.trim() === '' ? stockedItems : stockedItems.filter(i => i.name.includes(filter));
    const filteredList = filter.trim() === '' ? listedItems : listedItems.filter(i => i.name.includes(filter));

    const getStock = async () => {
        const stock = await getAllStockItems();

        stock.sort((a, b) => {
            if(a.name > b.name) {
                return 1;
            }

            return -1;
        });

        setStock(stock);    
    }

    const onSearchUpdated = (text: string) => setFilter(text);

    const updateItemValue = (itemName: string, value: number) => {
        if(value < 0) {
            return;
        }

        let tempArr = stock;
        const index = tempArr.findIndex(t => t.name === itemName);

        let item = tempArr[index];
        item.value = value;
        tempArr[index] = item;

        stockDiff.current.push(item);
        setStock(tempArr.map(el => el));
    }

    const updateStockDiff = async () => {
        let promises: Array<Promise<void>> = [];
        stockDiff.current.forEach((s) => promises.push(storeStockItem(s)));
        Promise.all(promises);
    }

    const triggerPopUp = () => setTimeout(() => popUpRef.current?.trigger(), 100);

    const selectTabIndex = (index: number) => tabRef.current?.selectTabIndex(index);

    const selectItemForDeletion = (item: IStockItem) => {
        setSelectedItem(item);
        triggerPopUp();
    }

    const clearSelectedItem = () => setSelectedItem(undefined);

    const getPopUpType = () => {
        if(!!selectedItem) {
            return EPopUpType.Delete;
        }

        return EPopUpType.Add;
    }

    useEffect(() => {
        if(updateItemTimer.current != undefined) {
            clearTimeout(updateItemTimer.current);
        }

        updateItemTimer.current = setTimeout(() => updateStockDiff(), 1000);
    }, [stock]);

    useFocusEffect(useCallback(() => {
        getStock();
    }, []));

    return (
        <View
            style={[screens.root, { paddingTop: insets.top + 24, paddingBottom: insets.bottom }]}
        >
            <StatusBar style='auto' />
            <StockSearch onChangeText={onSearchUpdated} />
            {
                !!stock.length ?
                    <ContentTabs  
                        filter={filter} 
                        stock={filteredStock} 
                        list={filteredList} 
                        updateItemValue={updateItemValue}
                        selectItemForDeletion={selectItemForDeletion}
                        ref={tabRef}
                    />
                :
                    <View
                        style={{
                            paddingVertical: 24
                        }}
                    >
                        <CustomText 
                            textStyle={text.primary}
                            value={`You don't have any items in your list. \n Use the plus button to add some!`}
                        />
                    </View>
            }
            <PopUp ref={popUpRef} selectTabIndex={selectTabIndex} clearSelectedItem={clearSelectedItem} selectedItem={selectedItem} getStock={getStock} type={getPopUpType()} />
        </View>
    );
}