import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

export const DefaultLayout = ({ children }) => {
    return (
        // <ImageBackground
        //     source={require('../assets/background.jpg')}
        //     resizeMode='cover'
        //     style={{ height: "100%", weight: '100%', opacity: 0.8 }}
        //     blurRadius={30}
        // >
        <View style={{ height: "100%", weight: "100%" }}>
            {children}
        </View>
        // </ImageBackground>
    )
}