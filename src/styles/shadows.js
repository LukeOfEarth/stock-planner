import { StyleSheet } from 'react-native';
import { Color } from '../constants';

export const shadows = StyleSheet.create({
    primary: {
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        shadowColor: Color.Black,
        elevation: 3,
    }
});