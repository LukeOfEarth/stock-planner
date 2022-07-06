import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
}

interface ISecondRouteProps {
    list: Array<IStockItem>;
    updateItemValue: Function;
    filter: string;
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
                    stock.map((el, index) => <StockItem index={index} item={el} updateItemValue={updateItemValue} key={index}/>)
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
  
const SecondRoute : React.FC<ISecondRouteProps> = ({ list, updateItemValue, filter }) => {
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
                    list?.map((el, index) => <StockItem index={index} item={el} updateItemValue={updateItemValue} key={index}/>)
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

export const ContentTabs : React.FC<IProps> = ({ stock, list, updateItemValue, filter }) => {
    const [index, setIndex] = useState<number>(0);
    const [routes] = useState<Array<ITabRoute>>([
      { key: 'first', title: 'Stock' },
      { key: 'second', title: 'List' },
    ]);

    const renderScene = SceneMap({
      first: () => <FirstRoute filter={filter} stock={stock} updateItemValue={updateItemValue} />,
      second: () => <SecondRoute filter={filter} list={list} updateItemValue={updateItemValue} />,
    });
  
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