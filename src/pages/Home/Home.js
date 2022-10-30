import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Button from '../../components/Button/Button';
import { getQuizzes } from '../../utils/database';
import styles from './HomeStyle';
import FloatingButton from '../../components/FloatingButton/FloatingButton';

const Home = ({ navigation }) => {

    const [allQuizzes, setAllQuizzes] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const goToCreateQuizScreen = () => {
        navigation.navigate('CreateQuizScreen');
    }

    const getAllQuizzes = async () => {
        setRefreshing(true);
        //tüm quizleri al
        const quizzes = await getQuizzes();

        //quizler için array
        let tempQuizzes = [];
        await quizzes.docs.forEach(async quiz => {
            await tempQuizzes.push({ id: quiz.id, ...quiz.data() });
        })
        await setAllQuizzes([...tempQuizzes]);

        setRefreshing(false);


    }

    useEffect(() => {
        getAllQuizzes();
    }, [])
    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={allQuizzes}
                onRefresh={getAllQuizzes}
                refreshing={refreshing}
                showsVerticalScrollIndicator={false}
                style={styles.flatlist}
                renderItem={({ item: quiz }) => (
                    <View style={styles.inner_container}>
                        <View style={styles.quiz}>
                            <Text style={styles.title}>{quiz.title}</Text>
                            {
                                quiz.description != '' ?
                                    <Text style={styles.description}>{quiz.description}</Text> : null}
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('PlayQuizScreen', {
                                    quizId: quiz.id
                                })
                            }} style={styles.play_button}>
                            <Text style={styles.play_text}>Play</Text>

                        </TouchableOpacity>

                    </View>
                )} />

            <FloatingButton
                text='Create Quiz'
                onPress={goToCreateQuizScreen}
            />
        </SafeAreaView>
    )
}

export default Home;