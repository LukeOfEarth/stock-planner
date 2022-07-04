import { StyleSheet } from 'react-native';
import { AlignItems, Overflow } from '../constants';

export const buttons = StyleSheet.create({
    root: {
        width: '100%',
        height: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
        overflow: Overflow.Hidden,
        alignItems: AlignItems.Center
    },
    primary: {

    }
});