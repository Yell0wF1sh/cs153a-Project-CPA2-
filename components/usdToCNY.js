import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';

const usdToCNY = () => {
    const [num1, setNum1] = useState(1)
    const [num2, setNum2] = useState(6.67)
    const convert = (value) => { return (value * 6.67) }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey',
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
    return (
        < View style={styles.container} >

            <View style={styles.box1}>
                <Text style={styles.text}>
                    US Dollar
                </Text>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.text}>$</Text>
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
                    Chinese Yuan
                </Text>
                <Text style={styles.text}>
                    ￥{num2}
                </Text>
            </View>

            <View style={styles.box}>
                <Button
                    title='Convert'
                    style={styles.button}
                    onPress={() => setNum2(convert(num1))}
                />
            </View>

        </ View >
    )
}