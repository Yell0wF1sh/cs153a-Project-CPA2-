import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencyInfo } from '../components/currency_variables';
import moment from 'moment';
import { CurrencyCard } from './component_templates'
import { currencyList } from '../components/currency_variables';
import ValueProvider, { useValue } from '../components/value_context';
// import { Card } from "@paraboly/react-native-card";

function convert_game_screen({ navigation }) {
    return (
        <View style={{ height: "92%", weight: '100%' }}>
            <ConvertGame />
        </View>
    )
}

const ConvertGame = () => {
    const [playerId, setPlayerId] = useState("Steve")
    const [currencyNow, setCurrencyNow] = useState(currencyInfo[0]["currencyName"])
    const [currencyAmount, setCurrencyAmount] = useState(100)
    const [currentTime, setCurrenctTime] = useState(moment().format())
    const [changeTimes, setChangeTimes] = useState(0)
    const [profile, setProfile] = useState([])
    const [currencyModified, setCurrencyModified] = useState(0)
    const styles = StyleSheet.create({
        text: {
            fontSize: 18,
        }

    })

    // useEffect(() => {
    //     fetch('http://data.fixer.io/api/fluctuation?access_key=b16fced1bae2406403f788e14b2ff326&start_date=2021-11-8&end_date='+currentTime+'&base=EUR&symbols='+currencyList.toString())
    //         .then((response) => response.json())
    //         .then((convertdata) => {
    //             setNum2(convertdata["result"])
    //         })
    //         .catch((error) => console.error(error))
    //     },[])

    useEffect(() => {
        const newProfile = profile.concat(
            {
                'currency': currencyNow,
                'currency amount': currencyAmount,
                'date': currentTime,
                'operation times': changeTimes
            }
        )
        setProfile(newProfile)
        storeData(newProfile)
    }, [changeTimes])

    useEffect(() => {
        setCurrencyAmount()
    },[currencyNow])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@currencyGame?id=' + playerId)
            let data = null
            if (jsonValue != null) {
                data = JSON.parse(jsonValue)
                setProfile(data)
            } else {
                setProfile([])
            }
        } catch (e) {
            console.dir(e)
        }
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@currencyGame?id=' + playerId, jsonValue)
        } catch (e) {
            console.dir(e)
        }
    }

    let firstTimeView = (<View></View>)

    if (changeTimes < 1) {
        firstTimeView =
            <View>
                <Text>Pick a currency as your starter currency</Text>
                <Picker
                    selectedValue={currencyNow}
                    style={{ borderBottomWidth: 2, borderColor: 'lightgrey', fontSize: 25, borderRadius: 10, width: '50%' }}
                    onValueChange={(itemValue) => {
                        setCurrencyNow(itemValue)
                    }}
                >
                    <Picker.Item label={currencyInfo[0]["currencyName"]} value={currencyInfo[0]["currencyName"]} />
                    <Picker.Item label={currencyInfo[1]["currencyName"]} value={currencyInfo[1]["currencyName"]} />
                    <Picker.Item label={currencyInfo[2]["currencyName"]} value={currencyInfo[2]["currencyName"]} />
                    <Picker.Item label={currencyInfo[3]["currencyName"]} value={currencyInfo[3]["currencyName"]} />
                    <Picker.Item label={currencyInfo[4]["currencyName"]} value={currencyInfo[4]["currencyName"]} />
                    <Picker.Item label={currencyInfo[5]["currencyName"]} value={currencyInfo[5]["currencyName"]} />
                    <Picker.Item label={currencyInfo[6]["currencyName"]} value={currencyInfo[6]["currencyName"]} />
                    <Picker.Item label={currencyInfo[7]["currencyName"]} value={currencyInfo[7]["currencyName"]} />
                    <Picker.Item label={currencyInfo[8]["currencyName"]} value={currencyInfo[8]["currencyName"]} />
                    <Picker.Item label={currencyInfo[9]["currencyName"]} value={currencyInfo[9]["currencyName"]} />
                </Picker>
            </View>
    }


    return (
        <ValueProvider data={profile}>
            {/* 做一个按照convert变化数字的显示区域就好 */}
            <View style={{ flex: 1, width: '100%', height: '100%', padding: 10 }}>
                <AmountView />
                <CardView />
            </View>

        </ValueProvider>
    )
}

const AmountView = (currencyNow, currencyConverted) => {
    return(
        <View style={styles.convert_area}>
            <Text style={{ color: 'grey', fontSize: 25, flexWrap: 'wrap' }}>You started with $100</Text>
            <Text style={{ fontSize: 45, fontWeight: "bold" }}>Now you own {currencyAmount} {currencyNow}</Text>
            <Text style={{ fontSize: 45, fontWeight: "bold" }}>which is {currencyModified}</Text>
            <Text>Your saving decreased/increased by {}</Text>
        </View>
    )
}

function currencyText(num) {
    return currencyInfo[num]["currencyName"] + " " + currencyInfo[num]["currencySymbol"]
}

const CardView = () => {
    <View style={{ flex: 1, flexDirection: 'row' }}>
        <CurrencyCard
            currencyText={currencyText(0)}
            percentChange='+0.01%'
            isIncrease="true"
        >
            <Button
                title='SWITCH CURRENCY'
                color='#009dd6'
                onPress={() => {
                    setCurrencyNow(currencyText(0))
                 }}
            />
        </CurrencyCard>
        <CurrencyCard
            currencyText={currencyText(1)}
            percentChange='-0.01%'
            isIncrease="false"
        >
            <Button
                title='SWITCH CURRENCY'
                color='#009dd6'
                onPress={() => {
                    setCurrencyNow(currencyText(1))
                 }}
            />
        </CurrencyCard>
        <CurrencyCard
            currencyText={currencyText(2)}
            percentChange='+0%'
            isIncrease="true"
        >
            <Button
                title='SWITCH CURRENCY'
                color='#009dd6'
                onPress={() => {
                    setCurrencyNow(currencyText(2))
                 }}
            />
        </CurrencyCard>
        <CurrencyCard
            currencyText={currencyText(3)}
            percentChange='+1.00%'
            isIncrease="true"
        >
            <Button
                title='SWITCH CURRENCY'
                color='#009dd6'
                onPress={() => {
                    setCurrencyNow(currencyText(3))
                 }}
            />
        </CurrencyCard>
    </View>
}

export default convert_game_screen