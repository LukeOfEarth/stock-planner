import React from 'react';
import { View } from 'react-native';
import { AlignItems, Color, JustifyContent } from '../constants';

export enum PipColor {
    Green,
    Orange,
    Red
}

interface IProps {
    color: PipColor
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
                backgroundColor: color === PipColor.Green ? Color.PGreen : color === PipColor.Orange ? Color.POrange : Color.PRed
            }}
        />
    </View>
);