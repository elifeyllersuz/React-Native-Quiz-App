import React from 'react'
import { View,TextInput } from 'react-native';
import styles from './Inputstyle';


const Input = ({placeholder,onType,value,iconName,isSecure}) => {

    return (
        <View style={styles.container}>
           <TextInput style = {styles.input}
           placeholder={placeholder}
           onChangeText={onType}
           value={value}
           secureTextEntry={isSecure}/>
        </View>
    )
}

export default Input;