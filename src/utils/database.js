import firestore from '@react-native-firebase/firestore';

export const createQuiz = (currentQuizId,title,description) => {
    return firestore().collection('Quizzes').doc(currentQuizId).set({
        title,
        description
    })
}

export const createQuestion = (currentQuizId,currentQuestionId,question) => {
//collection => koleksiyona ulaşmayı sağlar,
//doc => içine yazdığımız şeye ulaşmak
    return firestore()
    .collection('Quizzes')
    .doc(currentQuizId)
    .collection('QNA')
    .doc(currentQuestionId)
    .set(question)
}

//get all quizzes

export const getQuizzes = () => {
    return firestore().collection('Quizzes').get();
}

//get quiz details by id

export const getQuizById = (currentQuizId) => {

    return firestore().collection('Quizzes').doc(currentQuizId).get();
}

//get questions by current quiz id

export const getQuestionsByQuizId = currentQuizId => {
    return firestore()
    .collection('Quizzes')
    .doc(currentQuizId)
    .collection('QNA')
    .get();
}