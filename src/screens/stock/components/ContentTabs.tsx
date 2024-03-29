import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, Dimensions, ScrollView, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabView, SceneMap } from 'react-native-tab-view';
import { CustomText } from '../../../components';
import { IStockItem } from '../../../models';
import { text } from '../../../styles';
import { StockItem } from './StockItem';
import { Tabs } from './Tabs';

type IHandle = {
    selectTabIndex: (index: number) => void
}

interface IProps {
    stock: Array<IStockItem>;
    list: Array<IStockItem>;
    updateItemValue: Function;
    filter: string;
    selectItemForDeletion: Function;
}

interface ITabRoute {
    key: string;
    title: string;
}

interface IFirstRouteProps {
    stock: Array<IStockItem>;
    updateItemValue: Function;
    filter: string;
}

interface ISecondRouteProps {
    list: Array<IStockItem>;
    updateItemValue: Function;
    filter: string;
    selectItemForDeletion: Function;
}

const FirstRoute : React.FC<IFirstRouteProps> = ({ stock, updateItemValue, filter }) => {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: insets.bottom + 60
            }}
        >
            {
                !!stock.length ?
                    <FlatList
                        data={stock}
                        renderItem={({item, index}) => <StockItem index={index} item={item} updateItemValue={updateItemValue} />}
                        keyExtractor={item => item.name}
                    />
                :
                <View
                    style={{
                        paddingVertical: 24
                    }}
                >
                    <CustomText 
                        textStyle={text.primary}
                        value={!!filter ? `Your search didn't find any items.` : 'Uh oh. . .\nLooks like you need to hit the shops.'}
                    />
                </View>
            }
        </ScrollView>
    );
}
  
const SecondRoute : React.FC<ISecondRouteProps> = ({ list, updateItemValue, filter, selectItemForDeletion }) => {
    const insets = useSafeAreaInsets();
    
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: insets.bottom + 48
            }}
        >
            {
                !!list.length ?
                    <FlatList
                        data={list}
                        renderItem={({item, index}) => <StockItem selectItemForDeletion={selectItemForDeletion} index={index} item={item} updateItemValue={updateItemValue} />}
                        keyExtractor={item => item.name}
                    />
                :
                <View
                    style={{
                        paddingVertical: 24
                    }}
                >
                    <CustomText 
                        textStyle={text.primary}
                        value={!!filter ? `Your search didn't find any items.` : `Nice!\nLooks like you're all stocked up.`}
                    />
                </View>
            }
        </ScrollView>
    );
}

const initialLayout = { width: Dimensions.get('window').width };

const ContentTabs : React.ForwardRefRenderFunction<IHandle, IProps> = ({ stock, list, updateItemValue, filter, selectItemForDeletion }, ref) => {
    const [index, setIndex] = useState<number>(0);
    const [routes] = useState<Array<ITabRoute>>([
      { key: 'first', title: 'Stock' },
      { key: 'second', title: 'List' },
    ]);

    const renderScene = SceneMap({
      first: () => <FirstRoute filter={filter} stock={stock} updateItemValue={updateItemValue} />,
      second: () => <SecondRoute filter={filter} list={list} updateItemValue={updateItemValue} selectItemForDeletion={selectItemForDeletion} />,
    });

    useImperativeHandle(ref, () => ({
        selectTabIndex: (index: number) => setIndex(index)
    }));
    
    return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                swipeEnabled={true}
                renderTabBar={props => <Tabs props={props} />}
            />
        </View>
    );
  }

export default forwardRef(ContentTabs);