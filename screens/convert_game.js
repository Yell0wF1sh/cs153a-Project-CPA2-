import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import { currencyInfo } from '../components/currency_variables';
import { CurrencyCard } from '../components/component_templates'
import { currencyList } from '../components/currency_variables';
import { DefaultLayout } from '../components/screen_layout';
import ValueProvider, { useValue } from '../components/value_context';
import axios from 'axios';

function convert_game_screen({ navigation }) {

    const ConvertGame = () => {
        const [currencyLast, setCurrencyLast] = useState("EUR")
        const [currencyLastAmount, setCurrencyLastAmount] = useState(100)
        const [currencyNow, setCurrencyNow] = useState("EUR")
        const [currencyNowAmount, setCurrencyNowAmount] = useState(100)
        const [changeTimes, setChangeTimes] = useState(0)
        const [profile, setProfile] = useState([])
        const [currencyAmountMod, setCurrencyAmountMod] = useState(0)
        const [cvLs, setCvLs] = useState([]) //currency value list
        const [isRefresh, setIsRefresh] = useState(false)
        const [isFocused, setIsFocused] = useState(false)

        useEffect(() => {
            const fetchLs = async () => {
                let newCvLs = { data: [] }
                newCvLs = await axios.post('https://converter-game.herokuapp.com/fetchConvertVal',
                    { base: 'EUR', symbols: currencyList.toString() })
                setCvLs(newCvLs.data)
            }
            fetchLs()
            console.log(cvLs)
        }, [isRefresh])

        const getChangePer = (cvLs, length, currencyName) => {
            if (length != 0) { return (Math.floor(cvLs[1]['currSymbol'][currencyName] - cvLs[0]['currSymbol'][currencyName] * 10) / 1000) }
        }

        useEffect(() => {
            if (cvLs.length != 0) {
                setCurrencyLast(currencyNow)
                let cna = currencyLastAmount / cvLs[1]['currSymbol'][currencyLast] * cvLs[1]['currSymbol'][currencyNow]
                setCurrencyNowAmount(Math.floor(cna * 10000) / 10000)
            }
        }, [currencyNow])

        useEffect(() => {
            if (cvLs.length != 0) {
                setCurrencyLastAmount(currencyNowAmount)
                let cam = currencyNowAmount / cvLs[1]['currSymbol'][currencyNow]
                setCurrencyAmountMod(Math.floor(cam * 10000) / 10000)
            }
        }, [currencyNowAmount])

        const renderCCards = ({ item }) => {
            let currencyName = item['historyTitle']
            let percentChange = getChangePer(cvLs, cvLs.length, currencyName)
            return (
                <CurrencyCard
                    currencyText={item['historyTitle'] + ' ' + item['currencySymbol']}
                    percentChange={percentChange + '%'}
                    // percentChange='0.01%'
                    isIncrease={(Math.sign(percentChange) == 1)}

                >
                    <Button
                        title='SWITCH CURRENCY'
                        color='#009dd6'
                        onPress={() => {
                            setCurrencyNow(item['historyTitle'])
                            setChangeTimes(changeTimes + 1)
                        }}
                    />
                </CurrencyCard>
            )
        }

        // let firstTimeView = (<View></View>)

        // if (changeTimes < 1) {
        //     firstTimeView =
        //         <View>
        //             <Text>Pick a currency as your starter currency</Text>
        //             <Picker
        //                 selectedValue={currencyNow}
        //                 style={{ borderBottomWidth: 2, borderColor: 'lightgrey', fontSize: 25, borderRadius: 10, width: '50%' }}
        //                 onValueChange={(itemValue) => {
        //                     setCurrencyNow(itemValue)
        //                 }}
        //             >
        //                 <Picker.Item label={currencyName(0)} value={currencyName(0)} />
        //                 <Picker.Item label={currencyName(1)} value={currencyName(1)} />
        //                 <Picker.Item label={currencyName(2)} value={currencyName(2)} />
        //                 <Picker.Item label={currencyName(3)} value={currencyName(3)} />
        //                 <Picker.Item label={currencyName(4)} value={currencyName(4)} />
        //                 <Picker.Item label={currencyName(5)} value={currencyName(5)} />
        //                 <Picker.Item label={currencyName(6)} value={currencyName(6)} />
        //                 <Picker.Item label={currencyName(7)} value={currencyName(7)} />
        //                 <Picker.Item label={currencyName(8)} value={currencyName(8)} />
        //                 <Picker.Item label={currencyName(9)} value={currencyName(9)} />
        //             </Picker>
        //         </View>
        // }

        return (
            <ValueProvider data={profile}>
                <SafeAreaView style={{ flex: 1, width: '100%', height: '100%', padding: 10 }}>
                    <SafeAreaView style={{
                        flex: 2,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        // alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 5,
                    }}>
                        <Text style={{ color: 'grey', fontSize: 25 }}>You started with €100</Text>
                        <Text style={{ fontSize: 30, fontWeight: "bold", flexWrap: 'wrap' }}>Now you own {currencyNowAmount} {currencyNow}</Text>
                        <Text style={{ color: 'grey', fontSize: 25 }}>which is {currencyAmountMod} EUR</Text>
                        <Text style={{ fontSize: 30, fontWeight: "bold", flexWrap: 'wrap' }}>Your saving {currencyAmountMod < 100 ? "decreased" : "increased"} by {currencyAmountMod < 100 ? Math.floor(currencyAmountMod * 100) / 10000 : Math.floor(currencyAmountMod * 100) / 10000 - 1}%</Text>
                        <TouchableOpacity
                            onPressIn={() => setIsFocused(true)}
                            onPress={() => {
                                setIsRefresh(true)
                                setIsFocused(false)
                            }}
                            style={{ alignItems: 'center' }}
                        >
                            <Text style={isFocused ? { color: 'white', backgroundColor: '#52d8f2', fontSize: 20, padding: 10 } : { color: '#52d8f2', backgroundColor: '#fff', fontSize: 20, padding: 10 }}>REFRESH</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                    <FlatList
                        data={currencyInfo}
                        renderItem={renderCCards}
                        numColumns='2'
                        style={{ paddingTop: 10, flex: 2 }}
                    />
                </SafeAreaView>
            </ValueProvider>
        )

    }

    return (
        <DefaultLayout>
            <ConvertGame />
        </DefaultLayout>
    )
}

export default convert_game_screen