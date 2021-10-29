import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native'

function about_screen({ navigation }) {
    return (
        <View style={{ height: "100%", weight: '100%' }}>
            <About />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#54d7ff',
        borderWidth: 10,
        borderColor: '#0d49ff',
        borderRadius: 20,
        padding: 5,
    },
    text_header: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 600,
    },
    text_regular: {
        textAlign: 'center',
        fontSize: 18,
    }
})

const About = () => {
    return (
        <ScrollView style={{ height: '100%', weight: '100%', flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
                <View style={styles.container}>
                    <Text style={styles.text_header}>
                        This app is a currency converter
                    </Text>
                    <Text style={styles.text_regular}>
                        Currently includes 10 currencies for exchange:
                    </Text>
                    <Text style={styles.text_regular}>
                        Chinese Yuan, US Dollar, Japanese Yen, Euro, British Pound, South Korean Won, Canadian Dollar, Argentine Peso, Australian Dollar, Russian Ruble
                    </Text>
                </View>
                <View style={{ padding: 5 }}></View>
                <View style={styles.container}>
                    <Text style={styles.text_header}>Developer:</Text>
                    <Text style={styles.text_regular}>Steve Wang</Text>
                </View>
                <View style={{ padding: 5 }}></View>
                <View style={styles.container}>
                    <Text style={styles.text_header}>Contributions:</Text>
                    <Text style={styles.text_regular}>Icons by https://icons8.com/</Text>
                    <Text style={styles.text_regular}>API from https://fixer.io/</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default about_screen