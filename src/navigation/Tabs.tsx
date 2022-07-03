import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StockScreen } from "../screens/stock/StockScreen";

export type TabParamList = {
    Stock: undefined;
};

const Tabs = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
    return (
        <Tabs.Navigator initialRouteName="Stock">
          <Tabs.Screen name="Stock" component={StockScreen} />
        </Tabs.Navigator>
      );
}