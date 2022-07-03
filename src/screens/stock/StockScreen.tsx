import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { root } from '../../styles';
import { useFocusEffect } from '@react-navigation/native';
import { IStockItem } from '../../models';
import { useFileSystem } from '../../hooks/useFileSystem';
import { StockItem } from './components';

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

    return (
        <View
            style={root.container}
        >
            <ScrollView>
                {
                    stock.map(el => <StockItem item={el} />)
                }
            </ScrollView>
        </View>
    );
}