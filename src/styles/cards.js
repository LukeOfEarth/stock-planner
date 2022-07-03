import { StyleSheet } from "react-native";
import { Color, FlexDirection } from '../constants';

export const cards = StyleSheet.create({
    stockItem: {
        width: '100%',
        flexDirection: FlexDirection.Row,
        backgroundColor: Color.White,
        borderRaduis: 5,
    }
});