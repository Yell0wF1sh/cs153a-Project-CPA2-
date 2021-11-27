import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const appURL = 'https://converter-game.herokuapp.com/https://example.com'

async function add() {
    try {
        await axios.post(appURL + '/testPost')
    } catch (e) {
        console.log(e)
    }
}

export default function test_screen() {
    const [a1, setA1] = useState("")
    const [a2, setA2] = useState("")
    const [amount1, setAmount1] = useState(1)
    const [amount2, setAmount2] = useState(NaN)
    const [tempValue, setTempValue] = useState(NaN)
    const [isClick, setIsClick] = useState(false)

    useEffect(() => {
        fetch('http://data.fixer.io/api/convert?access_key=b16fced1bae2406403f788e14b2ff326&from=' + a1 + '&to=' + a2 + '&amount=' + amount1)
            .then((response) => response.json())
            .then((convertdata) => {
                setAmount2(convertdata["result"])
                console.log(convertdata)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [a1, a2, amount1])

    return (
        <View>
            <Picker
                style={{ borderBottomWidth: 2, borderColor: 'lightgrey', fontSize: 20, borderRadius: 10 }}
                onValueChange={(itemValue) => {
                    setA1(itemValue)
                }}
            >
                <Picker.Item label='US Dollar' value='USD' />
                <Picker.Item label='Chinese Yuan' value='CNY' />
                <Picker.Item label='Japanese Yen' value='JPY' />
            </Picker>

            <Picker
                style={{ borderBottomWidth: 2, borderColor: 'lightgrey', fontSize: 20, borderRadius: 10 }}
                onValueChange={(itemValue) => {
                    setA2(itemValue)
                }}
            >
                <Picker.Item label='Chinese Yuan' value='CNY' />
                <Picker.Item label='US Dollar' value='USD' />
                <Picker.Item label='Japanese Yen' value='JPY' />
            </Picker>
            <TextInput
                style={{
                    width: '100%',
                    color: 'black',
                    // fontFamily: 'Times',
                    fontSize: 24,
                    textAlign: 'center',
                    backgroundColor: "white",
                }}
                placeholder={amount1}
                onChangeText={text => setTempValue(text)}
            />
            <Button
                title='Convert'
                color='#4caf50'
                onPress={() => {
                    setAmount1(tempValue)
                }}
            />
            <Text>{amount1}{a1}</Text>
            <Text>{amount2}{a2}</Text>
            <Button
                title='add'
                onPress={() => {
                    add()
                }}
            />
        </View>
    )
}