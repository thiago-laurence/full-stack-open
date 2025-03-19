import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { useRouter } from 'expo-router'
import { Formik } from 'formik';
import * as yup from 'yup';
import { CREATE_REVIEW } from '../../src/graphql/mutations';
import HomePage from '../index';
import ReviewForm from '../../src/components/review/ReviewForm';
import theme from '../../src/theme';

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
}

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .min(1, 'Name is too short')
        .max(30, 'Name is too long')
        .required('Owner name is required'),
    repositoryName: yup
        .string()
        .min(5, 'Repo name is too short')
        .max(50, 'Repo name is too long')
        .required('Repository name is required'),
    rating: yup
        .number()
        .typeError('Rating must be a number')
        .min(0, 'Rating must be between 0 and 100')
        .max(100, 'Rating must be between 0 and 100')
        .required('Rating is required'),
    text: yup
        .string()
        .max(100, 'Review is too long')
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

const CreateReview = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const submit = async (values) => {
        try {
            const { data } = await mutate({ variables: { ...values, rating: parseInt(values.rating) } });
            router.push({
                pathname: 'repositories/[id]',
                params: { id: data.createReview.repositoryId }
            })
        } catch (e) {
            setErrorMessage(e.message);
            setTimeout(() => setErrorMessage(null), 5000);
        }
    }

    return (
        <View>
            { errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text> }
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
                {  ({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} /> }
            </Formik>
        </View>
    );
}

const Page = () => {
    return (
        <HomePage>
            <CreateReview />
        </ HomePage>
    );
};

export default Page;