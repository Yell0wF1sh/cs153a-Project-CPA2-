import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView, Dimensions, } from 'react-native';
import { Picker } from '@react-native-community/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencyInfo, findCurrency, currencyList } from '../components/currency_variables'
import { SafeAreaView } from 'react-native-safe-area-context';
import { currencyName } from '../components/currency_variables';
import { DefaultLayout } from '../components/screen_layout';
import moment from 'moment';
// import { LineChart } from 'react-native-chart-kit';


function currency_converter_screen({ navigation }) {
    return (
        <DefaultLayout>
            <CurrencyConvertor />
        </DefaultLayout>
    )
}

const CurrencyConvertor = () => {
    const [num1, setNum1] = useState(1)
    const [num2, setNum2] = useState(17.785563)
    const [name1, setName1] = useState("Chinese Yuan")
    const [name2, setName2] = useState("Japanese Yen")
    const [abbr1, setAbbr1] = useState("CNY")
    const [abbr2, setAbbr2] = useState("JPY")
    const [symbol1, setSymbol1] = useState("￥")
    const [symbol2, setSymbol2] = useState("¥")
    const [history, setHistory] = useState([])
    const [dateNow, setDateNow] = useState("2021-10-31")
    const [dateBefore, setDateBefore] = useState("2021-10-21")
    const [historicalValueList, setHistoricalValueList] = useState([])
    const [tempValue, setTempValue] = useState(NaN)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: 5,
            paddingHorizontal: 10,
        },
        convert_area: {
            flex: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 5,
        },
        box1: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        box2: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        text: {
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            backgroundColor: "#000000c0",
        },
    })

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setAbbr1(currencyInfo[findCurrency(name1)].historyTitle)
        setSymbol1(currencyInfo[findCurrency(name1)].currencySymbol)
    }, [name1])

    useEffect(() => {
        setAbbr2(currencyInfo[findCurrency(name2)].historyTitle)
        setSymbol2(currencyInfo[findCurrency(name2)].currencySymbol)
    }, [name2])

    useEffect(() => {
        fetch('http://data.fixer.io/api/convert?access_key=b16fced1bae2406403f788e14b2ff326&from='
            + abbr1.toUpperCase() + '&to=' + abbr2.toUpperCase() + '&amount=' + num1)
            .then((response) => response.json())
            .then((convertdata) => {
                setNum2(convertdata["result"])
            })
            .catch((error) => console.error(error))
    }, [abbr1, abbr2, num1])

    useEffect(() => {
        const newHistory = history.concat(
            {
                'amountFrom': num1,
                'amountTo': num2,
                'abbr1': abbr1,
                'abbr2': abbr2,
                'symbol1': symbol1,
                'symbol2': symbol2,
                'time': moment().format('YYYY/MM/D hh:mm:ss'),
            }
        )
        setHistory(newHistory.reverse())
        storeData(newHistory)
    }, [num2])


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@currencyConverter', jsonValue)
        } catch (e) {
            console.dir(e)
        }
    }

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
                <Text style={{ fontSize: 16, backgroundColor: '#00ebdb', width: 100, textAlign: 'center' }}>{item.symbol1} {item.amountFrom}</Text>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>➔</Text>
                <Text style={{ fontSize: 16, backgroundColor: '#00ebac', width: 100, textAlign: 'center' }}>{item.symbol2} {item.amountTo}</Text>
            </View>
        )
    }


    return (

        <KeyboardAvoidingView style={styles.container} >
            <SafeAreaView style={{ height: '100%', width: '100%' }}>
                <View style={styles.convert_area}>
                    <Text style={{ color: 'grey', fontSize: 25, flexWrap: 'wrap' }}>{symbol1} {num1} {name1} =</Text>
                    <Text style={{ fontSize: 45, fontWeight: "bold" }}>{symbol2} {num2}</Text>
                    <Text style={{ fontSize: 45, fontWeight: "bold" }}>{name2}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Picker
                            selectedValue={name1}
                            style={{ borderBottomWidth: 2, borderColor: 'lightgrey', fontSize: 25, borderRadius: 10, width: '50%' }}
                            onValueChange={(itemValue) => {
                                setName1(itemValue)
                            }}
                        >
                            <Picker.Item label={currencyName(0)} value={currencyName(0)} />
                            <Picker.Item label={currencyName(1)} value={currencyName(1)} />
                            <Picker.Item label={currencyName(2)} value={currencyName(2)} />
                            <Picker.Item label={currencyName(3)} value={currencyName(3)} />
                            <Picker.Item label={currencyName(4)} value={currencyName(4)} />
                            <Picker.Item label={currencyName(5)} value={currencyName(5)} />
                            <Picker.Item label={currencyName(6)} value={currencyName(6)} />
                            <Picker.Item label={currencyName(7)} value={currencyName(7)} />
                            <Picker.Item label={currencyName(8)} value={currencyName(8)} />
                            <Picker.Item label={currencyName(9)} value={currencyName(9)} />
                        </Picker>

                        <Text style={{ fontSize: 20, }}>⇄</Text>

                        <Picker
                            selectedValue={name2}
                            style={{ borderBottomWidth: 2, borderColor: 'lightgrey', fontSize: 25, borderRadius: 10, width: '50%' }}
                            onValueChange={(itemValue) => {
                                setName2(itemValue)
                            }}
                        >
                            <Picker.Item label={currencyName(0)} value={currencyName(0)} />
                            <Picker.Item label={currencyName(1)} value={currencyName(1)} />
                            <Picker.Item label={currencyName(2)} value={currencyName(2)} />
                            <Picker.Item label={currencyName(3)} value={currencyName(3)} />
                            <Picker.Item label={currencyName(4)} value={currencyName(4)} />
                            <Picker.Item label={currencyName(5)} value={currencyName(5)} />
                            <Picker.Item label={currencyName(6)} value={currencyName(6)} />
                            <Picker.Item label={currencyName(7)} value={currencyName(7)} />
                            <Picker.Item label={currencyName(8)} value={currencyName(8)} />
                            <Picker.Item label={currencyName(9)} value={currencyName(9)} />
                        </Picker>
                    </View>
                    <TextInput
                        style={{
                            width: '80%',
                            color: 'black',
                            // fontFamily: 'Times',
                            fontSize: 24,
                            textAlign: 'center',
                            backgroundColor: "white",
                        }}
                        placeholder={symbol1 + abbr1.toUpperCase()}
                        onChangeText={text => setTempValue(text)}
                    />
                </View>
                <View style={{ flex: 0.5 }}>
                    <Button
                        title='Convert'
                        color='#009dd6'
                        onPress={() => {
                            setNum1(tempValue)
                        }}
                    />
                </View>
                <View style={{ flex: 2 }}></View>
            </SafeAreaView>
        </KeyboardAvoidingView >
    )
}


export default currency_converter_screen
