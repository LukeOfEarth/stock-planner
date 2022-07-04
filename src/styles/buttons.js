import { StyleSheet } from 'react-native';
import { AlignItems, Overflow, JustifyContent, Color } from '../constants';

export const buttons = StyleSheet.create({
    root: {
        width: '100%',
        height: 40,
        paddingVertical: 8,
        borderRadius: 5,
        overflow: Overflow.Hidden,
        alignItems: AlignItems.Center,
        justifyContent: JustifyContent.Center
    },
    primary: {
        backgroundColor: Color.PGreen,
        borderRadius: 20,
    }
});