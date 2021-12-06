import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { DefaultLayout } from '../components/screen_layout';

const start_view_screen = ({ navigation }) => {
    const [isL, setIsL] = useState(false)
    const [email, setEmail] = useState("")
    const [secret, setSecret] = useState("")
    const [isLogged, setIsLogged] = useState(false)
    const [tryCount, setTryCount] = useState(0)
    const [isFocused1, setIsFocused1] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            await axios.post('https://converter-game.herokuapp.com/login',
                { email: email, secret: secret })
                .then((message) => {
                    setIsLogged(message['data']['success'])
                })
                .catch((error) => console.error(error))
        }
        fetch()
        setIsL(false)
    }, [isL])

    let ErrorMessage = (<View></View>)

    if (tryCount > 0 && isLogged) {
        ErrorMessage = (<View><Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold', textAlign: 'center' }}>Failed to login! Check your email and secret!</Text></View>)
    }

    if (!isLogged) {
        return (
            <DefaultLayout>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                            style={{ fontSize: 20, backgroundColor: 'white', borderRadius: 20, padding: 5, marginBottom: 2.5, width: 200, textAlign: 'center' }}
                        />
                        <TextInput
                            placeholder='Secret'
                            onChangeText={(text) => {
                                setSecret(text)
                            }}
                            style={{ fontSize: 20, backgroundColor: 'white', borderRadius: 20, padding: 5, marginTop: 2.5, marginBottom: 5, width: 200, textAlign: 'center' }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setIsL(true)
                                setTryCount(tryCount + 1)
                            }}
                            style={{ width: 150, marginTop: 5, marginBottom: 2.5 }}
                        >
                            <Text style={{ color: 'white', backgroundColor: '#52d8f2', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 20 }}>
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Register')
                            }}
                            style={{ width: 150, marginTop: 2.5 }}
                        >
                            <Text style={{ color: 'white', backgroundColor: '#39C5BB', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 20 }}>
                                REGISTER
                            </Text>
                        </TouchableOpacity>
                        {ErrorMessage}
                    </View>
                    <View style={{ flex: 1 }}></View>
                </SafeAreaView>
            </DefaultLayout>
        )
    } else {
        return (
            <DefaultLayout>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../assets/like.gif')}
                            style={{ height: 100, width: 100 }}
                        />
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>You are logged in as {email}!</Text>
                        <TouchableOpacity
                            onPressIn={() => setIsFocused1(true)}
                            onPress={() => {
                                navigation.navigate('Games')
                            }}
                            style={{ width: 250 }}
                        >
                            <Text style={isFocused1 ? { color: '#39C5BB', backgroundColor: '#fff', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 20 } : { color: 'white', backgroundColor: '#39C5BB', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 20 }}>START THE GAME!</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </SafeAreaView>
            </DefaultLayout>
        )
    }
}

export default start_view_screen