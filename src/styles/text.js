import { StyleSheet } from 'react-native';
import { Color, TextAlign } from '../constants';

export const text = StyleSheet.create({
    primary: {
        color: Color.Black,
        textAlign: TextAlign.Center
    },
    button: {
        color: Color.White,
        textAlign: TextAlign.Center,
    }
});