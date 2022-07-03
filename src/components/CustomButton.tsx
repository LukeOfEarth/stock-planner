import * as React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, TextStyle, ViewStyle, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { CustomText } from './CustomText';

interface IProps {
    label?: string;
    buttonStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    onPress?: (event: GestureResponderEvent) => void
}

export const CustomButton : React.FC<IProps> = ({ label, buttonStyle, labelStyle, onPress }) => {
    return (
        <Pressable
            style={buttonStyle}
            onPress={onPress}
        >
            {

                !!label &&
                <CustomText 
                    textStyle={labelStyle}
                    value={label}
                />
            }
        </Pressable>
    );
}