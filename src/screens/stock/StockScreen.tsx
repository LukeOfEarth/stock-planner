import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { screens, text } from '../../styles';
import { useFocusEffect } from '@react-navigation/native';
import { IStockItem } from '../../models';
import { useFileSystem } from '../../hooks/useFileSystem';
import { StockItem, StockSearch } from './components';
import { CustomText } from '../../components/CustomText';

export const StockScreen : React.FC<null> = () => {
    const { getAllStockItems } = useFileSystem();
    
    const [stock, setStock] = useState<Array<IStockItem>>([]);

    useFocusEffect(useCallback(() => {
        const getStock =async () => {
            const stock = await getAllStockItems();
            setStock(stock);    
        }

        getStock();
    }, []));

    const onSearchUpdated = (text: string) => {

    }

    return (
        <View
            style={{ ...screens.root, ...screens.stock }}
        >
            <ScrollView>
                <StockSearch 
                    onChangeText={onSearchUpdated}
                />
                {
                    !!stock.length &&
                    stock.map((el, index) => <StockItem item={el} key={index}/>)
                    ||
                    <View
                        style={{
                            paddingVertical: 8
                        }}
                    >
                        <CustomText
                            textStyle={text.primary}
                            value={'You have no items in your list! \n Use the Add screen to add some.'} 
                        />
                    </View>
                }
            </ScrollView>
        </View>
    );
}