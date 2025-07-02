import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { GITHUB_TOKEN } from '@env';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repository: {
            keyArgs: ['owner', 'name'],
          },
        },
      },
      Repository: {
        fields: {
          issues: {
            keyArgs: false,
            merge(existing = {}, incoming) {
              const existingEdges = existing.edges || [];
              const incomingEdges = incoming.edges || [];

              return {
                ...incoming,
                edges: [...existingEdges, ...incomingEdges],
              };
            },
          },
        },
      },
    },
  }),
});
