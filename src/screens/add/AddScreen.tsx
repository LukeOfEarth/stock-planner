import React from 'react';
import { TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton, CustomText } from '../../components';
import { AlignItems, Color, JustifyContent } from '../../constants';
import { IStackScreenProps } from '../../navigation/Stack';
import { screens, text, buttons, search } from '../../styles';
import { AddStockForm } from './components';

export const AddScreen: React.FC<IStackScreenProps> = ({ navigation, route }) => {

    const insets = useSafeAreaInsets();
    
    return (
        <View style={[screens.root, { paddingTop: insets.top + 24 }]}>
            <View>
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

            <View>
                <CustomText 
                    value='Add a new item'
                    textStyle={[text.primary, {paddingVertical: 8}]}
                />
            </View>

            <View>
                <CustomText 
                    value='Add a new item'
                    textStyle={[text.primary, {paddingVertical: 8}]}
                />
            </View>
            {/* <AddStockForm /> */}
        </View>
    );
}