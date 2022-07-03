import * as React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface IProps {
    textStyle?: StyleProp<TextStyle>,
    value: string
}

export const CustomText : React.FC<IProps> = ({ textStyle, value }) => {

    return (
        <Text
            style={textStyle}
        >
            {value}
        </Text>
    );
}