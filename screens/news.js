import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import { DefaultLayout } from '../components/screen_layout';
import { NewsCard } from '../components/component_templates';
import { CorsRequest } from 'cors';

function news_screen({ navigation }) {
    return (
        <DefaultLayout>
            <News />
        </DefaultLayout>
    )
}

function refreshIcon(bool) {
    if (bool) {
        return (<Image source={require('../assets/refresh.gif')} />)
    }
    else {
        return (<Image source={require('../assets/refresh.png')} />)
    }
}

const News = () => {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('544289bbd7d642b78ae1bdc4a6d78cce');

    const [isRefresh, setIsRefresh] = useState(false)
    const [newsLs, setNewsLs] = useState([])

    const refreshIcon = () => {
        if (isRefresh) {
            return (<Image source={require('../assets/refresh.gif')} />)
        }
        else {
            return (<Image source={require('../assets/refresh.png')} />)
        }
    }

    const NewsView = ({data}) => {
        for (let i = 0; i < data.length(); i ++){
            return(
                <NewsCard>
                    <Text>{data[i]['title']}</Text>
                    <Image source={{uri: data[i]['urlToImage']}}/>
                    <Text>{data[i]['description']}</Text>
                </NewsCard>    
            )
        }
    } 


    const getNews = async() => {
        await Axios.post("https://converter-game.herokuapp.com" + "/fetchNews",
            {size: 10});
        
    }

    return (
        <SafeAreaView>
            <View>
                <Text>Newswire</Text>
                <TouchableOpacity
                    onPress={() => setIsRefresh(true)}
                >
                    {refreshIcon}
                </TouchableOpacity>
            </View>
            <View>
                <NewsView data={newsLs}/>
            </View>
        </SafeAreaView>
    )
}

export default news_screen