import { gql } from '@apollo/client';

export const GET_ISSUE_COMMENTS = gql`
  query GetIssueWithComments($number: Int!) {
    repository(owner: "facebook", name: "react-native") {
      issue(number: $number) {
        id
        body
        number
        comments(first: 20) {
          nodes {
            id
            body
            author {
              login
              avatarUrl
              url
            }
            createdAt
          }
          totalCount
        }
      }
    }
  }
`;
