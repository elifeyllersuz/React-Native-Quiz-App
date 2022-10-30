import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native';
//import { array } from 'yup';
import styles from './PlayQuizStyle';
import { getQuestionsByQuizId, getQuizById } from '../../utils/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button/Button';
import ResultModal from '../../components/modal/ResultModal/ResultModal';


const PlayQuiz = ({ navigation, route }) => {
    const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);


    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [isResultModalVisible, setisResultModalVisible] = useState(false);

    const succesColor = '#4BB543';
    const white = '#ffffff'
    const errorColor = '#FF0000';
    const blackCode = '#000000'

    //dizi elemanlarını karıştır
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {

            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    const getQuizAndQuestionDetails = async () => {

        //get quiz
        let currentQuiz = await getQuizById(currentQuizId);
        currentQuiz = currentQuiz.data();
        setTitle(currentQuiz.title);

        //get questions for current quiz
        const questions = await getQuestionsByQuizId(currentQuizId)

        let tempQuestions = [];
        await questions.docs.forEach(async result => {

            let question = result.data();

            //tüm seçeneklerin olduğu karışık array
            question.allOptions = shuffleArray([
                ...question.incorrect_answers,
                question.correct_answer
            ])
            await tempQuestions.push(question);
        })

        setQuestions([...tempQuestions]);

    }

    useEffect(() => {
        getQuizAndQuestionDetails();
    }, [])

    //seçilen option doğruysa yesil, yanlışsa kırmızı
    const getOptionBgColor = (currentQuestion, currentOption) => {
        if (currentQuestion.selectedOption) {
            if (currentOption == currentQuestion.selectedOption) {
                if (currentOption == currentQuestion.correct_answer) {
                    return succesColor;
                }
                else {
                    return errorColor;
                }

            }
            else {
                return white;
            }

        }
        else {
            return white;
        }
    }

    //seçilen option'ın text rengini ayarlama
    const getOptionTextColor = (currentQuestion, currentOption) => {
        if (currentQuestion.selectedOption) {
            if (currentOption == currentQuestion.selectedOption) {
                return white;
            }
            else {
                return blackCode;
            }
        }
        else {
            return blackCode;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='white' barStyle={'dark-content'} />
            <View style={styles.inner_container}>
                {/* <Icon
           onPress = {() => navigation.goBack()}
           name='keyboard-backspace'
           size={30}
           /> */}

                <Text style={styles.title}>{title}</Text>
                <View style={styles.count_container}>
                    <View style={styles.correct_count}>
                        <Icon name='check'
                            size={14}
                            color='white' />
                        <Text style={styles.count_title}>{correctCount}</Text>
                    </View>
                    <View style={styles.incorrect_count}>
                        <Icon name='close'
                            size={14}
                            color='white' />
                        <Text style={styles.count_title}>{incorrectCount}</Text>
                    </View>
                </View>
            </View>
            <FlatList
                style={styles.questions}
                data={questions}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.question}
                renderItem={({ item, index }) => (
                    <View style={styles.question_container}>
                        <View style={styles.question_field}>
                            <Text style={{ fontSize: 16 }}>{index + 1}.{item.question}</Text>
                            {
                                item.imageUrl != '' ? (
                                    <Image style={styles.image} source={{
                                        uri: item.imageUrl,
                                    }} />
                                ) : null}
                        </View>

                        {item.allOptions.map((option, optionIndex) => {
                            return (
                                <TouchableOpacity
                                    key={optionIndex}
                                    style={{
                                        paddingVertical: 14,
                                        paddingHorizontal: 20,
                                        borderTopWidth: 1,
                                        borderColor: '#bcbcbc',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        backgroundColor: getOptionBgColor(item, option),
                                    }}
                                    onPress={() => {
                                        if (item.selectedOption) {
                                            return null;
                                        }

                                        if (option == item.correct_answer) {
                                            setCorrectCount(correctCount + 1);
                                        } else {
                                            setIncorrectCount(incorrectCount + 1);
                                        }
                                        let tempQuestions = [...questions];
                                        tempQuestions[index].selectedOption = option;
                                        setQuestions([...tempQuestions]);
                                    }}
                                >
                                    <Text style={{
                                        width: 25,
                                        height: 25,
                                        padding: 2,
                                        borderWidth: 1,
                                        borderColor: '#bcbcbc',
                                        textAlign: 'center',
                                        marginRight: 16,
                                        borderRadius: 25,
                                        color: getOptionTextColor(item, option)
                                    }}>{optionIndex + 1}</Text>
                                    <Text style={{ color: getOptionTextColor(item, option) }}>{option}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                )}
                ListFooterComponent={
                    () => (
                        <Button text='Submit'
                            onPress={() => {
                                setisResultModalVisible(true)
                            }
                            } />
                    )
                }
            />

            <ResultModal
                isModalVisible={isResultModalVisible}
                correctcount={correctCount}
                incorrectcount={incorrectCount}
                totalcount={questions.length}
                handleOnClose={() => {
                    setisResultModalVisible(false);
                }}
                handleRetry={() => {
                    setCorrectCount(0);
                    setIncorrectCount(0);
                    getQuizAndQuestionDetails();
                    setisResultModalVisible(false);
                }}
                handleHome={() => {
                    navigation.goBack();
                    setisResultModalVisible(false);
                }}

            />



        </SafeAreaView>



    )
}

export default PlayQuiz;