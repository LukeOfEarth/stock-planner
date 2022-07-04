import React from 'react';
import { View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { AlignItems, Color } from '../../constants';
import { screens, text } from '../../styles';
import { buttons } from '../../styles/buttons';

export const AddScreen: React.FC<null> = ({}) => {
    
    return (
        <View style={screens.root}>
            <CustomButton
                buttonStyle={buttons.root}
                label={'Add'}
                labelStyle={{ ...text.button }}
                gradientProps={{
                    colors: [Color.Orange, Color.Pink],
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 1 },
                    style: {
                        width: '100%',
                        height: 40,
                        alignItems: AlignItems.Center,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 5,
                    }
                }}
                onPress={() => console.log(`NEW LOG:`)}
            />
        </View>
    );
}