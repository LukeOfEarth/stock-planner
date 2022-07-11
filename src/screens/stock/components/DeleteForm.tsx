import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { CustomButton, CustomText } from '../../../components';
import { IPopUpProps } from '../../../components/PopUp';
import { Color } from '../../../constants';
import { buttons, text } from '../../../styles';
import { useFileSystem } from '../../../hooks/useFileSystem';

export const DeleteForm : React.FC<IPopUpProps> = ({ getStock, triggerClose, item, clearSelectedItem }) => {
    const { deleteStockItem } = useFileSystem();

    const deleteItem = async () => {
        if(item === undefined) {
            return;
        }

        await deleteStockItem(item);
        await getStock();
        !!clearSelectedItem && clearSelectedItem();
        triggerClose();
    }

    return (
        <View style={{
            width: '100%',
            height: 'auto',
            backgroundColor: Color.White,
            paddingBottom: 24
        }}>
            <View style={{
                alignItems: 'flex-end'
            }}>
                <Pressable onPress={() => {
                    !!clearSelectedItem && clearSelectedItem();
                    triggerClose();
                }}>
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                        }}
                        source={require('../../../../assets/cross.png')}
                    />
                </Pressable>
            </View>

            <View style={{ paddingVertical: 8 }}>
                <CustomText 
                    value='Would you like to delete the following item?'
                    textStyle={[text.primary, { fontSize: 16 }]}
                />
            </View>

            <View style={{ paddingVertical: 8 }}>
                <CustomText 
                    value={!!item?.name ? item.name : 'Oops...No item found!'}
                    textStyle={[text.primary, { fontSize: 24, fontFamily: 'Inter-Bold' }]}
                />
            </View>

            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 8
                }}
            >
                <CustomButton 
                    label={'Delete'}
                    buttonStyle={buttons.delete}
                    labelStyle={[text.button, { color: Color.White }]}
                    onPress={deleteItem}
                />
            </View>
        </View>
    );
}