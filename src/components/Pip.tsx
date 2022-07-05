import React from 'react';
import { View } from 'react-native';
import { Color } from '../constants';

export enum EPipColor {
    Green,
    Orange,
    Red
}

interface IProps {
    color: EPipColor
}

export const Pip : React.FC<IProps> = ({ color }) => (
    <View
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 8
        }}
    >
        <View 
            style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: color === EPipColor.Green ? Color.PGreen : color === EPipColor.Orange ? Color.POrange : Color.PRed
            }}
        />
    </View>
);