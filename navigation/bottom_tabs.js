import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { createBottomTabNavigator, BottomTabBar, } from '@react-navigation/bottom-tabs';
// import LinearGradient from 'react-native-linear-gradient';

import  currency_converter_screen  from '../screens/currency_converter.js'
import { HomeScreen } from '../App.js'

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
                                    width: 20,
                                    height: 20,
                                    tintColor: focused? 'purple' : 'black',
                                }}
                            />
                            <Text
                                style={{color: focused? 'purple' : 'black', fontSize: 8}}
                            >HOME</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Converter"
                component={currency_converter_screen}
            />
        </Tab.Navigator>
    )
}

export default Tabs