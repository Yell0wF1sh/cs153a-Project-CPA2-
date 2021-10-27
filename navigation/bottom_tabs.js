import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { createBottomTabNavigator, BottomTabBar, } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

import { CurrencyConverter } from '../screens/currency_converter'
import { HomeScreen } from '../App'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    elevation: 0,
                    backgroundColor: 'white',
                    borderTopColor: 'transparent',
                    height: 100
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image />
                            <Text></Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Converter"
                component={CurrencyConverter}
            />
        </Tab.Navigator>
    )
}