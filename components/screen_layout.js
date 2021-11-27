import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const DefaultLayout = ({ children }) => {
    return (
        <View style={{ height: "92%", weight: '100%' }}>
            {children}
        </View>
    )
}