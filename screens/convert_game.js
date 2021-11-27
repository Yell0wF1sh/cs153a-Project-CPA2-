import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import { currencyInfo } from '../components/currency_variables';
import moment from 'moment';
import { CurrencyCard } from '../components/component_templates'
import { currencyList } from '../components/currency_variables';
import { currencyName, currencyAbbr } from '../components/currency_variables';
import { DefaultLayout } from '../components/screen_layout';
import ValueProvider, { useValue } from '../components/value_context';

function convert_game_screen({ navigation }) {
    return (
        <DefaultLayout>
            <ConvertGame />
        </DefaultLayout>
    )
}

const ConvertGame = () => {
    const [playerId, setPlayerId] = useState("Steve")
    const [currencyLast, setCurrencyLast] = useState("USD")
    const [currencyLastAmount, setCurrencyLastAmount] = useState(100)
    const [currencyNow, setCurrencyNow] = useState("USD")
    const [currencyNowAmount, setCurrencyNowAmount] = useState(100)
    const [currentTime, setCurrenctTime] = useState(moment().format())
    const [changeTimes, setChangeTimes] = useState(0)
    const [profile, setProfile] = useState([])
    const [currencyAmountMod, setCurrencyAmountMod] = useState(0)
    const styles = StyleSheet.create({
        text: {
            fontSize: 18,
        }

    })

    useEffect(() => {
        setCurrencyLast(currencyNow)
        fetch('http://data.fixer.io/api/convert?access_key=b16fced1bae2406403f788e14b2ff326&from='
            + currencyLast + '&to=' + currencyNow + '&amount=' + currencyLastAmount)
            .then((response) => response.json())
            .then((convertdata) => {
                setCurrencyNowAmount(convertdata["result"])
                console.log("CurrencyNowAmount=" + convertdata["result"])
                console.log("CurrencyNow=" + currencyNow)
            })
            .catch((error) => console.error(error))
    }, [currencyNow])

    useEffect(() => {
        setCurrencyLastAmount(currencyNowAmount)
        fetch('http://data.fixer.io/api/convert?access_key=b16fced1bae2406403f788e14b2ff326&from='
            + currencyNow + '&to=USD&amount=' + currencyNowAmount)
            .then((response) => response.json())
            .then((convertdata) => {
                setCurrencyAmountMod(convertdata["result"])
                console.log("CurrencyAmountMod=" + currencyAmountMod)
            })
            .catch((error) => console.error(error))
    }, [currencyNowAmount])



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
    }


    return (
        <ValueProvider data={profile}>
            <View style={{ flex: 1, width: '100%', height: '100%', padding: 10 }}>
                <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 5,
                }}>
                    <Text style={{ color: 'grey', fontSize: 25 }}>You started with $100</Text>
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>Now you own {currencyNowAmount} {currencyNow}</Text>
                    <Text style={{ color: 'grey', fontSize: 25 }}>which is {currencyAmountMod} USD</Text>
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>Your saving {currencyAmountMod < 100 ? "decreased" : "increased"} by {currencyAmountMod < 100 ? Math.floor(currencyAmountMod * 100) / 10000 : Math.floor(currencyAmountMod * 100) / 10000 - 1}%</Text>
                </View>
                <ScrollView style={{ flex: 1, paddingTop: 10, flexWrap: 'wrap' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <CurrencyCard
                            currencyText={currencyText(0)}
                            percentChange='+0.01%'
                            isIncrease={true}
                        >
                            <Button
                                title='SWITCH CURRENCY'
                                color='#009dd6'
                                onPress={() => {
                                    setCurrencyNow(currencyAbbr(0))
                                    setChangeTimes(changeTimes + 1)
                                }}
                            />
                        </CurrencyCard>
                        <CurrencyCard
                            currencyText={currencyText(1)}
                            percentChange='-0.01%'
                            isIncrease={false}
                        >
                            <Button
                                title='SWITCH CURRENCY'
                                color='#009dd6'
                                onPress={() => {
                                    setCurrencyNow(currencyAbbr(1))
                                    setChangeTimes(changeTimes + 1)
                                }}
                            />
                        </CurrencyCard>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                        <CurrencyCard
                            currencyText={currencyText(2)}
                            percentChange='+0%'
                            isIncrease={true}
                        >
                            <Button
                                title='SWITCH CURRENCY'
                                color='#009dd6'
                                onPress={() => {
                                    setCurrencyNow(currencyAbbr(2))
                                    setChangeTimes(changeTimes + 1)
                                }}
                            />
                        </CurrencyCard>
                        <CurrencyCard
                            currencyText={currencyText(3)}
                            percentChange='+1.00%'
                            isIncrease={true}
                        >
                            <Button
                                title='SWITCH CURRENCY'
                                color='#009dd6'
                                onPress={() => {
                                    setCurrencyNow(currencyAbbr(3))
                                    setChangeTimes(changeTimes + 1)
                                }}
                            />
                        </CurrencyCard>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                        <CurrencyCard
                            currencyText={currencyText(4)}
                            percentChange='+0%'
                            isIncrease={true}
                        >
                            <Button
                                title='SWITCH CURRENCY'
                                color='#009dd6'
                                onPress={() => {
                                    setCurrencyNow(currencyAbbr(4))
                                    setChangeTimes(changeTimes + 1)
                                }}
                            />
                        </CurrencyCard>
                        <CurrencyCard
                            currencyText={currencyText(5)}
                            percentChange='+1.00%'
                            isIncrease={true}
                        >
                            <Button
                                title='SWITCH CURRENCY'
                                color='#009dd6'
                                onPress={() => {
                                    setCurrencyNow(currencyAbbr(5))
                                    setChangeTimes(changeTimes + 1)
                                }}
                            />
                        </CurrencyCard>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                        <CurrencyCard
                            currencyText={currencyText(6)}
                            percentChange='+0%'
                            isIncrease={true}
                        >
                            <Button
                                title='SWITCH CURRENCY'
                                color='#009dd6'
                                onPress={() => {
                                    setCurrencyNow(currencyAbbr(6))
                                    setChangeTimes(changeTimes + 1)
                                }}
                            />
                        </CurrencyCard>
                        <CurrencyCard
                            currencyText={currencyText(7)}
                            percentChange='+1.00%'
                            isIncrease={true}
                        >
                            <Button
                                title='SWITCH CURRENCY'
                                color='#009dd6'
                                onPress={() => {
                                    setCurrencyNow(currencyAbbr(7))
                                    setChangeTimes(changeTimes + 1)
                                }}
                            />
                        </CurrencyCard>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                        <CurrencyCard
                            currencyText={currencyText(8)}
                            percentChange='+0%'
                            isIncrease={true}
                        >
                            <Button
                                title='SWITCH CURRENCY'
                                color='#009dd6'
                                onPress={() => {
                                    setCurrencyNow(currencyAbbr(8))
                                    setChangeTimes(changeTimes + 1)
                                }}
                            />
                        </CurrencyCard>
                        <CurrencyCard
                            currencyText={currencyText(9)}
                            percentChange='+1.00%'
                            isIncrease={true}
                        >
                            <Button
                                title='SWITCH CURRENCY'
                                color='#009dd6'
                                onPress={() => {
                                    setCurrencyNow(currencyAbbr(9))
                                    setChangeTimes(changeTimes + 1)
                                }}
                            />
                        </CurrencyCard>
                    </View>
                </ScrollView>
            </View>

        </ValueProvider>
    )
}

function currencyText(num) {
    return currencyInfo[num]["historyTitle"] + " " + currencyInfo[num]["currencySymbol"]
}


export default convert_game_screen