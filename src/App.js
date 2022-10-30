import React from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import Login from './pages/auth/Login/Login';
import Sign from './pages/auth/Sign/Sign';
import Home from './pages/Home/Home';
import CreateQuiz from './pages/CreateQuiz/CreateQuiz';
import AddQuestion from './pages/AddQuestion/AddQuestion';
import PlayQuiz from './pages/PlayQuiz/PlayQuiz';

import FlashMessage from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createNativeStackNavigator();


const App = () => {

  const [userSession, setUserSession] = React.useState();

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    })
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoginScreen' component={Login} />
        <Stack.Screen name='SignScreen' component={Sign} />

      </Stack.Navigator>
    )
  }

  const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='HomeScreen' component={Home}
         options={{
          title: 'Trivia',
          headerTintColor: '#1D1CE5',
          headerRight: () => (
            <Icon
            name='logout'
            size={30}
            color='#1D1CE5'
            onPress={() => auth().signOut()}/>
          )

        }}/>
        <Stack.Screen name='CreateQuizScreen' component={CreateQuiz}
         options={{
          title: 'Create Quiz'}}
        />
        <Stack.Screen name='AddQuestionScreen' component={AddQuestion}  options={{
          title: 'Add Question'}}/>

          <Stack.Screen name='PlayQuizScreen' component={PlayQuiz}
          options={{
            title:''
          }}/>
      </Stack.Navigator>
    )

  }

  return (
    <NavigationContainer screenOptions={{ headerShown: false }}>

      {!userSession ? (
        <AuthStack options={{
          title: 'Trivia',
          headerTintColor: '#1D1CE5'

        }} />
      ) : (
        <AppStack/>
        // <Stack.Navigator>
        //   <Stack.Screen name="HomePage" component={Home}
        //     options={{
        //       title: 'Trivia',
        //       headerTintColor: '#1D1CE5',
        //       headerRight: () => (
        //         <Icon
        //         name='logout'
        //         size={30}
        //         color='#1D1CE5'
        //         onPress={() => auth().signOut()}/>
        //       )

        //     }}
        //   />
        // </Stack.Navigator>
       

      )}
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

export default App;