import { StyleSheet } from "react-native";
import { Color, Display, FlexDirection, Overflow } from '../constants';

export const cards = StyleSheet.create({
    stockItem: {
        width: '100%',
        flexDirection: FlexDirection.Row,
        backgroundColor: Color.White,
        borderRaduis: 5,
    },
    addStockForm: {
        borderRadius: 5,
        height: 500,
        backgroundColor: Color.White,
        marginBottom: 24,
        overflow: Overflow.Hidden,
        display: Display.Flex,
        flex: 1,
        padding: 8,
        backgroundColor: Color.White
    }
});