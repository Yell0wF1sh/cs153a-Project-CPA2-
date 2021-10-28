import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencyInfo, findCurrency, currencyList } from '../components/currency_variables'
import ConvertArea from '../components/convert';


function currency_converter_screen({ navigation }) {
    return (
        <View style={{ height: "100%", weight: '100%', backgroundColor: '#b603fc' }}>
            <CurrencyConvertor />
        </View>
    )
}

export const CurrencyConvertor = () => {
    const [num1, setNum1] = useState(NaN)
    const [num2, setNum2] = useState(NaN)
    const [name1, setName1] = useState("Chinese Yuan")
    const [name2, setName2] = useState("Japanese Yen")
    const [convertValueList, setConvertValueList] = useState([])
    const [convertValue, setConvertValue] = useState(NaN)
    const [abbr1, setAbbr1] = useState("Abbreviation1")
    const [abbr2, setAbbr2] = useState("Abbreviation2")
    const [symbol1, setSymbol1] = useState("Symbol1")
    const [symbol2, setSymbol2] = useState("Symbol2")
    const [image1, setImage1] = useState("Image1URL")
    const [image2, setImage2] = useState("Image2URL")
    const [asynSTit, setAsynSTit] = useState(" ")
    const [history, setHistory] = useState([])
    const [viewingHis, setViewingHis] = useState(false)
    const [isAllSet, setIsAllSet] = useState(false)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: 'rgba(255,255,255,.5)',
        },
        convert_area: {
            flex: 4,
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
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
        setNum1(currencyInfo[findCurrency(name1)].initalState.asNum1)
        setNum2(currencyInfo[findCurrency(name2)].initalState.asNum2[findCurrency(name1)])
        setConvertValue(currencyInfo[findCurrency(name2)].initalState.asNum2[findCurrency(name1)])
        setAbbr1(currencyInfo[findCurrency(name1)].historyTitle)
        setAbbr2(currencyInfo[findCurrency(name2)].historyTitle)
        setSymbol1(currencyInfo[findCurrency(name1)].currencySymbol)
        setSymbol2(currencyInfo[findCurrency(name2)].currencySymbol)
        setImage1(currencyInfo[findCurrency(name1)].currencyImage)
        setImage2(currencyInfo[findCurrency(name2)].currencyImage)
        // .finally(() => setLoading(false));
        setAsynSTit('@' + abbr1 + 'To' + abbr2.toUpperCase())
        setIsAllSet(false)
    }, [name1, name2])

    useEffect(() => {
        fetch('http://data.fixer.io/api/latest?access_key=22f408d3be87ec11e691052c2131e5b7&base=' + abbr1.toUpperCase() + '&symbols=' + currencyList)
            .then((response) => response.json())
            .then((convertdata) => {
                setConvertValueList(convertdata)
                console.log(abbr1.toUpperCase())
                console.log(convertdata)
            })
            .catch((error) => console.error(error))
    }, [isAllSet == true])

    useEffect(() => {
        const newHistory = history.reverse().concat(
            {
                'time': Date.now(),
                'symbol1': symbol1,
                'symbol2': symbol2,
                'num1': num1,
                'num2': num2,
            }
        )
        setHistory(newHistory.reverse())
        storeData(newHistory)
    }, [num2])


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(asynSTit, jsonValue)
        } catch (e) {
            console.dir(e)
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(asynSTit)
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
                {console.log("render history")}
                {console.log(abbr1)}
                {console.log(history)}
                <Text style={{ fontSize: 16, backgroundColor: 'lightgreen', width: 100, textAlign: 'center' }}>{item.symbol1} {item.num1}</Text>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>➔</Text>
                <Text style={{ fontSize: 16, backgroundColor: 'pink', width: 100, textAlign: 'center' }}>{item.symbol2} {item.num2}</Text>
            </View>
        )
    }

    let historyView = (<View></View>)

    if (viewingHis) {

        historyView =
            <View>
                <FlatList
                    data={history.reverse().slice(0, 5)}
                    renderItem={renderHistory}
                    KeyExtractor={(item) => item.time}
                />
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
    }


    return (

        <KeyboardAvoidingView style={styles.container} >
            <View style={styles.convert_area}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Picker
                        selectedValue={name1}
                        style={{ borderBottomWidth: 2, borderColor: 'lightgrey', fontSize: 20, borderRadius: 10 }}
                        onValueChange={(itemValue) => {
                            setName1(itemValue)
                        }}
                    >
                        <Picker.Item label='Chinese Yuan' value='Chinese Yuan' />
                        <Picker.Item label='US Dollar' value='US Dollar' />
                        <Picker.Item label='Japanese Yen' value='Japanese Yen' />
                    </Picker>

                    <Text style={{ fontSize: 20 }}>⇄</Text>

                    <Picker
                        selectedValue={name2}
                        style={{ borderBottomWidth: 2, borderColor: 'lightgrey', fontSize: 20, borderRadius: 10 }}
                        onValueChange={(itemValue) => {
                            setName2(itemValue)
                        }}
                    >
                        <Picker.Item label='Chinese Yuan' value='Chinese Yuan' />
                        <Picker.Item label='US Dollar' value='US Dollar' />
                        <Picker.Item label='Japanese Yen' value='Japanese Yen' />
                    </Picker>
                </View>
                <Button
                    title='✓'
                    onPress={() => {
                        setIsAllSet(true)
                    }}
                />
                <TextInput
                    style={{
                        width: '100%',
                        color: 'black',
                        // fontFamily: 'Times',
                        fontSize: 24,
                        textAlign: 'center',
                        backgroundColor: "white",
                    }}
                    placeholder={num1}
                    onChangeText={text => setNum1(text)}
                />
                <Text style={{ color: 'grey', fontSize: 20 }} >
                    {symbol1}
                    {name1} =</Text>
                <Text style={{ fontSize: 40, fontWeight: 600 }}>{symbol2} {num2} {name2}</Text>
            </View>
            <View style={{ flex: 1, paddingTop: 5 }}>
                <Button
                    title='Convert'
                    color='#4caf50'
                    onPress={() => {
                        setNum2(Math.round(num1 * convertValue * 1000) / 1000)
                    }}
                />
            </View>
            <View style={{ flex: 4 }}>
                <Button
                    title='Toggle history'
                    color='#e65100'
                    onPress={() => { setViewingHis(!viewingHis) }}
                />
                {historyView}
            </View>
        </KeyboardAvoidingView >
    )
}


export default currency_converter_screen
