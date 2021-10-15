import React, { useState, useEffect } from 'react';
import { ScrollView, ImageBackground, FlatList, Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FlatList } from 'react-native-web';



const cnyToUSD = () => {
    const [num1, setNum1] = useState(1)
    const [num2, setNum2] = useState(0.15)
    const [history, setHistory] = useState([])
    const [viewingHis, setViewingHis] = useState(false)
    // const [isReversed, setIsReversed] = useState(false)
    const convert = (value) => { return (value * 0.15) }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 10,
            backgroundColor: 'rgba(255,255,255,.5)'
            // alignItems: 'center',
            // backgroundColor: 'grey',
        },
        convert_area: {
            flexDirection: 'row',
            flex: 5,
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingVertical: 10
            // alignItems: 'center',
        },
        box1: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            // backgroundColor: 'limegreen',
            // paddingRight: 10,
            //alignItems: 'center'
        },
        box2: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            // backgroundColor: 'pink',
            // paddingLeft: 10,
            //alignItems: 'center'
        },
        text: {
            color: 'white',
            fontFamily: 'Times',
            fontSize: 24,
            textAlign: 'center',
            backgroundColor: "#000000c0",
        },
        button: {
            alignItems: "flex-start"
        }
    })

    useEffect(() => {
        getData()
    }, [])

    // useEffect(() => {

    // }, [isReversed])

    useEffect(() => {
        const newHistory = history.concat(
            {
                'time': Date.now(),
                'num1': num1,
                'num2': num2,
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
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, backgroundColor: 'lightgrey', width: 50, textAlign: 'center' }}>{item.num1}</Text>
                <Text style={{ fontSize: 14, width: 50, textAlign: 'center' }}>{item.num2}</Text>
                {/* <Button 
                    title='Close History'
                    onPress={() => setViewingHis(false)}
                /> */}
            </View>
        )
    }

    let viewHistoryButton = (<View></View>)

    if (viewingHis != true) {
        viewHistoryButton =
            <Button
                title='View history'
                onPress={() => { setViewingHis(true) }}
            />
    }

    let closeHistoryButton = (<View></View>)
    let historyView = (<View></View>)

    if (viewingHis) {
        closeHistoryButton =
            <Button
                title='Close History'
                onPress={() => { setViewingHis(false) }}
            />

        historyView =
            <View>
                <FlatList
                    data={history.reverse()}
                    renderItem={renderHistory}
                    KeyExtractor={item => item.time}
                />
                <Button
                    title='Clear History'
                    onPress={() => {
                        clearHistory()
                        setHistory([])
                    }
                    }
                />
            </View>
    }

    return (
        <ScrollView style={{ padding: 0, margin: 0 }}>
            <ImageBackground source={{ uri: 'https://graphicriver.img.customer.envatousercontent.com/files/264785414/preview.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=a249c4ab457116fd16048abd410e19e1' }}
                resizeMode='cover'>
                < View style={styles.container} >
                    <View style={styles.convert_area}>

                        <ImageBackground source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg' }}
                            resizeMode='cover' style={{ flex: 1 }}>
                            <View style={styles.box1}>

                                <Text style={styles.text}>Chinese Yuan</Text>
                                <View style={{ flexDirection: 'row' }}>

                                    <Text style={styles.text}>￥</Text>
                                    <TextInput
                                        style={{
                                            width: '90%',
                                            color: 'white',
                                            fontFamily: 'Times',
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

                        <View style={{ padding: 20 }}>
                            <Image
                                style={{ width: 32, height: 32 }}
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/35/35660.png' }}
                            />
                        </View>

                        <ImageBackground source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg' }}
                            resizeMode='cover' style={{ flex: 1 }}>
                            <View style={styles.box2}>
                                <Text style={styles.text}>US Dollar</Text>
                                <Text style={styles.text}>${num2}</Text>
                            </View>
                        </ImageBackground>

                    </View>
                    <View style={{ flex: 2 }}>
                        <Button
                            title='Convert'
                            style={styles.button}
                            onPress={() => { setNum2(convert(num1)) }}
                        />
                    </View>
                    {viewHistoryButton}
                    {historyView}
                    {closeHistoryButton}
                </ View >
            </ImageBackground>
        </ScrollView>
    )
}

export default cnyToUSD