import { View, StyleSheet } from 'react-native';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { BASE_URL } from '../src/utils/constants';
import AppBar from '../src/components/AppBar/AppBar';
import theme from '../src/theme';

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.colors.backgroundSecondary
  }
});

const apolloClient = new ApolloClient({
  uri: `${BASE_URL}`,
  cache: new InMemoryCache()
});

export default function HomePage({ children }) {
  return (
    <ApolloProvider client={apolloClient}>
      <View style={styles.main}>
        <AppBar />
        { children }
      </View>
    </ApolloProvider>
  );
}
