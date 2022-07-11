import { StyleSheet } from 'react-native';
import { Color } from '../constants';

export const search = StyleSheet.create({
    text: {
        backgroundColor: Color.White,
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
    },
    container: {
        width: '100%',
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1
    }
});