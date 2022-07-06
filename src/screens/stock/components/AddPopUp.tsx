import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, LayoutChangeEvent, Dimensions } from 'react-native';
import { Color } from '../../../constants';
import { AddButton } from './AddButton';
import { AddForm } from './AddForm';

const ANIMATION_TIME = 500;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.Black,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 2
    },
    card: {
        backgroundColor: Color.White,
        position: 'absolute',
        right: 0,
        left: 0,
        padding: 24,
        zIndex: 3
    }
});

export const AddPopUp : React.FC<{}> = ({}) => {
    const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;
    const target = useRef<Animated.Value>(new Animated.Value(-1500)).current;
    const targetRef = useRef<number>(0);

    const [done, setDone] = useState<boolean>(false);

    const animateIn = () => {
        Animated.timing(opacity, {
            toValue: 0.3,
            duration: ANIMATION_TIME,
            useNativeDriver: true
        }).start();

        Animated.timing(target, {
            toValue: 0,
            duration: ANIMATION_TIME,
            useNativeDriver: false
        }).start();

        setTimeout(() => setDone(true), ANIMATION_TIME);
    }

    const animateOut = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: ANIMATION_TIME,
            useNativeDriver: true
        }).start();

        Animated.timing(target, {
            toValue: -1500,
            duration: ANIMATION_TIME,
            useNativeDriver: false
        }).start();

        setTimeout(() => setDone(false), ANIMATION_TIME);
    }

    const setTargetRef = (height: number) => {
        targetRef.current = Dimensions.get('screen').height - height;
    }

    return (
        <>
            <Animated.View style={[styles.container, { opacity: opacity }]} pointerEvents={done ? 'auto' : 'none'} />
            <Animated.View style={[styles.card, { bottom: target }]} onLayout={(e: LayoutChangeEvent) => setTargetRef(e.nativeEvent.layout.height)}>
                <AddForm triggerClose={animateOut} />
            </Animated.View>
            <AddButton onPress={animateIn} />
        </>
    );
}