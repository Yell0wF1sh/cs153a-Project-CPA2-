import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-community/picker'
import CNYToUSD from './components/cnyToUSD'
import USDToCNY from './components/usdToCNY'
import JPYToUSD from './components/jpyToUSD'
import USDToJPY from './components/usdToJPY'
import Test from './components/test'
// import { ScrollView } from 'react-native-web';

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

  return (
    <ImageBackground source={{ uri: 'https://www.mainebiz.biz/sites/default/files/styles/article_small_cover_image/public/2020-09/file_photo.jpg?h=6d942559&itok=5LXgW5AS' }}
      resizeMode='cover' style={{ flex:1, height: '100%', width: '100%'}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 1.0, backgroundColor: 'rgba(255,255,255,.5)' }}>
        <Text style={{ fontFamily: 'Jazz LET', fontSize: 30, textAlign: 'center', fontWeight: '600' }}>Currency Converter</Text>
        <Picker
          selectedValue={selectedPage}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue) => setSelectedPage(itemValue)}
        >
          <Picker.Item label="Chinese Yuan to US Dollar" value="Chinese Yuan to US Dollar converter" />
          <Picker.Item label="US Dollar to Chinese Yuan" value="US Dollar to Chinese Yuan converter" />
          <Picker.Item label="Japanese Yen to US Dollar" value="Japanese Yen to US Dollar converter" />
          <Picker.Item label="US Dollar to Japanese Yen" value="US Dollar to Japanese Yen converter" />
        </Picker>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => navigation.navigate(selectedPage)}
        >
          <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-right-arrow-icon-png-image_4231911.jpg' }}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
      <Test style={{flex:1}}/>
    </ImageBackground>
  )
}

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
    // <ScrollView style={{ padding: 0, margin: 0 }}>
    //   <View>
        <CNYToUSD />
    //   </View>
    // </ScrollView>
  );
}

function usd_to_cny_screen ({ navigation }) {
  // const [currency1, setCurrency1] = useState("Currency 1")
  // const [currency2, setCurrency2] = useState("Currency 2")
  return (
    <ScrollView style={{ padding: 0, margin: 0 }}>
      <View>
        <USDToCNY />
          {/* <Picker
            selectedValue={currency1}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue) => setCurrency1(itemValue)}
          >
            <Picker.Item label="Chinese Yuan" value="Chinese Yuan" />
            <Picker.Item label="US Dollar" value="US Dollar" />
            <Picker.Item label="Japanese Yen" value="Japanese Yen" />
          </Picker>
          <Picker
            selectedValue={currency2}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue) => setCurrency2(itemValue)}
          >
            <Picker.Item label="Chinese Yuan" value="Chinese Yuan" />
            <Picker.Item label="US Dollar" value="US Dollar" />
            <Picker.Item label="Japanese Yen" value="Japanese Yen" />
          </Picker> */}
        </View>
    </ScrollView>
  );
}

function jpy_to_usd_screen({ navigation }) {
  return (
      <ImageBackground source={{ uri: 'https://graphicriver.img.customer.envatousercontent.com/files/264785414/preview.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=a249c4ab457116fd16048abd410e19e1' }}
                  resizeMode='cover' style={{ height: '100%', width: '100%'}}>
          <JPYToUSD />
      </ImageBackground>
  );
}

function usd_to_jpy_screen({ navigation }) {
  return (
    <ScrollView style={{ padding: 0, margin: 0 }}>

      <View>
        <USDToJPY />
        {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
      </View>
    </ScrollView>
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
