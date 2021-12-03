import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Linking, Alert } from 'react-native';

export const CurrencyCard = ({ currencyText, percentChange, isIncrease, children }) => {
    return (
        <View style={{
            width: '45%',
            borderRadius: 10,
            backgroundColor: 'white',
            padding: 5,
            margin: 10,
            shadowColor: 'grey',
            shadowRadius: 10,
            shadowOffset: {
                width: 5,
                height: 5,
            },
        }}>
            <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>{currencyText}</Text>
                <Text style={{ fontSize: 12, color: isIncrease ? 'red' : 'green' }}>
                    {isIncrease ? "⇧" + percentChange : "⇩" + percentChange}
                </Text>
            </View>
            {children}
        </View>
    )
}

const externalLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url)
    } else {
        Alert.alert('Hyperlink failed')
    }
}

export const NewsCard = ({ children, link, image }) => {

    return (
        <TouchableOpacity
            onPress={() => {
                externalLink(link)
            }}
        >
            <ImageBackground
                source={(image == null) ? require('../assets/unknown.png') : { uri: image }}
                resizeMode='cover'
                style={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                    height: 170,
                    shadowColor: 'grey',
                    shadowRadius: 10,
                    shadowOffset: {
                        width: 5,
                        height: 5,
                    },
                    marginVertical: 10,
                    flexDirection: 'column-reverse',
                }}
            >
                {children}
            </ImageBackground>
        </TouchableOpacity>
    )
}

export const HistoryCard = ({ children }) => {
    return (
        <View style={{
            borderRadius: 10,
            backgroundColor: 'white',
            padding: 20,
            shadowColor: 'grey',
            shadowRadius: 10,
            shadowOffset: {
                width: 5,
                height: 5,
            },
            marginVertical: 10
        }}>
            {children}
        </View>
    )
}