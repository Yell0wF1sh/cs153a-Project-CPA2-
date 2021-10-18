import React, {useState, useEffect} from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, Button} from 'react-native';

const [isSwitched, setIsSwitched] = useState(false)

const test = () => {
useEffect(() => {
    console.log('switched')
},[isSwitched])

let area1 = (
    <View>
        <Text>area1</Text>
        <Text>area1</Text>
        <Text>area1</Text>
    </View>
)

if (isSwitched) {
    area1 = 
    <View>
        <Text>area2</Text>
        <Text>area2</Text>
        <Text>area2</Text>
    </View>
}

let area2 =(
    <View>
        <Text>area2</Text>
        <Text>area2</Text>
        <Text>area2</Text>
    </View>
)

if (isSwitched) {
    area1 = 
    <View>
        <Text>area1</Text>
        <Text>area1</Text>
        <Text>area1</Text>
    </View>
}

return (
    {area1}
    <Button 
        title='switch'
        onPress={() => {setIsSwitched(true)}}
    />
    {area2}
)
}