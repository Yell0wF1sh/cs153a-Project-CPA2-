import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultLayout } from '../components/screen_layout';
import { HistoryCard } from '../components/component_templates';

function currency_converter_history_screen({ navigation }) {
    return (
        <DefaultLayout>
            <CurrencyConvertorHistory />
        </DefaultLayout>
    )
}

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const CurrencyConvertorHistory = () => {
    const [history, setHistory] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 10,
            paddingTop: 30,
        },
    })

    useEffect(() => {
        getData()
    }, [])

    const onRefresh = useCallback(() => {
        getData()
        setRefreshing(true)
        wait(200).then(() => setRefreshing(false))
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

    // const renderHistory = ({ item }) => {
    //     return (
    //         <View style={{ flex: 1, flexDirection: 'row', padding: 2 }}>
    //             <View style={{ flex: 3 }}><Text style={{ fontSize: 20, backgroundColor: 'lightgreen', textAlign: 'center' }}>{item.symbol1} {item.abbr1} {item.amountFrom}</Text></View>
    //             <View style={{ flex: 1 }}><Text style={{ fontSize: 20, textAlign: 'center' }}>➔</Text></View>
    //             <View style={{ flex: 3 }}><Text style={{ fontSize: 20, backgroundColor: 'pink', textAlign: 'center' }}>{item.symbol2} {item.abbr2} {item.amountTo}</Text></View>
    //         </View>
    //     )
    // }
    const renderHistory = ({ item }) => {
        return (
            <HistoryCard>
                <Text style={{ fontSize: 14, color: 'grey', }}>{item.symbol1} {item.abbr1} {item.amountFrom} ➔</Text>
                <Text style={{ fontSize: 20, }}>{item.symbol2} {item.abbr2} {item.amountTo}</Text>
                <Text style={{ fontSize: 10, color: 'lightgrey' }}>Converted on {item.time}</Text>
            </HistoryCard>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', paddingBottom: 3 }}>
                <Text style={{ fontSize: 40 }}>History</Text>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <FlatList
                    data={history}
                    renderItem={renderHistory}
                    style={{ paddingHorizontal: 10 }}
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
        </SafeAreaView>
    )
}

export default currency_converter_history_screen