import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../../src/hooks/useSignIn';
import { CREATE_USER } from '../../src/graphql/mutations';
import HomePage from '../index';
import SignUpForm from '../../src/components/auth/SignUpForm';
import theme from '../../src/theme';

const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: ""
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username is too short')
        .max(30, 'Username is too long')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password is too short')
        .max(50, 'Password is too long')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Password confirmation is required')
});

const styles = StyleSheet.create({
    errorMessage: {
        color: theme.colors.danger,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.heading,
        textAlign: 'center',
        padding: 10,
        backgroundColor: `${theme.colors.danger}30`
    }
});

const SignUp = () => {
    const [signIn] = useSignIn();
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();
    const [mutate, result] = useMutation(CREATE_USER);

    const submit = async (values) => {
        try {
            const { data } = await mutate({ variables: { ...values } });
            await signIn({ username: values.username, password: values.password });
            router.push('repositories');
        } catch (e) {
            setErrorMessage(e.message);
            setTimeout(() => setErrorMessage(null), 5000);
        }
    }

    return (
        <View>
            { errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text> }
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
                {  ({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} /> }
            </Formik>
        </View>
    );
}

const Page = () => {
    return (
        <HomePage>
            <SignUp />
        </ HomePage>
    );
};

export default Page;