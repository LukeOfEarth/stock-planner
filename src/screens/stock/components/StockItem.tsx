import React from 'react';
import { View, StyleSheet, LayoutChangeEvent} from 'react-native';
import { CustomText, EButtonIcon, EPipColor, IconButton, Pip } from '../../../components';
import { IStockItem } from '../../../models';

interface IProps {
    index: number;
    item: IStockItem;
    updateItemValue: Function;
    selectItemForDeletion?: Function;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 8,
        justifyContent: 'space-between',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    iconButton: {
        marginHorizontal: 4
    }
});

export const StockItem : React.FC<IProps> = ({ item, updateItemValue, index, selectItemForDeletion }) => {
    const getPipColor = () => {
        if(item.value === 0) {
            return EPipColor.Red;
        }

        if(item.value >= item.greenValue) {
            return EPipColor.Green;
        }

        return EPipColor.Orange;
    }
    
    return (
        <View style={[styles.container, { marginTop: index === 0 ? 16 : 8 } ]}>
            <View style={styles.textContainer}>
                <Pip color={getPipColor()}/>
                <CustomText
                    textStyle={{
                        fontSize: 18
                    }}
                    value={item.name}
                />
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.iconButton}>
                    <IconButton 
                        icon={item.value > 0 ? EButtonIcon.Minus : EButtonIcon.Delete}
                        onPress={
                            item.value > 0 ?
                                () => updateItemValue(item.name, (item.value - 1))
                            :
                                () => {
                                    !!selectItemForDeletion && selectItemForDeletion(item)
                                }
                        }
                    />
                </View>
                <CustomText 
                    textStyle={{
                        width: 50,
                        textAlign: 'center',
                        fontSize: 18
                    }}
                    value={item.value.toString()}
                />
                <View style={styles.iconButton}>
                    <IconButton 
                        icon={EButtonIcon.Plus}
                        onPress={() => updateItemValue(item.name, (item.value + 1))}
                    />
                </View>
            </View>
        </View>
    );
}