import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';


function register_screen({ navigation }) {
    const [isFocused1, setIsFocused1] = useState(false)
    const [isFocused2, setIsFocused2] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [email, setEmail] = useState("")
    const [secret, setSecret] = useState("")

    useEffect(() => {
        const fetch = async () => {
            await axios.post('https://converter-game.herokuapp.com/register',
                { email: email })
                .then((message) => {
                    console.log(message)
                    setIsSuccessful(message['data']['success'])
                    setSecret(message['data']['secret'])
                }).catch((error) => console.error(error))
        }
        try {
            fetch()
            setIsRegister(false)
        } catch (e) {
            console.error(e)
        }
    }, [isRegister])

    if (!isSuccessful) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Enter your email here: </Text>
                    <TextInput
                        placeholder='Email'
                        onChangeText={(text) => {
                            setEmail(text)
                            console.log(email)
                        }}
                        style={{ fontSize: 20, backgroundColor: 'white', borderRadius: 20, padding: 5, marginBottom: 2.5, width: 250, textAlign: 'center' }}
                    />
                    <TouchableOpacity
                        onPressIn={() => setIsFocused1(true)}
                        onPress={() => {
                            setIsRegister(true)
                            setIsFocused1(false)
                        }}
                        style={{ width: 250, marginTop: 5, marginBottom: 2.5 }}
                    >
                        <Text style={isFocused1 ? { color: '#39C5BB', backgroundColor: '#fff', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 20 } : { color: 'white', backgroundColor: '#39C5BB', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 20 }}>CREATE AN ACCOUNT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPressIn={() => setIsFocused2(true)}
                        onPress={() => {
                            setIsFocused2(false)
                            navigation.navigate('Home', { screen: 'Game' })
                        }}
                        style={{ width: 250, marginTop: 2.5 }}
                    >
                        <Text style={isFocused2 ? { color: '#52d8f2', backgroundColor: '#fff', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 20 } : { color: 'white', backgroundColor: '#52d8f2', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 20 }}>BACK</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}></View>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 5 }}>
                    <Image
                        source={require('../assets/like.gif')}
                        style={{ height: 100, width: 100 }}
                    />
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>You are registered!</Text>
                    <Text style={{ fontSize: 20 }}>Your secret is {secret}</Text>
                    <TouchableOpacity
                        onPressIn={() => setIsFocused1(true)}
                        onPress={() => {
                            setIsFocused1(false)
                            navigation.navigate('Games')
                        }}
                        style={{ width: 250, }}
                    >
                        <Text style={isFocused1 ? { color: '#39C5BB', backgroundColor: '#fff', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 20 } : { color: 'white', backgroundColor: '#39C5BB', fontSize: 20, padding: 10, textAlign: 'center', borderRadius: 20 }}>START THE GAME!</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}></View>
            </SafeAreaView>
        )
    }


}

export default register_screen