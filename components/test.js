import React, {useState, useEffect} from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, Button, Image} from 'react-native';


function image(){
return (
    <View>
        <Image 
            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg'}}
        />
    </View>
)
}

export default image