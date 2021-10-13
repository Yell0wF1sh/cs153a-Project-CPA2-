import react from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from react

function App() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    return (
        <View>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <Button 
                title=''
                onPress={() => presse}
            />
            
        </View>
    );
}