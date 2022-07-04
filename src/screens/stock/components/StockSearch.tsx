import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Color } from '../../../constants';

interface IProps {
    onChangeText: (text: string) => void
}

const styles = StyleSheet.create({
    search: {
        backgroundColor: Color.White,
        width: '100%',
        height: '100%',
        paddingHorizontal: 16
    },
    container: {
        width: '100%',
        height: 40,
        borderRadius: 8,
        overflow: 'hidden'
    }
});

export const StockSearch : React.FC<IProps> = ({ onChangeText }) => {

    return (
        <View
            style={styles.container}
        >
            <TextInput 
                style={styles.search}
                onChangeText={onChangeText}
                placeholder={'Search for an item...'}
            />
        </View>
    );
}