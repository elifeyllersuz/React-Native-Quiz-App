import React from 'react'
import { View,Text, Modal, TouchableOpacity } from 'react-native';
import styles from './ResultModalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ResultModal = ({
    isModalVisible,
    correctcount,
    incorrectcount,
    totalcount,
    handleOnClose,
    handleRetry,
    handleHome,
}) => {
    return (
        <Modal
        animationType={'slide'}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleOnClose}>
            <View style={styles.container}>
               <View style={styles.inner_container}>
                <Text style={{fontSize:28,color:'black'}}>Results</Text>
                <View style={styles.count_container}>
                  <View style={{alignItems:'center',padding:20}}>
                    <Text style={{color:'#4BB543',fontSize:30}}>{correctcount}</Text>
                    <Text style={{fontSize:16}}>Correct</Text>
                  </View>
                  <View style={{alignItems:'center',padding:20}}>
                    <Text style={{color:'#FF0000',fontSize:30}}>{incorrectcount}</Text>
                    <Text style={{fontSize:16}}>Incorrect</Text>
                  </View>
                </View>
                <Text style={{opacity:0.8}}>{totalcount - (incorrectcount + correctcount)} Unattempted</Text>

                <TouchableOpacity style={styles.button_try_again}
                onPress={handleRetry}>
                    <Icon name='replay' color='white'/>
                    <Text
                    style={styles.text_try_again}>
                      Try Again
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button_try_again}
                onPress={handleHome}>
                    <Icon name='home' color='white'/>
                    <Text
                    style={styles.text_try_again}>
                     Go Home
                    </Text>
                </TouchableOpacity>
               </View>
            </View>

        </Modal>
    )
}

export default ResultModal;