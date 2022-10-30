import React, { useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import * as yup from "yup";
import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import styles from './LoginStyle';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { showMessage } from 'react-native-flash-message';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .label("Email")
        .required(),
    password: yup
        .string()
        .label("Password")
        .required()
        .min(5, "Seems a bit short..."),


})

const Login = ({ navigation }) => {
    const [loading,setLoading]=useState(false);

    function goToSignPage() {
        navigation.navigate('SignScreen');
    }

    async function handleformSubmit(formValues) {

        try{
            setLoading(true);
            await auth().signInWithEmailAndPassword(
                formValues.email,
                formValues.password
            )
            setLoading(false);
        }
        catch(error){
            console.log(error);
            showMessage({
                message:authErrorMessageParser(error.code),
                type:"danger"
            })
            setLoading(false);

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={handleformSubmit}
                validationSchema={validationSchema}>
                {({ values, handleChange, handleSubmit, errors }) => (

                    <>
                        <View style={{alignItems:'center',padding:10}}>
                            <Text style={{color:'#1D1CE5',fontSize:25,fontWeight:'bold'}}>Login</Text>
                        </View>
                        <Input
                            value={values.email}
                            onType={handleChange('email')}
                            placeholder="enter your e-mail" />

                        {errors.email &&
                            <Text style={{ paddingLeft: 10, color: 'red' }}>{errors.email}</Text>
                        }
                        <Input
                            value={values.password}
                            onType={handleChange('password')}
                            placeholder="enter your password"
                            isSecure={true} />

                        {errors.password &&
                            <Text style={{ paddingLeft: 10, color: 'red' }}>{errors.password}</Text>
                        }
                        <Button
                            text='Login' loading={loading} onPress={handleSubmit}
                        />
                    </>

                )

                }
            </Formik>

            {/* <Button text='Sign Up' onPress={goToSignPage} /> */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14 }}>Don't have an account?</Text>
                <Text style={{ marginLeft: 4, color: '#1D1CE5', fontSize: 14 }}
                    onPress={goToSignPage}>
                    Create account

                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Login;