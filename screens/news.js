import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker'
import { DefaultLayout } from '../components/screen_layout';
import { NewsCard } from '../components/component_templates';

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

    const refreshIcon = () => {
        if (isRefresh) {
            return (<Image source={require('../assets/refresh.gif')} />)
        }
        else {
            return (<Image source={require('../assets/refresh.png')} />)
        }
    }

    useEffect(() => {
        newsapi.v2.topHeadlines({
            q: 'trump',
            category: 'politics',
            language: 'en',
            country: 'us'
        }).then(response => {
            console.log(response);
        });
        setIsRefresh(false)
    }, [isRefresh])

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
        </SafeAreaView>
    )
}

export default news_screen