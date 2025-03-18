import { InMemoryCache, ApolloClient, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const createApolloClient = (authStorage) => {
    const httpLink = new HttpLink({
        uri: process.env.APOLLO_URI,
    });

    const authLink = setContext(async (_, { headers }) => {
        try {
          const accessToken = await authStorage.getAccessToken();
          
          return {
            headers: {
              ...headers,
              authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
          };
        } catch (e) {
          console.error("Error retrieving token:", e);
          return { headers };
        }
      });
    
    return new ApolloClient({
        link: from([authLink, httpLink]),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;