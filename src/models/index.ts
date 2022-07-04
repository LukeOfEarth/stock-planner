import * as React from 'react';
import { StyleProp, ViewProps } from 'react-native';

export * from './StockItem.model';

export interface IProvider {
    children: React.ReactElement
}

export interface ITransform {
    x: number,
    y: number
}

export interface IGradientProps {
    colors: Array<string>,
    start: ITransform
    end: ITransform
    style: StyleProp<ViewProps>
}