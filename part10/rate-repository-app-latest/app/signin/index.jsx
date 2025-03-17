import { View } from 'react-native';
import HomePage from '../index'
import SignIn from './SignIn';

const SignInPage = () => {

    return (
        <HomePage>
            <View>
                <SignIn />
            </View>
        </ HomePage>
    );
};

export default SignInPage;