import React, { useState } from 'react';
import { Image, Keyboard, NativeSyntheticEvent, Pressable, StyleSheet, TextInput, TextInputEndEditingEventData, View } from 'react-native';
import { CustomText, Pip, EPipColor, IconButton, EButtonIcon, CustomButton } from '../../../components';
import { IPopUpProps } from '../../../components/PopUp';
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
    submitted: boolean;
}

const styles = StyleSheet.create({
    countContainer: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    sectionContainer: {
        paddingVertical: 24
    },
});

export const AddForm : React.FC<IPopUpProps> = ({ triggerClose, getStock, selectTabIndex }) => {
    const { storeStockItem } = useFileSystem();

    const [state, setState] = useState<IState>({ name: '', greenValue: 1, submitted: false });
    const [errors, setErrors] = useState<IErrors>({ name: '', greenValue: '' });

    const resetState = () => {
        setState({ name: '', greenValue: 1, submitted: false });
        setErrors({ name: '', greenValue: '' });
    }

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
            setErrors({ ...errors, name: 'Please enter a valid name for the item' });
        } else {
            setErrors({ ...errors, name: '' });
        }
    }

    const validateValue = (value: number) => {
        if(value < 1) {
            setErrors({ ...errors, greenValue: 'Value must be more than 0' });
        } else {
            setErrors({ ...errors, greenValue: '' });
        }
    }

    const validate = () => {
        let errors: IErrors = { name: '', greenValue: '' };
        let hasErrors = false;

        if((state.name) === '') {
            errors.name = 'Please enter a valid name for the item';
            hasErrors = true;
        } else {
            errors.name = '';
        }

        if(state.greenValue < 1) {
            errors.greenValue = 'Value must be more than 0';
            hasErrors = true;
        } else {
            errors.greenValue = '';
        }

        setErrors(errors);

        return hasErrors;
    }

    const addItem = async () => {
        setState({ ...state, submitted: true });

        if(validate()) {
            return;
        }

        const item : IStockItem = {
            name: state.name,
            value: 0,
            greenValue: state.greenValue,
        }

        storeStockItem(item)
        .then(async () => {
            await getStock();
            await triggerClose();
            resetState();
            !!selectTabIndex && selectTabIndex(1);
        })
        .catch((e) => console.log(`ERROR:`, e));
    }

    const isButtonDisabled = () => {
        if(!!errors.name || !!errors.greenValue || state.name === '' || state.greenValue < 1) {
            return true;
        } else {
            return false;
        }
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
                <Pressable onPress={() => {
                    triggerClose();
                    setState({ name: '', greenValue: 1, submitted: false });
                    setErrors({ name:'', greenValue:'' });
                }}>
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                        }}
                        source={require('../../../../assets/cross.png')}
                    />
                </Pressable>
            </View>
            
            <View style={{ paddingVertical: 8 }}>
                <CustomText 
                    value='Add a new item'
                    textStyle={[text.primary, { fontSize: 16 }]}
                />
            </View>

            <View
                style={search.container}
            >
                <TextInput 
                    style={search.text}
                    placeholder={'Item Name'}
                    value={state.name}
                    onSubmitEditing={Keyboard.dismiss}
                    onChangeText={(text: string) => {
                        setState({ ...state, name: text });
                        if(!!errors.name) {
                            validateName(text);
                        }
                    }}
                    onEndEditing={(e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
                        validateName(e.nativeEvent.text);
                    }}
                />
            </View>

            {
                (state.submitted && !!errors.name) &&
                <CustomText 
                    value={errors.name}
                    textStyle={[text.secondary, { color: Color.PRed, marginTop: 2 }]}
                />
            }

            <View style={styles.sectionContainer} >
                <View style={styles.sectionHeaderContainer} >
                    <View
                        style={{ flexDirection: 'row' }}
                    >
                        <Pip color={EPipColor.Green} />
                        <CustomText 
                            value={`We're good`}
                            textStyle={[text.secondary, { paddingVertical: 8, width: 'auto', fontSize: 16 }]}
                        />
                    </View>

                    <View
                        style={styles.countContainer}
                    >
                        {
                            state.greenValue > 1 ?
                                <IconButton 
                                    icon={EButtonIcon.Minus}
                                    onPress={() => decrementValue('greenValue')}
                                    size={30}
                                />
                            :
                                <View 
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />
                        }
                        <CustomText 
                            textStyle={{
                                marginHorizontal: 24,
                                fontSize: 24,
                                color: Color.Black
                            }}
                            value={state.greenValue.toString()}
                        />
                        <IconButton 
                            icon={EButtonIcon.Plus}
                            onPress={() => incrementValue('greenValue')}
                            size={30}
                        />
                    </View>
                </View>

                {
                    (state.submitted && !!errors.greenValue) &&
                    <CustomText 
                        value={errors.greenValue}
                        textStyle={[text.secondary, { color: Color.PRed, marginTop: 2 }]}
                    />
                }
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
                    labelStyle={[text.primary, { color: Color.White, fontSize: 16, fontWeight: '700' }]}
                    onPress={addItem}
                    disabled={isButtonDisabled()}
                />
            </View>
        </View>
    );
}