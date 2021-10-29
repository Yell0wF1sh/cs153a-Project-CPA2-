import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { createBottomTabNavigator, BottomTabBar, } from '@react-navigation/bottom-tabs';
// import LinearGradient from 'react-native-linear-gradient';

import currency_converter_screen from '../screens/currency_converter.js'
import currency_converter_history_screen from '../screens/currency_converter_history.js';
import { HomeScreen } from '../App.js'
import test_screen from '../screens/test.js';

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    elevation: 0,
                    backgroundColor: 'white',
                    borderTopColor: 'transparent',
                    height: 50
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../assets/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#52d8f2' : 'black',
                                }}
                            />
                            <Text
                                style={{ color: focused ? '#52d8f2' : 'black', fontSize: 8, fontWeight: 600 }}
                            >HOME</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Converter"
                component={currency_converter_screen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../assets/interchange.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#52d8f2' : 'black',
                                }}
                            />
                            <Text
                                style={{ color: focused ? '#52d8f2' : 'black', fontSize: 8, fontWeight: 600 }}
                            >CONVERTER</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Test"
                component={test_screen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../assets/interchange.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#52d8f2' : 'black',
                                }}
                            />
                            <Text
                                style={{ color: focused ? '#52d8f2' : 'black', fontSize: 8, fontWeight: 600 }}
                            >TEST</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="History"
                component={currency_converter_history_screen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../assets/history.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#52d8f2' : 'black',
                                }}
                            />
                            <Text
                                style={{ color: focused ? '#52d8f2' : 'black', fontSize: 8, fontWeight: 600 }}
                            >HISTORY</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs