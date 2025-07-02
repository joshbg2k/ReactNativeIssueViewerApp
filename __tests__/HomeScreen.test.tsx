// import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import { useGetIssuesQuery } from '../graphql/generated/graphql';

// Mock dependencies
jest.mock('../graphql/generated/graphql');

jest.mock('../components', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    ListItem: ({ item, onPress }: any) => (
      <Text testID="list-item" onPress={() => onPress(item)}>
        {item.title || 'Issue'}
      </Text>
    ),
    Loading: ({ fullScreen }: any) => (
      <Text>{fullScreen ? 'Loading full screen' : 'Loading more'}</Text>
    ),
    Error: () => <Text>Error occurred</Text>,
    LoadMoreError: () => <Text>Load More Error</Text>,
  };
});

// Mock navigation hook
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    setOptions: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
  const mockFetchMore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state when networkStatus is loading', () => {
    (useGetIssuesQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      fetchMore: mockFetchMore,
      networkStatus: 1, // NetworkStatus.loading
    });

    const { getByText } = render(
      <PaperProvider>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </PaperProvider>
    );

    expect(getByText('Loading full screen')).toBeTruthy();
  });

  it('shows error state when error is present', () => {
    (useGetIssuesQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: true,
      fetchMore: mockFetchMore,
      networkStatus: 7, // ready
    });

    const { getByText } = render(
      <PaperProvider>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </PaperProvider>
    );

    expect(getByText('Error occurred')).toBeTruthy();
  });

  it('renders list of issues', async () => {
    const issuesMock = [
      { id: '1', title: 'Issue One' },
      { id: '2', title: 'Issue Two' },
    ];

    (useGetIssuesQuery as jest.Mock).mockReturnValue({
      data: {
        repository: {
          issues: {
            edges: issuesMock.map(issue => ({ node: issue })),
            pageInfo: { endCursor: 'cursor1', hasNextPage: true },
          },
        },
      },
      loading: false,
      error: null,
      fetchMore: mockFetchMore,
      networkStatus: 7,
    });

    const { getAllByTestId } = render(
      <PaperProvider>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </PaperProvider>
    );

    const renderedItems = getAllByTestId('list-item');
    console.log('Rendered items count:', renderedItems.length);
    expect(renderedItems.length).toBe(2);
    expect(renderedItems[0].props.children).toBe('Issue One');
    expect(renderedItems[1].props.children).toBe('Issue Two');

  });

  it('calls fetchMore when onEndReached is triggered and hasNextPage is true', async () => {
    const issuesMock = [
      { id: '1', title: 'Issue One' },
      { id: '2', title: 'Issue Two' },
    ];

    (useGetIssuesQuery as jest.Mock).mockReturnValue({
      data: {
        repository: {
          issues: {
            edges: issuesMock.map(issue => ({ node: issue })),
            pageInfo: { endCursor: 'cursor1', hasNextPage: true },
          },
        },
      },
      loading: false,
      error: null,
      fetchMore: mockFetchMore,
      networkStatus: 7,
    });

    const { getByTestId } = render(
      <PaperProvider>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </PaperProvider>
    );

    // FlatList doesn't expose onEndReached directly, so we simulate scrolling by calling it manually

    // Find the FlatList and manually invoke onEndReached prop
    const flatList = getByTestId('flat-list');

    // Because you didn't set testID on FlatList, let's add it in HomeScreen for testing:
    // <FlatList testID="flat-list" ... />

    // So to fix this test, add testID="flat-list" to your FlatList in HomeScreen.tsx

    // After that, we can do:
    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { y: 500 },
        contentSize: { height: 1000 },
        layoutMeasurement: { height: 500 },
      },
    });

    await waitFor(() => {
      expect(mockFetchMore).toHaveBeenCalled();
    });
  });
});
