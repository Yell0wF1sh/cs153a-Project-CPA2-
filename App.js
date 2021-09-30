import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import cnyToUSD from './components/cnyToUSD'
import usdToCNY from './components/usdToCNY'
import jpyToUSD from './components/jpyToUSD'
import usdToJPY from './components/usdToJPY'


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Chinese Yuan to US Dollar converter"
        onPress={() => navigation.navigate('Chinese Yuan to US Dollar converter')}
      />
      <Button
        title="US Dollar to Chinese Yuan converter"
        onPress={() => navigation.navigate('US Dollar to Chinese Yuan converter')}
      />
      <Button
        title="Japanese Yen to US Dollar converter"
        onPress={() => navigation.navigate('Japanese Yen to US Dollar converter')}
      />
      <Button
        title="US Dollar to Japanese Yen converter"
        onPress={() => navigation.navigate('US Dollar to Japanese Yen converter')}
      />
    </View>
  );
}

function cny_to_usd_screen() {
  return (
    <View>
      <cnyToUSD />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function usd_to_cny_screen() {
  return (
    <View>
      <usdToCNY />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function jpy_to_usd_screen() {
  return (
    <View>
      <jpyToUSD />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function usd_to_jpy_screen() {
  return (
    <View>
      <usdToJPY />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chinese Yuan to US Dollar converter" component={cny_to_usd_screen} />
        <Stack.Screen name="US Dollar to Chinese Yuan converter" component={usd_to_cny_screen} />
        <Stack.Screen name="Japanese Yen to US Dollar converter" component={jpy_to_usd_screen} />
        <Stack.Screen name="US Dollar to Japanese Yen converter" component={usd_to_jpy_screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
