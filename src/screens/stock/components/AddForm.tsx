import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { CustomText, Pip, EPipColor, IconButton, EButtonIcon, CustomButton } from '../../../components';
import { Color } from '../../../constants';
import { useFileSystem } from '../../../hooks/useFileSystem';
import { IStockItem } from '../../../models';
import { text, search, buttons } from '../../../styles';

interface IErrors {
    name: string;
    greenValue: string;
}

interface IState {
    name: string;
    greenValue: number;
}

interface IProps {
    triggerClose: Function;
}

const styles = StyleSheet.create({
    countContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionContainer: {
        paddingVertical: 24
    },
});

export const AddForm : React.FC<IProps> = ({ triggerClose }) => {
    const { storeStockItem } = useFileSystem();

    const [state, setState] = useState<IState>({ name: '', greenValue: 1 });
    const [errors, setErrors] = useState<IErrors>({ name: '', greenValue: '' });

    const decrementValue = (key: string) => {
        if(key != 'greenValue') {
            return;
        }

        if(state[key as keyof IState] > 0) {
            setState({ ...state, [key]: state[key as keyof IState] as number - 1 });
        }

        if(!!errors[key as keyof IErrors]) {
            validate();
        }
    }

    const incrementValue = (key: string) => {
        const value = (state.greenValue + 1);
        setState({ ...state, greenValue: value });

        if(!!errors.greenValue) {
            validateValue(value);
        }
    }

    const validateName = (name: string) => {
        if((name) === '') {
            errors.name = 'Please enter a valid name for the item';
        } else {
            errors.name = '';
        }
    }

    const validateValue = (value: number) => {
        if(value < 1) {
            errors.name = 'Value must be more than 0';
        } else {
            errors.name = '';
        }
    }

    const validate = () => {
        let errors: IErrors = { name: '', greenValue: '' };
        let hasErrors = false;

        hasErrors = true;

        setErrors(errors);

        return hasErrors;
    }

    const addItem = async () => {
        if(validate()) {
            return;
        }

        const item : IStockItem = {
            name: state.name,
            value: 0,
            greenValue: state.greenValue,
        }

        storeStockItem(item)
        .then(() => triggerClose())
        .catch((e) => console.log(`ERROR:`, e));
    }

    return (
        <View style={{
            width: '100%',
            height: 'auto',
            backgroundColor: Color.White,
            paddingBottom: 24
        }}>
            <View style={{
                alignItems: 'flex-end'
            }}>
                <Pressable onPress={() => triggerClose()}>
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            backgroundColor: 'green'
                        }}
                    >
                    </View>
                </Pressable>
            </View>
             <View style={{ paddingVertical: 8 }}>
                <CustomText 
                    value='Add a new item'
                    textStyle={text.primary}
                />
            </View>

            <View
                style={search.container}
            >
                <TextInput 
                    style={search.text}
                    placeholder={'Item Name'}
                    value={state.name}
                    onChangeText={(text: string) => {
                        setState({ ...state, name: text });
                        if(!!errors.name) {
                            validateName(text);
                        }
                    }}
                />
            </View>

            {
                !!errors.name &&
                <CustomText 
                    value={errors.name}
                    textStyle={[text.secondary, { color: Color.PRed, marginTop: 2 }]}
                />
            }

            <View style={styles.sectionContainer} >
                <View style={styles.sectionHeaderContainer} >
                    <Pip color={EPipColor.Green} />
                    <CustomText 
                        value={`We're good`}
                        textStyle={[text.secondary, { paddingVertical: 8, width: 'auto' }]}
                    />
                </View>

                {
                    !!errors.greenValue &&
                    <CustomText 
                        value={errors.greenValue}
                        textStyle={[text.secondary, { color: Color.PRed, marginTop: 2 }]}
                    />
                }

                <View
                    style={styles.countContainer}
                >
                    <IconButton 
                        icon={EButtonIcon.Minus}
                        onPress={() => decrementValue('greenValue')}
                        size={40}
                    />
                    <CustomText 
                        textStyle={{
                            marginHorizontal: 24,
                            fontSize: 32,
                            color: Color.Black
                        }}
                        value={state.greenValue.toString()}
                    />
                    <IconButton 
                        icon={EButtonIcon.Plus}
                        onPress={() => incrementValue('greenValue')}
                        size={40}
                    />
                </View>
            </View>
            
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}
            >
                <CustomButton 
                    label={'Add'}
                    buttonStyle={buttons.primary}
                    labelStyle={[text.primary, { color: Color.Black }]}
                    onPress={addItem}
                />
            </View>
        </View>
    );
}