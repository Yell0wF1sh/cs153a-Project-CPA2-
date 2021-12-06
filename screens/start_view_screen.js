import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import convert_game_screen from './convert_game';
import register_screen from './register';
import { DefaultLayout } from '../components/screen_layout';

const start_view_screen = ({ navigation }) => {
    const [isL, setIsL] = useState(false)
    const [email, setEmail] = useState()
    const [secret, setSecret] = useState()
    const [isFocused1, setIsFocused1] = useState(false)
    const [isFocused2, setIsFocused2] = useState(false)

    const StartView = () => {
        useEffect(() => {
            const fetch = async () => {
                await axios.get('https://converter-game.herokuapp.com/login',
                    { email: email, secret: secret })
                    .then((message) => {
                        console.log(message)
                        setIsL(false)
                    }).catch((error) => console.error(error))
            }
            fetch()
        }, [isL])

        return (
            <SafeAreaView>
                <TextInput
                    placeholder='Email'
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                />
                <TextInput
                    placeholder='Secret'
                    onChangeText={(text) => {
                        setSecret(text)
                    }}
                />
                <TouchableOpacity
                    onPressIn={() => setIsFocused1(true)}
                    onPress={() => {
                        setIsL(true)
                        setIsFocused1(false)
                        navigation.navigate(convert_game_screen)
                    }}
                    style={{ justifyContentL: 'center', alignItems: 'center' }}
                >
                    <Text style={isFocused1 ? { color: 'white', backgroundColor: '#52d8f2', fontSize: 20, padding: 10 } : { color: '#52d8f2', backgroundColor: '#fff', fontSize: 20, padding: 10 }}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPressIn={() => setIsFocused2(true)}
                    onPress={() => {
                        setIsFocused2(false)
                        navigation.navigate(register_screen)
                    }}
                    style={{ justifyContentL: 'center', alignItems: 'center' }}
                >
                    <Text style={isFocused2 ? { color: 'white', backgroundColor: '#39C5BB', fontSize: 20, padding: 10 } : { color: '#39C5BB', backgroundColor: '#fff', fontSize: 20, padding: 10 }}>REGISTER</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    return (
        <DefaultLayout>
            <StartView />
        </DefaultLayout>
    )
}

export default start_view_screen