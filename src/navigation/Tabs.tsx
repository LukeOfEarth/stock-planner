import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StockScreen } from "../screens/stock/StockScreen";
import { AddScreen } from '../screens/add/AddScreen';

export type TabParamList = {
    Stock: undefined;
    Add: undefined;
    List: undefined;
};

const Tabs = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
    return (
        <Tabs.Navigator initialRouteName="Stock">
          <Tabs.Screen name="Stock" component={StockScreen} />
          <Tabs.Screen name="Add" component={AddScreen} />
          <Tabs.Screen name="List" component={StockScreen} />
        </Tabs.Navigator>
      );
}