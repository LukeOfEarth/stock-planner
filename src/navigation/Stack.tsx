import React from 'react';
import { StockScreen } from "../screens/stock/StockScreen";
import { AddScreen } from '../screens/add/AddScreen';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';

export interface IStackScreenProps {
    name: string;
    navigation: NativeStackNavigationProp<any>
    route: RouteProp<ParamListBase, any>;
}

interface IRouteProps {
    name: string;
    component: React.FC<IStackScreenProps>;
}

export type TabParamList = {
    Stock: undefined;
    Add: undefined;
};

const Stack = createNativeStackNavigator();

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Stock'>
                <Stack.Screen name="Stock" component={StockScreen} />
                <Stack.Screen name="Add" component={AddScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}