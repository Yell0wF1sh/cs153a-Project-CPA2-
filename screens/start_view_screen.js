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
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../assets/game_present.png')}
                        style={{ height: 200, width: 200, marginBottom: 10 }}
                    />
                    <Text style={{ fontSize: 40, fontWeight: 'bold', fontStyle: 'italic', marginBottom: 10 }}>Convert Game</Text>
                    <TextInput
                        placeholder='Email'
                        onChangeText={(text) => {
                            setEmail(text)
                        }}
                        style={{ fontSize: 20, backgroundColor: 'white', borderRadius: 20, padding: 5, marginBottom: 2.5 }}
                    />
                    <TextInput
                        placeholder='Secret'
                        onChangeText={(text) => {
                            setSecret(text)
                        }}
                        style={{ fontSize: 20, backgroundColor: 'white', borderRadius: 20, padding: 5, marginTop: 2.5, marginBottom: 5 }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setIsL(true)
                            navigation.navigate('Home', { screen: 'Game' })
                        }}
                        style={{ width: 150, marginTop: 5, marginBottom: 2.5, borderRadius: 20 }}
                    >
                        <Text style={{ color: 'white', backgroundColor: '#52d8f2', fontSize: 20, padding: 10, textAlign: 'center' }}>
                            LOGIN
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Register')
                        }}
                        style={{ width: 150, marginTop: 2.5, borderRadius: 20 }}
                    >
                        <Text style={{ color: 'white', backgroundColor: '#39C5BB', fontSize: 20, padding: 10, textAlign: 'center' }}>
                            REGISTER
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}></View>
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