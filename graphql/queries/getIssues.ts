import { gql } from '@apollo/client';

export const GET_ISSUES = gql`
  query GetIssues($first: Int, $after: String) {
    repository(owner: "facebook", name: "react-native") {
      id
      issues(
        first: $first
        after: $after
        states: OPEN
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        edges {
          node {
            id
            number
            title
            url
            state
            createdAt
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
