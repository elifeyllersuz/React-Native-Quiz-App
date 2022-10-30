import React, { useState } from 'react'
import { SafeAreaView, View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image } from 'react-native';
import styles from './AddQuestionStyle';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { createQuestion } from '../../utils/database';
import { showMessage } from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const AddQuestion = ({ navigation, route }) => {

    const [currentQuizId, setCurrentQuizId] = useState(route.params.currentQuizId);
    const [currentQuizTitle, setCurrentQuizTitle] = useState(route.params.currentQuizTitle);
    const [question, setQuestion] = useState('');
    const [imageUri,setImageUri] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const [optionThree, setOptionThree] = useState('');
    const [optionFour, setOptionFour] = useState('');

    const handleQuestionSave = async () => {
        if (
            question == '' ||
            correctAnswer == '' ||
            optionTwo == '' ||
            optionThree == '' ||
            optionFour == ''
        ) {
            return;
        }
        let currentQuestionId = Math.floor(100000 + Math.random() * 9000,
        ).toString();

        //upload image

        let imageUrl = '';

        if(imageUri != ''){
            const reference = storage().ref(`/images/questions/${currentQuizId}_${currentQuestionId}`);
            await reference.putFile(imageUri).then(() => {
                console.log('Image Uploaded!');
            })

            imageUrl = await reference.getDownloadURL();
        }

        // add question to db 
        await createQuestion(currentQuizId, currentQuestionId, {
            question: question,
            correct_answer: correctAnswer,
            incorrect_answers: [optionTwo, optionThree, optionFour],
            imageUrl:imageUrl
        })

        showMessage({
            message: 'Question Saved!',
            type: 'success'
        })

        setQuestion('');
        setCorrectAnswer('');
        setOptionTwo('');
        setOptionThree('');
        setOptionFour('');

    }

    const selectImage = () => {
        launchImageLibrary(
            {
                mediaType:'photo'
            },
            ({assets}) => {
                if(assets && assets.length > 0){
                    setImageUri(assets[0].uri);
                }
            }
        )

    }

    return (
        <KeyboardAvoidingView
            style={styles.keyboardView}>
            <ScrollView style={styles.container}>
                <View style={styles.inner_container}>
                    <Text style={styles.text}>Add Question</Text>
                    <Text style={styles.quizTitle}>For {currentQuizTitle}</Text>

                    <Input
                        placeholder='Question'
                        onType={setQuestion}
                        value={question} />

                    {imageUri == '' ? (
                        <TouchableOpacity
                            style={styles.image}
                            onPress={selectImage}>

                            <Text style={styles.image_text}>+ add image</Text>

                        </TouchableOpacity>

                    ) : (
                        <Image style={styles.image_mode} source={{ uri: imageUri }} 
                        resizeMode='contain' />
                    )}


                    <View style={styles.options}>

                        <Input placeholder='Correct Answer'
                            value={correctAnswer}
                            onType={setCorrectAnswer} />
                        <Input placeholder='Option 2'
                            value={optionTwo}
                            onType={setOptionTwo} />
                        <Input placeholder='Option 3'
                            value={optionThree}
                            onType={setOptionThree} />

                        <Input placeholder='Option 4'
                            value={optionFour}
                            onType={setOptionFour} />
                    </View>
                    <Button
                        text='Save Question'
                        onPress={handleQuestionSave}

                    />
                    <Button
                        text='Done & Go Home'
                        onPress={() => {
                            setCurrentQuizId('');
                            navigation.navigate('HomeScreen');
                        }}

                    />
                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}

export default AddQuestion;