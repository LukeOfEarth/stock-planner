import { Dimensions, StyleSheet } from "react-native";
import { Color } from '../constants';

export const screens = StyleSheet.create({
    root: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: Color.White
    },
    stock: {
        backgroundColor: Color.Green
    }
});