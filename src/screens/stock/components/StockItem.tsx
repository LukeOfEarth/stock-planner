import React, { useState } from 'react';
import { View } from 'react-native';
import { IStockItem } from '../../../models';

interface IProps {
    item: IStockItem
}

interface IState {
    expanded: boolean
}

export const StockItem : React.FC<IProps> = ({ item }) => {

    const [state, setState] = useState<IState>({ expanded: false });

    return (
        <View>

        </View>
    );
}