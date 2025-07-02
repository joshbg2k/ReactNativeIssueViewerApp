import React from 'react';
import { render, waitFor, screen, act } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from '../../screens/HomeScreen';
// import { GetIssuesDocument } from '../../graphql/generated/graphql';
import { GET_ISSUES } from '../../graphql/queries/getIssues';

const mockNavigation = {
  navigate: jest.fn(),
  setOptions: jest.fn(),
};

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => mockNavigation,
  };
});

const apolloMock = [
  {
    request: {
      query: GET_ISSUES,
      variables: { first: 20 as number, after: null },
    },
    result: {
      data: {
        repository: {
          id: 'repo1',
          issues: {
            edges: [
              {
                node: {
                  id: 'issue1',
                  number: 1,
                  title: 'Test Issue',
                  url: 'http://example.com',
                  state: 'OPEN',
                  createdAt: '2025-07-02T00:00:00Z',
                },
              },
            ],
            pageInfo: {
              endCursor: 'cursor1',
              hasNextPage: false,
            },
          },
        },
      },
    },
  },
];

const loadingMocks = [
  {
    request: {
      query: GET_ISSUES,
      variables: { first: 20, after: null },
    },
    result: () => new Promise(() => {}),
  },
];

const errorMocks = [
  {
    request: {
      query: GET_ISSUES,
      variables: { first: 20, after: null },
    },
    error: new Error('Mock error'),
  },
];

const successMocks = [
  {
    request: {
      query: GET_ISSUES,
      variables: { first: 20, after: null },
    },
    result: {
      data: {
        repository: {
          id: 'repo123',
          issues: {
            edges: [
              {
                node: {
                  id: '1',
                  number: 123,
                  title: 'Test Issue',
                  url: 'https://github.com/facebook/react-native/issues/123',
                  state: 'OPEN',
                  createdAt: '2024-01-01T00:00:00Z',
                },
              },
            ],
            pageInfo: {
              endCursor: 'cursor123',
              hasNextPage: true,
            },
          },
        },
      },
    },
  },
];

describe('HomeScreen', () => {
  it('shows loading indicator while fetching data', async () => {
    const { findByTestId } = render(
      <MockedProvider mocks={loadingMocks} addTypename={false}>
        <SafeAreaProvider>
          <PaperProvider>
            <HomeScreen />
          </PaperProvider>
        </SafeAreaProvider>
      </MockedProvider>,
    );

    const loader = await findByTestId('full-screen-loader');
    expect(loader).toBeTruthy();
  });

  it('renders list of issues', () => {
    const { findByText } = render(
      <MockedProvider mocks={successMocks} addTypename={false}>
        <SafeAreaProvider>
          <PaperProvider>
            <HomeScreen />
          </PaperProvider>
        </SafeAreaProvider>
      </MockedProvider>,
    );

    const item = findByText(/Test Issue/i);
    expect(item).toBeTruthy();
  });
});
