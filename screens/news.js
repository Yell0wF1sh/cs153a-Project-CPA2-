import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import { DefaultLayout } from '../components/screen_layout';
import { NewsCard } from '../components/component_templates';
import axios from 'axios';

function news_screen({ navigation }) {
    return (
        <DefaultLayout>
            <News />
        </DefaultLayout>
    )
}

const News = () => {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('544289bbd7d642b78ae1bdc4a6d78cce');

    const [isRefresh, setIsRefresh] = useState(false)
    const [newsLs, setNewsLs] = useState([])

    // const refreshIcon = () => {
    //     if (isRefresh) {
    //         return (<Image source={require('../assets/refresh.gif')} />)
    //     }
    //     else {
    //         return (<Image source={require('../assets/refresh.png')} />)
    //     }
    // }

    const renderNews = ({ item }) => {
        return (
            <NewsCard link={item['url']} image={item['urlToImage']}>
                <Text style={{ paddingVertical: 5, paddingHorizontal: 10, fontSize: 16, color: 'white', backgroundColor: 'rgba(0,0,0,.5)' }}>{item['title']}</Text>
            </NewsCard>
        )
    }


    const getNews = async () => {
        let result = { data: [] }
        result = await axios.post("https://converter-game.herokuapp.com" + "/news",
            { size: 10, category: 'business' })
        setNewsLs(result.data)
        console.log(result.data)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text>Newswire</Text>
                <TouchableOpacity
                    onPress={() => {
                        // setIsRefresh(true)
                        getNews()
                    }}
                >
                    <Text>Touch</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={newsLs}
                renderItem={renderNews}
                style={{ paddingHorizontal: 10 }}
            />
        </SafeAreaView>
    )
}

export default news_screen