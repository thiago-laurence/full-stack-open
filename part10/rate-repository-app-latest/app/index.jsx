import { View, StyleSheet } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../src/utils/apolloClient';
import AuthStorage from '../src/utils/authStorage';
import AuthStorageContext from '../src/contexts/AuthStorageContext';
import AppBar from '../src/components/AppBar/AppBar';
import theme from '../src/theme';

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.colors.backgroundSecondary
  }
});

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function HomePage({ children }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <View style={styles.main}>
          <AppBar />
          { children }
        </View>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
