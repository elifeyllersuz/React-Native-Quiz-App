import React, { useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from "yup";
import { showMessage } from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import styles from './SignStyle';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .label("Email")
        .required(),
    password: yup
        .string()
        .required()
        .min(5, "Seems a bit short..."),
    repassword: yup
        .string()
        .required()
        .label('Confirm Password')
        .test("passwords-match", "Passwords must match", function (value) {
            return this.parent.password === value;
        })


})

const Sign = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    function goToLoginPage() {
        navigation.goBack();
    }

    async function handleformSubmit(formValues) {

        try {
            auth().createUserWithEmailAndPassword(
                formValues.email,
                formValues.password
            );
            showMessage({
                message: 'User created',
                type: 'success'
            })
            navigation.navigate('LoginScreen');
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={{ email: "", password: "", repassword: "" }}
                onSubmit={handleformSubmit}
                validationSchema={validationSchema}>
                {({ values, handleChange, handleSubmit, errors }) => (
                    <>
                        <View style={{ alignItems: 'center', padding: 10 }}>
                            <Text style={{ color: '#1D1CE5', fontSize: 25, fontWeight: 'bold' }}>Sign Up</Text>
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
                        <Input
                            value={values.repassword}
                            onType={handleChange('repassword')}
                            placeholder="confirm password"
                            isSecure={true} />

                        {errors.repassword &&
                            <Text style={{ paddingLeft: 10, color: 'red' }}>{errors.repassword}</Text>
                        }
                        <Button
                            text='Save' loading={loading} onPress={handleSubmit}
                        />
                    </>
                )

                }
            </Formik>

            {/* <Button text='Go Back' onPress={goToLoginPage} /> */}

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14 }}>Already have an account?</Text>
                <Text style={{ marginLeft: 4, color: '#1D1CE5', fontSize: 14 }}
                    onPress={goToLoginPage}>
                    Log In

                </Text>
            </View>

        </SafeAreaView>
    )
}

export default Sign;