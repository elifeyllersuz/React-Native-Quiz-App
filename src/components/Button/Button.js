import React from 'react'
import { TouchableOpacity,View,Text } from 'react-native';
import styles from './ButtonStyle';
const Button = ({text,onPress,loading}) => {

    return(
        <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        style={styles.container}>
            <Text style={styles.title}>{text}</Text>
        </TouchableOpacity>
    )
   
}

export default Button;