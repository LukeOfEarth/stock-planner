import React from 'react';
import { Pressable, Image, GestureResponderEvent } from 'react-native';
import { Color } from '../constants';

export enum EButtonIcon {
    Plus,
    Minus
}

interface IProps {
    icon: EButtonIcon,
    onPress: (event: GestureResponderEvent) => void,
    size?: number,
}

export const IconButton : React.FC<IProps> = ({ icon, onPress, size }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [{
                backgroundColor: pressed ? Color.TransparentGrey : Color.White,
                width: size ?? 20,
                height: size ?? 20
            }]}
        >
            <Image 
                source={icon === EButtonIcon.Minus ? require('../../assets/minus.png') : require('../../assets/plus.png')}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </Pressable>
    );
}