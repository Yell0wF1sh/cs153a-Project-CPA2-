import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CurrencyConvertor from '../screens/currency_converter'

const convertArea = async() => {
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState([])
  const [isError, setIsError] = useState(false)

  let resultArea = 
    <View>
      <Text style={{color: 'lightgrey', fontSize: 32}}>
        {CurrencyConvertor.symbol1} {CurrencyConvertor.num1} {CurrencyConvertor.abbr1}
      </Text>
      <Text style={{fontWeight: 600, fontSize: 32}}>
        = {CurrencyConvertor.symbol2} {result} {CurrencyConvertor.abbr2}
      </Text>
    </View>

  useEffect(() => {
    resultArea = (
      <View>
        <Image 
          source={require('../assets/synchronize.png')}
          style={{height: 40, width: 40}}
        />
      </View>
    )
  },[isLoading==true])

  try {
      const response = await fetch('http://data.fixer.io/api/convert?access_key=22f408d3be87ec11e691052c2131e5b7&from=' + CurrencyConvertor.abbr1 + '&to=' + CurrencyConvertor.abbr2 + '&amount=' + CurrencyConvertor.num1);
      const json = await response.json();
      setResult(json.result);
    } catch (error) {
      console.error(error);
      setIsError(true)
    } finally {
      setIsLoading(false);
    }
  
    if (isError) {
      return(<Text style={{fontSize:20, color: 'red', fontWeight: 600}}>"These's an error while fetching data"</Text>)
    }
    else {
      return (
        resultArea
      )
    }

}

export default convertArea