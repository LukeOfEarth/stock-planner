import React from 'react';
import { TextInput, View } from 'react-native';
import { CustomButton, CustomText } from '../../../components';
import { AlignItems, Color, Display, JustifyContent } from '../../../constants';
import { buttons, cards, text } from '../../../styles';
import { shadows } from '../../../styles/shadows';

export const AddStockForm : React.FC<null> = ({}) => {

    return (
        <View style={[shadows.primary, {flex: 1}]}>
            <View style={cards.addStockForm}>
                <View
                    style={{
                        width: '100%',
                        display: Display.Flex
                    }}
                >
                </View>
                <View
                    style={{
                        width: '100%',
                        padding: 8
                    }}
                >
                    <CustomText 
                        textStyle={text.cardDetail}
                        value='Item Details'
                    />
                </View>

                <View>
                    <CustomText />
                    <TextInput />
                </View>
                
                <View
                    style={{
                        width: '100%',
                        paddingHorizontal: 8
                    }}
                >
                    <CustomButton
                        buttonStyle={buttons.root}
                        label={'Add item'}
                        labelStyle={text.button}
                        gradientProps={{
                            colors: [Color.Orange, Color.Pink],
                            start: { x: 0, y: 0 },
                            end: { x: 1, y: 1 },
                            style: {
                                width: '100%',
                                height: 40,
                                alignItems: AlignItems.Center,
                                justifyContent: JustifyContent.Center,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 5,
                            }
                        }}
                        onPress={() => console.log(`NEW LOG:`)}
                    />
                </View>

            </View>
        </View>
    );
}