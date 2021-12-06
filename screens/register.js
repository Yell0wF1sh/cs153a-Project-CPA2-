import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { DefaultLayout } from '../components/screen_layout';
import convert_game_screen from './convert_game';


function register_screen({ navigation }) {
    const [isFocused, setIsFocused] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [email, setEmail] = useState('')

    const Register = () => {

        useEffect(() => {
            const fetch = async () => {
                await axios.post('https://converter-game.herokuapp.com/register',
                    { email: email })
                    .then((message) => {
                        console.log(message)
                        setIsSuccessful(message['data']['success'])
                    }).catch((error) => console.error(error))
            }
            fetch()
            setIsRegister(false)
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
                        onPress={() => {
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
                        onPress={() => {
                            setIsFocused(false)
                            navigation.navigate('Home', { screen: 'Game' })
                        }}
                        style={{ justifyContentL: 'center', alignItems: 'center' }}
                    >
                        <Text style={isFocused ? { color: 'white', backgroundColor: '#39C5BB', fontSize: 20, padding: 10 } : { color: '#39C5BB', backgroundColor: '#fff', fontSize: 20, padding: 10 }}>BACK TO GAME</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )
        }
    }

    return (
        <DefaultLayout>
            <Register />
        </DefaultLayout>
    )
}

export default register_screen