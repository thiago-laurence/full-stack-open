import { useContext, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'expo-router';
import AuthStorageContext from '../../src/contexts/AuthStorageContext';
import HomePage from '../index'

const SignOut = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    const router = useRouter();

    useEffect(() => {
        const signOut = async () => {
            await authStorage.removeAccessToken();
            await apolloClient.resetStore();
            router.push("/");
        };

        signOut();
    }, []);

    return null;
};

const SignOutPage = () => {
    return (
        <HomePage>
            <SignOut />
        </ HomePage>
    );
};

export default SignOutPage;