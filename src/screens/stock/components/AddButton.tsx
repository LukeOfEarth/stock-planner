import React from 'react';
import { GestureResponderEvent, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '../../../constants';

interface IProps {
    onPress: (event: GestureResponderEvent) => void
}

export const AddButton : React.FC<IProps> = ({ onPress }) => {
    const insets = useSafeAreaInsets();

    return (
        <Pressable
            style={({ pressed }) => [{
                position: 'absolute',
                bottom: insets.bottom + 24,
                right: 24,
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: pressed ? Color.TransparentGrey : Color.PGreen,
                alignItems: 'center',
                justifyContent: 'center'
            }]}
            onPress={onPress}
        >
            <Image 
                source={require('../../../../assets/plus.png')}
                style={{
                    width: 50,
                    height: 50,
                }}
            />
        </Pressable>
    );
}