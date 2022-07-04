import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlignItems, Color, FlexDirection, JustifyContent } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';

export const TabBar = ({ state, descriptors, navigation }) => {

    const insets = useSafeAreaInsets();

    return (
        <LinearGradient 
            style={{ 
                paddingBottom: Math.ceil(insets.bottom),
                marginHorizontal: 24,
                borderTopRightRadius: 42,
                borderTopLeftRadius: 42,
                height: 84,
                padding: 1
            }}
            colors={[Color.Orange, Color.Pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View
                style={{
                    backgroundColor: Color.White,
                    width: '100%',
                    height: 84,
                    borderTopRightRadius: 42,
                    borderTopLeftRadius: 42,
                    flexDirection: FlexDirection.Row,
                    paddingHorizontal: 42,
                    alignItems: AlignItems.Center,
                    justifyContent: JustifyContent.Center
                }}
            >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
    
            const isFocused = state.index === index;
    
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };
    
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
    
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1, alignItems: AlignItems.Center, justifyContent: JustifyContent.Center }}
                key={index}
              >
                <Text style={{ color: isFocused ? Color.Pink : Color.Grey }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
          </View>
        </LinearGradient>
      );
}