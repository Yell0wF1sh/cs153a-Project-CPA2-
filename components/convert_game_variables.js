import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CurrencyConvertor from '../screens/currency_converter'

export const percentageDiff = (name) => {
  const [changePer, setChangePer] = useState(0)

  useEffect(() => {

  }, [])

  let diff = Math.round(x * 1000) / 1000 + "%"
  let stringDiff = (<Text></Text>)
  if (numFrom < numTo) {
    stringDiff =
      <Text style={{ color: 'red' }}>
        ⇧ +{diff}%
      </Text>
  }
  else if (numFrom == numTo) {
    stringDiff =
      <Text style={{ color: 'lightgrey' }}>
        +0%
      </Text>
  }
  else {
    stringDiff =
      <Text style={{ color: 'limegreen' }}>
        ⇩ -{diff}%
      </Text>
  }

  return (stringDiff)
}


