import { useQuery } from '@apollo/client';
import { View, StyleSheet, ScrollView } from 'react-native';
import { GET_CURRENT_USER } from '../../graphql/queries';
import AppBarTab from './AppBarTab';
import AuthenticatedBarTab from './AuthenticatedBarTab';
import theme from '../../theme';

const stylesBar = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        backgroundColor: theme.colors.backgroundPrimary,
        flexDirection: 'row',
    },
});

const stylesLink = StyleSheet.create({
    container: {
        margin: 5,
    },
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
    },
});

const AppBar = () => {
    const result = useQuery(GET_CURRENT_USER);
    
    if (result.loading) {
        return null;
    }

    const isAuthenticated = result.data.me ? true : false;
    const urls = [
        { title: "Repositories", link: "repositories" },
    ]

    return (
      <View style={stylesBar.container}>
        <ScrollView horizontal={true}>
            {urls.map((url, index) => (
                <AppBarTab key={index} title={url.title} link={url.link} styles={stylesLink} />
            ))}
            <AuthenticatedBarTab isAuth={isAuthenticated} styles={stylesLink} />
        </ScrollView>
      </View>
    );
};

export default AppBar;