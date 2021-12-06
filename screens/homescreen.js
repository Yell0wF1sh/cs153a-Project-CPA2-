import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultLayout } from '../components/screen_layout';

function home_screen({ navigation }) {
    return (
        <View style={{ height: "100%", weight: '100%' }}>
            <Home />
        </View>
    )
}

const Home = () => {

    return (
        <DefaultLayout>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'notoserif', fontSize: 30, textAlign: 'center', fontWeight: "bold" }}>Currency Converter</Text>
            </View>
        </DefaultLayout>
    )

}

export default home_screen