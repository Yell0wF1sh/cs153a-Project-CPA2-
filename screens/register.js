import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';


function register_screen({ navigation }) {
    return (
        <DefaultLayout>
            <Register />
        </DefaultLayout>
    )
}

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            let message = { data: [] }
            message = await axios.post('https://converter-game.herokuapp.com/fetchConvertVal',
                { email: email })
            setIsSuccessful(message.data['success'])
        }
        fetch()
    }, [isRegister])

    if (!isSuccessful) {
        return (
            <SafeAreaView>
                <TextInput
                    placeholder='Email'
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                />
                <TouchableOpacity
                    onPressIn={() => setIsFocused(true)}
                    onPressOut={() => {
                        setIsRegister(true)
                        setIsFocused(false)
                    }}
                    style={{ justifyContentL: 'center', alignItems: 'center' }}
                >
                    <Text style={isFocused ? { color: 'white', backgroundColor: '#39C5BB', fontSize: 20, padding: 10 } : { color: '#39C5BB', backgroundColor: '#fff', fontSize: 20, padding: 10 }}>CREATE AN ACCOUNT</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView>
                <Text>You are registered!</Text>
                <TouchableOpacity
                    onPressIn={() => setIsFocused(true)}
                    onPressOut={() => {
                        setIsFocused(false)
                        navigation.navigate('convert_game')
                    }}
                    style={{ justifyContentL: 'center', alignItems: 'center' }}
                >
                    <Text style={isFocused ? { color: 'white', backgroundColor: '#39C5BB', fontSize: 20, padding: 10 } : { color: '#39C5BB', backgroundColor: '#fff', fontSize: 20, padding: 10 }}>BACK TO GAME</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default register_screen