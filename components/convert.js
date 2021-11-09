import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CurrencyConvertor from '../screens/currency_converter'

const convertValue = async (base, symbols) => {
  try {
    const response = await fetch('http://data.fixer.io/api/latest?access_key=22f408d3be87ec11e691052c2131e5b7&base='
      + base + '&symbols=' + symbols)
    const json = await response.json()
    return json.rates
  } catch (error) {
    console.error(error)
  }
}

export default convertValue
