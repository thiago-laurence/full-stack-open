import { View } from 'react-native';
import { Formik } from 'formik';
import SignInForm from '../../src/components/SignInForm';

const initialValues = {
    username: "",
    password: ""
}

const SignIn = () => {
    const submit = (values) => {
        console.log(values);
    }

    return (
        <View>
            <Formik initialValues={initialValues} onSubmit={submit}>
                {  ({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} /> }
            </Formik>
        </View>
    );
};

export default SignIn;