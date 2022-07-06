import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { screens, text } from '../../styles';
import { useFocusEffect } from '@react-navigation/native';
import { IStockItem } from '../../models';
import { useFileSystem } from '../../hooks/useFileSystem';
import { StockItem, StockSearch } from './components';
import { CustomText } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IStackScreenProps } from '../../navigation/Stack';
import { AddButton } from './components/AddButton';
import { StockTabs } from './components/StockTabs';
import { AddPopUp } from './components/AddPopUp';
import { ContentTabs } from './components/ListTabs';
import { StatusBar } from 'expo-status-bar';

export const StockScreen : React.FC<IStackScreenProps> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { getAllStockItems, storeStockItem } = useFileSystem();
    
    const [stock, setStock] = useState<Array<IStockItem>>([]);
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const [filter, setFilter] = useState<string>('');

    const stockDiff = useRef<Array<IStockItem>>([]);
    const updateItemTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const stockedItems = stock.filter(s => s.value >= s.greenValue);
    const listedItems = stock.filter(s => s.value < s.greenValue);

    const selectedItems = selectedTabIndex === 0 ? stockedItems : listedItems;

    const filteredItems = filter.trim() === '' ? selectedItems : selectedItems.filter(i => i.name.includes(filter)); 

    const filteredStock = filter.trim() === '' ? stockedItems : stockedItems.filter(i => i.name.includes(filter));
    const filteredList = filter.trim() === '' ? listedItems : listedItems.filter(i => i.name.includes(filter));

    const getStock = async () => {
        const stock = await getAllStockItems();
        setStock(stock);    
    }

    useFocusEffect(useCallback(() => {
        getStock();
    }, []));

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

    useEffect(() => {
        if(updateItemTimer.current != undefined) {
            clearTimeout(updateItemTimer.current);
        }

        updateItemTimer.current = setTimeout(() => updateStockDiff(), 1000);
    }, [stock]);

    const getMessage = () => {
        if(!!filter) {
            return `Your search didn't find any items.`;
        }

        if(selectedTabIndex === 0) {
            return 'Uh oh. . .\nLooks like you need to hit the shops.';
        }

        return `Nice!\nLooks like you're all stocked up.`;
    }

    return (
        <View
            style={[screens.root, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 100 }]}
        >
            <StatusBar style='auto' />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                }}
            >
                <StockSearch 
                    onChangeText={onSearchUpdated}
                />
                <ContentTabs filter={filter} stock={filteredStock} list={filteredList} updateItemValue={updateItemValue} />
            </ScrollView>
            <AddPopUp getStock={getStock} />
        </View>
    );
}