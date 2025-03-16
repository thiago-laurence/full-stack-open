import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import SignInForm from '../../src/components/SignInForm';

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

const SignIn = () => {
    const submit = (values) => {
        console.log(values);
    }

    return (
        <View>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
                {  ({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} /> }
            </Formik>
        </View>
    );
};

export default SignIn;