import { useQuery } from '@apollo/client';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ME } from '../../graphql/queries';
import AppBarTab from './AppBarTab';
import AuthenticatedBarTab from './AuthenticatedBarTab';
import theme from '../../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        backgroundColor: theme.colors.backgroundPrimary,
        flexDirection: 'row',
    },
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
        marginRight: 15,
    },
});

const AppBar = () => {
    const result = useQuery(ME);
    
    if (result.loading) {
        return null;
    }

    const isAuthenticated = result.data.me ? true : false;

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
            <AppBarTab title="Repositories" link="repositories" styles={styles.text} />
            <AuthenticatedBarTab isAuth={isAuthenticated} styles={styles.text} />
        </ScrollView>
      </View>
    );
};

export default AppBar;