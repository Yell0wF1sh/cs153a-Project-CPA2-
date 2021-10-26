import React, { useState, useEffect } from 'react';
import { ScrollView, ImageBackground, FlatList, Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cnyToUSD = () => {
    const [num1, setNum1] = useState(1)
    const [num2, setNum2] = useState(0.15)
    const convert = (value) => { return (Math.round(value * 0.15 * 1000) / 1000) }
    const [history, setHistory] = useState([])
    const [viewingHis, setViewingHis] = useState(false)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: 'rgba(255,255,255,.5)',
        },
        convert_area: {
            flex: 6,
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
        },
        box1: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        box2: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        text: {
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            backgroundColor: "#000000c0",
        },
    })

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const newHistory = history.concat(
            {
                'time': Date.now(),
                'cny': num1,
                'usd': num2,
            }
        )
        setHistory(newHistory)
        storeData(newHistory)
    }, [num2])


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@cnyToUSD', jsonValue)
        } catch (e) {
            console.dir(e)
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@cnyToUSD')
            let data = null
            if (jsonValue != null) {
                data = JSON.parse(jsonValue)
                setHistory(data)
            } else {
                setHistory([])
            }
        } catch (e) {
            console.dir(e)
        }
    }

    const clearHistory = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.dir(e)
        }
    }

    const renderHistory = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 2 }}>
                <Text style={{ fontSize: 16, backgroundColor: 'lightgreen', width: 100, textAlign: 'center' }}>￥{item.cny}</Text>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>➔</Text>
                <Text style={{ fontSize: 16, backgroundColor: 'pink', width: 100, textAlign: 'center' }}>${item.usd}</Text>
            </View>
        )
    }

    let viewCNYEdit = (
        <ImageBackground source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg' }}
            resizeMode='cover' style={{ height: '100%', width: '100%', flex: 1 }}>
            <View style={styles.box1}>
                <Text style={styles.text}>
                    Chinese Yuan
                </Text>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.text}>￥</Text>
                    <TextInput
                        style={{
                            width: '100%',
                            color: 'white',
                            // fontFamily: 'Times',
                            fontSize: 24,
                            textAlign: 'center',
                            backgroundColor: "#000000c0",
                        }}
                        placeholder="1"
                        onChangeText={text => setNum1(text)}
                    />
                </View>
            </View>
        </ImageBackground>
    )


    let viewUSD = (
        <ImageBackground source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg' }}
            resizeMode='cover' style={{ height: '100%', width: '100%', flex: 1 }}>
            <View style={styles.box2}>
                <Text style={styles.text}>
                    US Dollar
                </Text>
                <Text style={styles.text}>
                    ${num2}
                </Text>
            </View>
        </ImageBackground>
    )

    let historyView = (<View></View>)

    if (viewingHis) {

        historyView =
            <View>
                <FlatList
                    data={history.reverse().slice(0, 5)}
                    renderItem={renderHistory}
                    KeyExtractor={(item) => item.time}
                />
                <Button
                    title='Clear History'
                    color='#d32f2f'
                    onPress={() => {
                        clearHistory()
                        setHistory([])
                    }
                    }
                />
            </View>
    }


    return (

        < View style={styles.container} >
            <View style={styles.convert_area}>
                {viewCNYEdit}
                <View style={{ paddingVertical: 10 }}>
                    <Image
                        style={{ width: 32, height: 32 }}
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/35/35660.png' }}
                    />
                </View>
                {viewUSD}

            </View>
            <View style={{ flex: 1, paddingTop: 5 }}>
                <Button
                    title='Convert'
                    color='#4caf50'
                    onPress={() => {
                        setNum2(convert(num1))
                    }}
                />
            </View>
            <View style={{ flex: 4 }}>
                <Button
                    title='Toggle history'
                    color='#e65100'
                    onPress={() => { setViewingHis(!viewingHis) }}
                />
                {historyView}
            </View>
        </ View >
    )
}

export default cnyToUSD