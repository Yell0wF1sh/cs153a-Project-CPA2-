import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export const CurrencyCard = ({ currencyText, percentChange, isIncrease, children }) => {
    return (
        <View style={{
            width: '45%',
            borderRadius: 10,
            backgroundColor: 'white',
            padding: 5,
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

export const NewsCard = ({children, link}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                
            }}
        >
            <View   style={{
                borderRadius: 10,
                backgroundColor: 'white',
                padding: 20,
                shadowColor: 'grey',
                shadowRadius: 10,
                shadowOffset: {
                    width: 5,
                    height: 5,
                },
                marginVertical: 10}}
            >
                {children}
            </View>
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