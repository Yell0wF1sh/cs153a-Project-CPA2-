import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function home_screen({ navigation }) {
    return (
        <View style={{ height: "100%", weight: '100%' }}>
            <Home />
        </View>
    )
}

const Home = () => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 1.0, backgroundColor: 'rgba(255,255,255,.5)' }}>
            <Text style={{ fontFamily: 'Jazz LET', fontSize: 30, textAlign: 'center', fontWeight: "bold" }}>Currency Converter</Text>
        </View>
    )

}

