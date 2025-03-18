import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../../src/hooks/useSignIn';
import SignInForm from '../../src/components/SignInForm';
import theme from '../../src/theme';

const initialValues = {
    username: "",
    password: ""
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

const SignIn = () => {
    const [signIn] = useSignIn();
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();

    const submit = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await signIn({ username, password });
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
                {  ({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} /> }
            </Formik>
        </View>
    );
}

export default SignIn;