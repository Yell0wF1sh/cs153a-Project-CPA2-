import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/bottom_tabs'

export function HomeScreen({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 1.0, backgroundColor: 'rgba(255,255,255,.5)' }}>
      <Text style={{ fontFamily: 'Jazz LET', fontSize: 30, textAlign: 'center', fontWeight: 600 }}>Currency Converter</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={Tabs} />
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

