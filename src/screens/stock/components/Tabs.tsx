import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationState, SceneRendererProps, TabBar } from 'react-native-tab-view';
import { CustomText } from '../../../components';
import { Color } from '../../../constants';

interface IProps {
    props: SceneRendererProps & {
        navigationState: NavigationState<{
            key: string;
            title: string;
        }>;
    }
}

const styles = StyleSheet.create({
    indicator: {
        backgroundColor: Color.White,
    },
    indicatorContainer: {
        backgroundColor: Color.White,
    }
});

export const Tabs : React.FC<IProps> = ({ props }) => (
    <TabBar
        {...props}
        indicatorStyle={[styles.indicator, { backgroundColor: props.navigationState.index === 0 ? Color.PGreen : Color.POrange }]}
        indicatorContainerStyle={styles.indicatorContainer}
        renderLabel={({ route, focused, color }) => <CustomText textStyle={{ fontSize: 16 }} value={route.title} />}
        tabStyle={{
            elevation: 0,
            shadowColor: Color.Transparent
        }}
        style={{
            backgroundColor: Color.Transparent,
            elevation: 0,
            shadowOffset: {
                width: 0, height: 0
            }
        }}
    />
);