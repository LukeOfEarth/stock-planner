import React from 'react';
import { TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton, CustomText, Pip } from '../../components';
import { PipColor } from '../../components/Pip';
import { Color } from '../../constants';
import { IStackScreenProps } from '../../navigation/Stack';
import { screens, text, buttons, search } from '../../styles';

export const AddScreen: React.FC<IStackScreenProps> = ({ navigation, route }) => {

    const insets = useSafeAreaInsets();
    
    return (
        <View style={[screens.root, { paddingTop: insets.top + 24 }]}>
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
                />
            </View>

            <View
                style={{
                    paddingVertical: 24,
                    flexDirection: 'row'
                }}
            >
                <Pip color={PipColor.Green} />
                <CustomText 
                    value={`We're good`}
                    textStyle={[text.secondary, {paddingVertical: 8}]}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    paddingVertical: 24,
                }}
            >
                <Pip color={PipColor.Orange} />
                <CustomText 
                    value={`We're running low`}
                    textStyle={[text.secondary, {paddingVertical: 8}]}
                />
            </View>
            
            <View
                style={{
                    position: 'absolute', 
                    bottom: insets.bottom + 24, 
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center'
                    // paddingHorizontal: 24
                }}
            >
                <CustomButton 
                    label={'Add'}
                    buttonStyle={buttons.primary}
                    labelStyle={[text.primary, { color: Color.White }]}
                    onPress={() => navigation.navigate('Stock')}
                />
            </View>
        </View>
    );
}