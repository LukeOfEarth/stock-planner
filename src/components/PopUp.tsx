import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, Animated, Keyboard, EmitterSubscription } from 'react-native';
import { Color } from '../constants';
import { IStockItem } from '../models';
import { AddButton } from '../screens/stock/components/AddButton';
import { AddForm } from '../screens/stock/components/AddForm';
import { DeleteForm } from '../screens/stock/components/DeleteForm';

export enum EPopUpType {
    Delete,
    Add
}

interface IProps {
    getStock: Function;
    type: EPopUpType;
    selectedItem?: IStockItem;
    clearSelectedItem: Function;
    selectTabIndex: Function;
}

export interface IPopUpProps {
    triggerClose: Function;
    getStock: Function;
    item?: IStockItem;
    clearSelectedItem?: Function;
    selectTabIndex?: Function;
}

type IHandle = {
    trigger: () => void
}

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

const PopUp : React.ForwardRefRenderFunction<IHandle, IProps> = (props, ref) => {
    const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;
    const target = useRef<Animated.Value>(new Animated.Value(-1500)).current;

    const [done, setDone] = useState<boolean>(false);
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

    const avoidKeyboard = (height : number) => {
        if(done) {
            Animated.timing(target, {
                toValue: height,
                duration: 0,
                useNativeDriver: false
            }).start();
        }
    }

    const reset = () => {
        if(isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        if(done) {
            Animated.timing(target, {
                toValue: 0,
                duration: 0,
                useNativeDriver: false
            }).start();
        }
    }

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

    const animateOut = async () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: ANIMATION_TIME/2,
            useNativeDriver: true
        }).start();

        Animated.timing(target, {
            toValue: -1500,
            duration: ANIMATION_TIME/2,
            useNativeDriver: false
        }).start();

        await setTimeout(() => setDone(false), ANIMATION_TIME/2);
    }

    const renderContent : React.FC<IProps> = (props: IProps) => {
        switch(props.type) {
            case EPopUpType.Delete: {
                return <DeleteForm clearSelectedItem={props.clearSelectedItem} item={props.selectedItem} triggerClose={animateOut} getStock={props.getStock} />
            }
            default: {
                return <AddForm selectTabIndex={props.selectTabIndex} triggerClose={animateOut} getStock={props.getStock} />
            }
        }
    }
    
    useEffect(() => {
        const keyboardOpenListener = Keyboard.addListener('keyboardDidShow', (e) => {
            avoidKeyboard(e.endCoordinates.height);
        });

        let keyboardCloseListener : EmitterSubscription;
        
        if(done) {
            keyboardCloseListener = Keyboard.addListener('keyboardDidHide', () => {
                if(!isFirstRender) {
                    reset();
                }
            });
        }

        if(!done) {
            Keyboard.dismiss();
        }

        return () => {
            keyboardOpenListener.remove();
            if(keyboardCloseListener !== undefined) {
                keyboardCloseListener.remove();
            }
        }
    }, [done]);

    useImperativeHandle(ref, () => ({
        trigger: () => animateIn()
    }));

    return (
        <>
            <Animated.View style={[styles.container, { opacity: opacity }]} pointerEvents={done ? 'auto' : 'none'} />
            <Animated.View style={[styles.card, { bottom: target }]}>
                {renderContent(props)}
            </Animated.View>
            <AddButton onPress={animateIn} />
        </>
    );
}

export default forwardRef(PopUp);