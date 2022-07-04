import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, TextStyle, ViewStyle, View } from 'react-native';
import { IGradientProps } from '../models';
import { buttons } from '../styles/buttons';
import { CustomText } from './CustomText';
import { Color } from '../constants';

interface IProps {
    label?: string;
    buttonStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    onPress?: (event: GestureResponderEvent) => void
    gradientProps?: IGradientProps
}

export const CustomButton : React.FC<IProps> = ({ label, buttonStyle, labelStyle, onPress, gradientProps }) => {
    return (
        <Pressable
            style={{ ...buttons.root, ...buttonStyle }}
            onPress={onPress}
        >
            {
                !!gradientProps &&
                <LinearGradient 
                    colors={gradientProps.colors}
                    start={gradientProps.start}
                    end={gradientProps.end}
                    style={gradientProps.style}
                >
                    <CustomText 
                        textStyle={labelStyle}
                        value={label ?? ''}
                    />
                </LinearGradient>
                ||
                !!label &&
                <CustomText 
                    textStyle={labelStyle}
                    value={label ?? ''}
                />
            }
            {({ pressed }) => (
              <View
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: pressed ? Color.TransparentGrey : Color.Transparent
                }}
              />
            )}
        </Pressable>
    );
}