import React from 'react';
import { TextInput, View } from 'react-native';
import { search } from '../../../styles';

interface IProps {
    onChangeText: (text: string) => void
}

export const StockSearch : React.FC<IProps> = ({ onChangeText }) => {

    return (
        <View
            style={[search.container, { marginBottom: 8 }]}
        >
            <TextInput 
                style={search.text}
                onChangeText={onChangeText}
                placeholder={'Search for an item...'}
            />
        </View>
    );
}