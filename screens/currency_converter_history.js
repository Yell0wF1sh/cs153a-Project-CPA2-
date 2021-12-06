import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView, Animated } from 'react-native';
import { Picker } from '@react-native-community/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultLayout } from '../components/screen_layout';
import { HistoryCard } from '../components/component_templates';
import { transform } from 'lodash';

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
    const [isFocused1, setIsFocused1] = useState(false)
    const scrollY = React.useRef(new Animated.Value(0)).current
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

    return (
        <SafeAreaView style={styles.container}>
            {/* <Image
                style={StyleSheet.absoluteFillObject}
            /> */}
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', paddingBottom: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 40 }}>History</Text>
                <TouchableOpacity
                    onPressIn={() => setIsFocused1(true)}
                    onPress={() => {
                        clearHistory()
                        setHistory([])
                    }}
                >
                    <Text style={isFocused1 ? { color: '#39C5BB', backgroundColor: '#fff', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 10 } : { color: 'white', backgroundColor: '#39C5BB', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 10 }}>Clear History</Text>
                </TouchableOpacity>
            </View>
            <Animated.FlatList
                data={history}
                renderItem={({ item, index }) => {
                    const inputRange = [-1, 0, 122 * index, 122 * (index + 2)]
                    const scaleIn = scrollY.interpolate({
                        inputRange: inputRange,
                        outputRange: [1, 1, 1, 0],
                    })
                    // const scaleOut = scrollY.interpolate({
                    //     inputRange: inputRange,
                    //     outputRange: [-1, -1, -1, 0],
                    // })
                    // const opacityIn = scrollY.interpolate({
                    //     inputRange: opacityInputRangeIn,
                    //     outputRange: [1, 1, 1, 0],
                    // })
                    return (
                        <Animated.View style={{
                            borderRadius: 10,
                            backgroundColor: 'white',
                            padding: 20,
                            shadowColor: 'grey',
                            shadowRadius: 10,
                            shadowOffset: {
                                width: 5,
                                height: 5,
                            },
                            margin: 10,
                            // opacity: [{ opacity: opacityIn }],
                            transform: [{ scale: scaleIn }],
                        }}>
                            <Text style={{ fontSize: 14, color: 'grey', }}>{item.symbol1} {item.abbr1} {item.amountFrom} ➔</Text>
                            <Text style={{ fontSize: 20, }}>{item.symbol2} {item.abbr2} {item.amountTo}</Text>
                            <Text style={{ fontSize: 10, color: 'lightgrey' }}>Converted on {item.time}</Text>
                        </Animated.View>
                    )
                }
                }
                style={{ paddingHorizontal: 10 }}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={onRefresh}
                //     />
                // }
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            />
            <View style={{ height: 50 }}>
            </View>
        </SafeAreaView>
    )
}

export default currency_converter_history_screen