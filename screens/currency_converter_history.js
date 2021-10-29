import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';

function currency_converter_history_screen({ navigation }) {
    return (
        <View style={{ height: "92%", weight: '100%' }}>
            <CurrencyConvertorHistory />
        </View>
    )
}

const CurrencyConvertorHistory = () => {
    const [history, setHistory] = useState([])
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
        },
    })

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@currencyConverter')
            let data = null
            if (jsonValue != null) {
                data = JSON.parse(jsonValue)
                setHistory(data)
            } else {
                setHistory([])
            }
        } catch (e) {
            console.dir(e)
        }
    }

    const clearHistory = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.dir(e)
        }
    }

    const renderHistory = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 2 }}>
                <Text style={{ fontSize: 16, backgroundColor: 'lightgreen', width: 100, textAlign: 'center' }}>{item.symbol1} {item.amountFrom}</Text>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>➔</Text>
                <Text style={{ fontSize: 16, backgroundColor: 'pink', width: 100, textAlign: 'center' }}>{item.symbol2} {item.amountTo}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <FlatList
                    data={history}
                    renderItem={renderHistory}
                />
            </ScrollView>
            <View>
                <Button
                    title='Clear History'
                    color='#d32f2f'
                    onPress={() => {
                        clearHistory()
                        setHistory([])
                    }
                    }
                />
            </View>
        </View>
    )
}

export default currency_converter_history_screen