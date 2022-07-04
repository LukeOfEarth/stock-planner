import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable } from 'react-native';
import { Color } from '../../../constants';

interface IProps {
    navigation: NativeStackNavigationProp<any>
}

export const AddButton : React.FC<IProps> = ({ navigation }) => {

    return (
        <Pressable
            style={({ pressed }) => [{
                position: 'absolute',
                bottom: -10,
                right: -10,
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: pressed ? Color.White : Color.PGreen
            }]}
            onPress={() => navigation.navigate('Add')}
        >

        </Pressable>
    );
}