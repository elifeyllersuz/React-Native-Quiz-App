import React, { useState } from 'react'
import { SafeAreaView,Text } from 'react-native';
import styles from './CreateQuizStyle';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { createQuiz } from '../../utils/database';
import { showMessage } from 'react-native-flash-message';

const CreateQuiz = ({navigation}) => {

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const goToAddQuiz = () => {
        navigation.navigate('AddQuestionScreen',{
            currentQuizId:'101788',
            currentQuizTitle:'demo'
        })
    }

    const handleSaveQuiz = async () =>{
        const currentQuizId = Math.floor(100000+Math.random()*9000).toString();

        //save to firestore
        await createQuiz(currentQuizId,title,description)

        navigation.navigate('AddQuestionScreen',{
            currentQuizId:currentQuizId,
            currentQuizTitle: title
        })

        //reset
        setTitle('')
        setDescription('')
        showMessage({
            message: 'Quiz saved',
            type: 'success',
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Create Quiz</Text>
            <Input
            placeholder='enter quiz title'
            value={title}
            onType={setTitle}
            />
            <Input
            placeholder='enter quiz description'
            value={description}
            onType={setDescription}

            
        />

        <Button
        text='Save Quiz'
        onPress={handleSaveQuiz}
        />
{/* 
        <Button
        text='AddQuestionScreen'
        onPress={goToAddQuiz}/> */}
        </SafeAreaView>
    )
}

export default CreateQuiz;