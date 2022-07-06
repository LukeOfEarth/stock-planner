import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { CustomText } from '../../../components';
import { IStockItem } from '../../../models';
import { text } from '../../../styles';
import { StockItem } from './StockItem';
import { Tabs } from './Tabs';

interface IProps {
    stock: Array<IStockItem>;
    list: Array<IStockItem>;
    updateItemValue: Function;
    filter: string;
}

interface ITabRoute {
    key: string;
    title: string;
}

interface IFirstRouteProps {
    stock: Array<IStockItem>;
    updateItemValue: Function;
    filter: string;
    setItemHeight: Function;
}

interface ISecondRouteProps {
    list: Array<IStockItem>;
    updateItemValue: Function;
    filter: string;
    setItemHeight: Function;
}

const FirstRoute : React.FC<IFirstRouteProps> = ({ stock, updateItemValue, filter, setItemHeight }) => (
    <View
        style={{
            width: '100%',
        }}
    >
        {
            !!stock.length ?
                stock.map((el, index) => <StockItem setItemHeight={setItemHeight} index={index} item={el} updateItemValue={updateItemValue} key={index}/>)
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
    </View>
);
  
const SecondRoute : React.FC<ISecondRouteProps> = ({ list, updateItemValue, filter, setItemHeight }) => (
    <View>
        {
            !!list.length ?
                list?.map((el, index) => <StockItem setItemHeight={setItemHeight} index={index} item={el} updateItemValue={updateItemValue} key={index}/>)
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
    </View>
);

const initialLayout = { width: Dimensions.get('window').width };

export const ContentTabs : React.FC<IProps> = ({ stock, list, updateItemValue, filter }) => {
    const [index, setIndex] = useState<number>(0);
    const [routes] = useState<Array<ITabRoute>>([
      { key: 'first', title: 'Stock' },
      { key: 'second', title: 'List' },
    ]);

    const [itemHeight, setItemHeight] = useState<number>(0);

    console.log(`ITEM:`, itemHeight)

    const contentHeight = index === 0 ? itemHeight * stock.length : itemHeight * list.length;

    const renderScene = SceneMap({
      first: () => <FirstRoute setItemHeight={setItemHeight} filter={filter} stock={stock} updateItemValue={updateItemValue} />,
      second: () => <SecondRoute setItemHeight={setItemHeight} filter={filter} list={list} updateItemValue={updateItemValue} />,
    });
  
    return (
        <View style={{height: contentHeight, backgroundColor: 'white'}}>
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