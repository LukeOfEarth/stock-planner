import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton, CustomText, Pip, BackButton, IconButton, EButtonIcon } from '../../components';
import { EPipColor } from '../../components/Pip';
import { Color } from '../../constants';
import { IStackScreenProps } from '../../navigation/Stack';
import { screens, text, buttons, search } from '../../styles';

interface IErrors {
    name: string;
    greenValue: string;
    orangeValue: string;
}
interface IState {
    name: string;
    greenValue: number;
    orangeValue: number;
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
    },
    sectionContainer: {
        paddingVertical: 24
    },
});

export const AddScreen: React.FC<IStackScreenProps> = ({ navigation, route }) => {

    const insets = useSafeAreaInsets();

    const [state, setState] = useState<IState>({ name: '', greenValue: 2, orangeValue: 1 });
    const [errors, setErrors] = useState<IErrors>({ name: '', greenValue: '', orangeValue: '' });

    const decrementValue = (key: string) => {
        if(key != 'greenValue' && key != 'orangeValue') {
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
        if(key != 'greenValue' && key != 'orangeValue') {
            return;
        }

        setState({ ...state, [key]: state[key as keyof IState] as number + 1 });

        if(!!errors[key as keyof IErrors]) {
            validate();
        }
    }

    const validate = (name? : string) => {
        let errors: IErrors = { name: '', greenValue: '', orangeValue: '' };
        let hasErrors = false;

        if((name ?? state.name) === '') {
            errors.name = 'Please enter a valid name for the item';
            hasErrors = true;
        }

        if(state.greenValue === 0) {
            errors.greenValue = 'Value must be more than 0';
            hasErrors = true;
        }

        if(state.orangeValue >= state.greenValue) {
            errors.orangeValue = `Value must be less than the assigned "We're good" value`;
            hasErrors = true;
        }

        setErrors(errors);

        return hasErrors;
    }

    const addItem = async () => {
        if(validate()) {
            return;
        }

        navigation.navigate('Stock');
    }
    
    return (
        <View style={[screens.root, { paddingTop: insets.top + 24 }]}>
            <BackButton onPress={() => navigation.navigate('Stock')} />
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
                            validate(text);
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
                        textStyle={[text.secondary, {paddingVertical: 8}]}
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
                            color: Color.PGreen
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

            <View style={styles.sectionContainer} >
                <View style={styles.sectionHeaderContainer} >
                    <Pip color={EPipColor.Orange} />
                    <CustomText 
                        value={`We need to get more`}
                        textStyle={[text.secondary, {paddingVertical: 8}]}
                    />
                </View>

                {
                    !!errors.orangeValue &&
                    <CustomText 
                        value={errors.orangeValue}
                        textStyle={[text.secondary, { color: Color.PRed, marginTop: 2 }]}
                    />
                }

                <View
                    style={styles.countContainer}
                >
                    <IconButton 
                        icon={EButtonIcon.Minus}
                        onPress={() => decrementValue('orangeValue')}
                        size={40}
                    />
                    <CustomText 
                        textStyle={{
                            marginHorizontal: 24,
                            fontSize: 32,
                            color: Color.POrange
                        }}
                        value={state.orangeValue.toString()}
                    />
                    <IconButton 
                        icon={EButtonIcon.Plus}
                        onPress={() => incrementValue('orangeValue')}
                        size={40}
                    />
                </View>
            </View>
            
            <View
                style={{
                    position: 'absolute', 
                    bottom: insets.bottom + 24, 
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}
            >
                <CustomButton 
                    label={'Add'}
                    buttonStyle={buttons.primary}
                    labelStyle={[text.primary, { color: Color.White }]}
                    onPress={addItem}
                />
            </View>
        </View>
    );
}