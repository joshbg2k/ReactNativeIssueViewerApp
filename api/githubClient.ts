import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { GITHUB_TOKEN } from '@env';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});
