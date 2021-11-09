import React, {useState, useEffect} from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencyInfo } from '../components/currency_variables';
import moment from 'moment';
import { currencyList } from '../components/currency_variables';

function convert_game_screen({ navigation }) {
    return (
        <View style={{ height: "92%", weight: '100%' }}>
            <ConvertGame />
        </View>
    )
}

const ConvertGame = () => {
    const [playerId, setPlayerId] = useState("")
    const [currencyNow, setCurrencyNow] = useState(currencyInfo[0]["currencyName"])
    const [currentTime, setCurrenctTime] = useState(moment().format())
    const [changeTimes, setChangeTimes] = useState(0)
    const [profile, setProfile] = useState([])

    useEffect(() => {
        fetch('http://data.fixer.io/api/fluctuation?access_key=b16fced1bae2406403f788e14b2ff326&start_date=2021-11-8&end_date='+currentTime+'&base=EUR&symbols='+currencyList.toString())
            .then((response) => response.json())
            .then((convertdata) => {
                setNum2(convertdata["result"])
            })
            .catch((error) => console.error(error))
        },[])

    useEffect(() => {
        const newProfile = profile.concat(
            {
                'currency': currencyNow,      
                'date': currentTime,
                'change times': changeTimes
            }
        )
        setProfile(newProfile)
        storeData(newProfile)
    }, [changeTimes])
    
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
            await AsyncStorage.setItem('@currencyGame?id='+playerId, jsonValue)
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


    return(
        <View>
            {/* {firstTimeView} */}
            {/* 欢迎 */}
            <View>

            </View>
            {/* 统计栏 */}
            <View>

            </View>
            {/* 货币选项卡（一行两个，带转换按钮） */}
            <View>
                <View>
                    <View>
                        <Text>{currencyInfo[0]["currencyName"]} {currencyInfo[0]["currencySymbol"]}</Text>

                    </View>
                    <Button 
                        title='SWITCH CURRENCY'
                        color='#009dd6'
                        onPress={() => {}}
                    />
                </View>
            </View>
        </View>
    )
}

export default convert_game_screen