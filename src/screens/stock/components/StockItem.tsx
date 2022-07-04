import React, { useState } from 'react';
import { View, GestureResponderEvent} from 'react-native';
import { CustomButton, CustomText } from '../../../components';
import { IStockItem } from '../../../models';
import { cards } from '../../../styles';

interface IProps {
    item: IStockItem
}

interface IState {
    expanded: boolean
}

export const StockItem : React.FC<IProps> = ({ item }) => {

    const [state, setState] = useState<IState>({ expanded: false });

    const toggleExpanded = (e: GestureResponderEvent) => setState({ ...state, expanded: !state.expanded });

    return (
        <View style={cards.stockItem}>
            <CustomText
                value={item.name}
            />
            <CustomButton
                onPress={toggleExpanded}
            />
        </View>
    );
}