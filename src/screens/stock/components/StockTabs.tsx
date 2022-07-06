import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { CustomText } from '../../../components';
import { Color } from '../../../constants';
import { IStockItem } from '../../../models';

interface IProps {
    selectedIndex: number;
    selectIndex: Function;
    stock: Array<IStockItem>;
    list: Array<IStockItem>;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8
    }
});

export const StockTabs : React.FC<IProps> = ({ selectedIndex, selectIndex }) => {
    return (
        <View style={styles.container}>
            <Pressable 
                style={({ pressed }) => [{
                    backgroundColor: selectedIndex === 0 ? Color.PGreen : Color.White,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    width: '50%'
                }]}
                onPress={() => selectIndex(0)}   
            >
                <CustomText 
                    value={'Stock'}
                />
            </Pressable>
            
            <Pressable 
                style={({ pressed }) => [{
                    backgroundColor: selectedIndex === 1 ? Color.POrange : Color.White,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    width: '50%'
                }]}
                onPress={() => selectIndex(1)}   
            >
                <CustomText 
                    value={'List'}
                />
            </Pressable>
        </View>
    )
}