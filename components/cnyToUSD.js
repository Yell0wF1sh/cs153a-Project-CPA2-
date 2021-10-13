import React, { useState, useEffect} from 'react';
import { ScrollView, FlatList, Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FlatList } from 'react-native-web';



const cnyToUSD = () => {
    const [num1, setNum1] = useState(1)
    const [num2, setNum2] = useState(0.15)
    const [history, setHistory] = useState([])
    const [viewingHis, setViewingHis] = useState(false)
    const convert = (value) => { return (value * 0.15) }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'grey',
        },
        box1: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'green',
            //alignItems: 'center'
        },
        box2: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'blue',
            //alignItems: 'center'
        },
        text: {
            fontFamily: 'Times',
            fontSize: 24,
        },
        button: {
            alignItems: "flex-start"
        }
    })

    useEffect(() => {getData()
    }, [])

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@cnyToUSD', jsonValue)
        } catch (e) {
            console.dir(e)
        }
    }

    const getData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem('@cnyToUSD')
            let data = null
            if (jsonValue!=null) {
                data = JSON.parse(jsonValue)
                setHistory(data)
            }   else {
                setHistory([])
            } 
        } catch(e) {
            console.dir(e)
        }
    }

    const clearHistory = async() => {
        try{
            await AsyncStorage.clear()
        } catch(e) {
            console.dir(e)
        }
    }

    const renderHistory = ({item}) => {
        return (
            <View>
                <Text>{item.num1}</Text>
                <Text>{item.num2}</Text>
                {/* <Button 
                    title='Close History'
                    onPress={() => setViewingHis(false)}
                /> */}
            </View>
        )
    }

    let closeHistoryButton = (<View></View>)

    if (viewingHis) {
        closeHistoryButton =
        <Button 
            title='Close History'
            onPress={() => {setViewingHis(false)}}
        />
    }

    let historyView = (<View></View>)

    if (viewingHis) {
        historyView = 
            <View>
                <FlatList 
                    data={history.reverse()}
                    renderItem={renderHistory}
                    KeyExtractor={item => item.time}
                />
                <Button 
                    title='Clear History'
                    onPress={() => {clearHistory()
                    setHistory([])}
                    }
                />
            </View>
    }

    return (
        <ScrollView style={{padding:0, margin:0}}>
            < View style={styles.container} >

                <View style={styles.box1}>
                    <Text style={styles.text}>
                        Chinese Yuan
                    </Text>
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={styles.text}>￥</Text>
                        <TextInput
                            style={styles.text}
                            placeholder="1"
                            onChangeText={text => setNum1(text)}
                        />
                    </View>
                </View>

                <View style={styles.container} >
                    <Image
                        style={{ width: 32, height: 32 }}
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/35/35660.png' }}
                    />
                </View>

                <View style={styles.box2}>
                    <Text style={styles.text}>
                        US Dollar
                    </Text>
                    <Text style={styles.text}>
                        ${num2}
                    </Text>
                </View>

                <View style={styles.box}>
                    <Button
                        title='Convert'
                        style={styles.button}
                        onPress={() => { let answer = convert(num1)
                            setNum2(answer)
                            console.log(num2)
                            console.log(answer)
                            const newHistory = history.concat(
                                {
                                    'time': Date.now(),
                                    'num1': num1,
                                    'num2': num2,
                                }
                            )
                            setHistory(newHistory)
                            storeData(newHistory)
                        }}
                    />
                </View>
                <Button 
                    title='View history'
                    onPress={() => {setViewingHis(true)}}
                />
                {historyView}
                {closeHistoryButton}
            </ View >
        </ScrollView>
    )
}

export default cnyToUSD