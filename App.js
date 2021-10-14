import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-community/picker'
import CNYToUSD from './components/cnyToUSD'
import USDToCNY from './components/usdToCNY'
import JPYToUSD from './components/jpyToUSD'
import USDToJPY from './components/usdToJPY'

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Chinese Yuan to US Dollar converter"
//         onPress={() => navigation.navigate('Chinese Yuan to US Dollar converter')}
//       />
//       <Button
//         title="US Dollar to Chinese Yuan converter"
//         onPress={() => navigation.navigate('US Dollar to Chinese Yuan converter')}
//       />
//       <Button
//         title="Japanese Yen to US Dollar converter"
//         onPress={() => navigation.navigate('Japanese Yen to US Dollar converter')}
//       />
//       <Button
//         title="US Dollar to Japanese Yen converter"
//         onPress={() => navigation.navigate('US Dollar to Japanese Yen converter')}
//       />
//       </View>
//   );
// }

function HomeScreen({ navigation }) {
  const [selectedPage, setSelectedPage] = useState("Chinese Yuan to US Dollar converter")
  return(
    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Picker
      selectedValue={selectedPage}
      style={{height: 50, width: 200}}
      onValueChange={(itemValue) => setSelectedPage(itemValue)}
      >
      <Picker.Item label="Chinese Yuan to US Dollar" value="Chinese Yuan to US Dollar converter" />
      <Picker.Item label="US Dollar to Chinese Yuan" value="US Dollar to Chinese Yuan converter" />
      <Picker.Item label="Japanese Yen to US Dollar" value="Japanese Yen to US Dollar converter" />
      <Picker.Item label="US Dollar to Japanese Yen" value="US Dollar to Japanese Yen converter" />
      </Picker>
      <TouchableOpacity
      style={{padding: 10}}
        onPress={() => navigation.navigate(selectedPage)}
      >
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-right-arrow-icon-png-image_4231911.jpg'}}
                style={{width: 40, height: 40}}
        />
      </TouchableOpacity>
  </View>
  )}

// const [selectedPage, setSelectedPage] = useState("")

// function HomeScreen({ navigation }) {
//   useEffect(()=>{
//     renderView(selectedPage)
//   },[selectedPage])
//   const [selectedPage, setSelectedPage] = useState("")
//   return(
//   <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//        <Picker
//       selectedValue={selectedPage}
//       style={{height: 50, width: 200}}
//       onValueChange={(itemValue) => setSelectedPage(itemValue)}
//       >
//       <Picker.Item label="Chinese Yuan to US Dollar" value="Chinese Yuan to US Dollar converter" />
//       <Picker.Item label="US Dollar to Chinese Yuan" value="US Dollar to Chinese Yuan converter" />
//       <Picker.Item label="Japanese Yen to US Dollar" value="Japanese Yen to US Dollar converter" />
//       <Picker.Item label="US Dollar to Japanese Yen" value="US Dollar to Japanese Yen converter" />
//       </Picker>
//   </View>
//   )}

// function renderView(name) {
//   if (name == "Chinese Yuan to US Dollar converter") {
//     <CNYToUSD />
//   }
//   if (name == "US Dollar to Chinese Yuan converter") {
//     <USDToCNY />
//   }
//   if (name == "Japanese Yen to US Dollar converter" ) {
//     <JPYToUSD />
//   }
//   if (name == "US Dollar to Japanese Yen converter") {
//     <USDToJPY />
//   }
//   else {
//     <View></View>
//   }
// }

function cny_to_usd_screen({ navigation }) {
  return (
    <View>
      <CNYToUSD />
      {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
    </View>
  );
}

function usd_to_cny_screen({ navigation }) {
  return (
    <View>
      <USDToCNY />
      {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
    </View>
  );
}

function jpy_to_usd_screen({ navigation }) {
  return (
    <View>
      <JPYToUSD />
      {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
    </View>
  );
}

function usd_to_jpy_screen({ navigation }) {
  return (
    <View>
      <USDToJPY />
      {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
    </View>
  );
}

const Stack = createNativeStackNavigator();

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
