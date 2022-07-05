import React from 'react';
import { Pressable, Image, GestureResponderEvent } from 'react-native';
import { Color } from '../constants';

interface IProps {
    onPress: (event: GestureResponderEvent) => void
}

export const BackButton : React.FC<IProps> = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [{
                backgroundColor: pressed ? Color.TransparentGrey : Color.White,
                width: 30,
                height: 30
            }]}
        >
            <Image 
                source={require('../../assets/back.png')}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </Pressable>
    );
}