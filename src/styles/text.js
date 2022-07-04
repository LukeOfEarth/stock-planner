import { StyleSheet } from 'react-native';
import { Color, Display, TextAlign } from '../constants';

export const text = StyleSheet.create({
    primary: {
        color: Color.Black,
        textAlign: TextAlign.Center,
        display: Display.Flex,
        width: '100%'
    },
    button: {
        color: Color.White,
        textAlign: TextAlign.Center,
        height: 40,
        lineHeight: 40,
    },
    cardDetail: {
        color: Color.Black,
        textAlign: TextAlign.Left,
        display: Display.Flex,
        width: '100%'
    }
});