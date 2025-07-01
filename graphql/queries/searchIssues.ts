import { gql } from '@apollo/client';

export const GET_ISSUES = gql`
  query SearchIssues($query: String!, $after: String) {
    search(query: $query, type: ISSUE, first: 20, after: $after) {
      issueCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Issue {
            id
            number
            title
            url
            state
            createdAt
          }
        }
      }
    }
  }
`;
