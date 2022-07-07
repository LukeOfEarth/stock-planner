import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle, TouchableOpacity } from 'react-native';
import { Color } from '../constants';
import { IGradientProps } from '../models';
import { buttons } from '../styles';
import { CustomText } from './CustomText';

interface IProps {
    label?: string;
    buttonStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    onPress?: (event: GestureResponderEvent) => void
    gradientProps?: IGradientProps,
    disabled?: boolean
}

export const CustomButton : React.FC<IProps> = ({ label, buttonStyle, labelStyle, onPress, gradientProps, disabled = false }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[buttons.root, buttonStyle, (disabled && { backgroundColor: Color.DisabledGreyBG })]}
            disabled={disabled}
        >
            {
                !!gradientProps &&
                <LinearGradient 
                    colors={gradientProps.colors}
                    start={gradientProps.start}
                    end={gradientProps.end}
                    style={[gradientProps.style]}
                >
                    <CustomText 
                        textStyle={labelStyle}
                        value={label ?? ''}
                    />
                </LinearGradient>
                ||
                !!label &&
                <CustomText 
                    textStyle={[labelStyle, (disabled && {color: Color.DisabledGreyText})]}
                    value={label ?? ''}
                />
            }
        </TouchableOpacity>
    );
}