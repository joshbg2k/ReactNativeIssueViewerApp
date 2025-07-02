import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import {
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { NetworkStatus } from '@apollo/client';
import { RootStackParamList } from '../navigation/types';
import { useSearchIssuesQuery } from '../graphql/generated/graphql';
import {
  ListItem,
  Loading,
  ErrorView,
  LoadMoreError,
  NoSearchResults,
} from '../components';
import { MainStackParamList } from '../navigation/types';
import { Issue } from '../graphql/generated/graphql';
import { useTheme } from 'react-native-paper';

type RouteProps = RouteProp<MainStackParamList, 'SearchResults'>;

type Props = {
  route: RouteProps;
};

const SearchResultsScreen = ({ route }: Props) => {
  const { query, searchTerm } = route.params;
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [issues, setIssues] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<{
    endCursor: string;
    hasNextPage: boolean;
  }>({ endCursor: '', hasNextPage: true });
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);
  const [prevQuery, setPrevQuery] = useState('');
  const MemoizedListItem = React.memo(ListItem);

  const { data, loading, error, fetchMore, networkStatus } =
    useSearchIssuesQuery({
      variables: { query, after: null },
      skip: !query,
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    if (data?.search?.edges) {
      const newItems = data.search.edges
        .map(edge => edge?.node)
        .filter(Boolean)
        .map(edge => {
          if (edge && '__typename' in edge) {
            const { __typename, ...rest } = edge;
            return rest;
          }
          return edge;
        });
      if (query !== prevQuery) {
        setIssues(newItems);
        setPrevQuery(query);
      } else {
        const existingIds = new Set(issues.map(item => item.id));
        const filtered = newItems.filter(
          item => item && 'id' in item && !existingIds.has(item.id),
        );
        setIssues(prev => [...prev, ...filtered]);
      }

      setPageInfo({
        endCursor: data.search.pageInfo.endCursor || '',
        hasNextPage: data.search.pageInfo.hasNextPage,
      });
    }
  }, [data, query]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Search Results for "' + searchTerm + '"',
      headerTintColor: theme.colors.onSurface,
      headerTitleStyle: {
        color: theme.colors.onSurface,
        fontWeight: 'bold',
      },
    });
  }, []);

  const loadMore = async () => {
    if (
      !pageInfo.hasNextPage ||
      loadMoreError ||
      loadingMore ||
      networkStatus === NetworkStatus.loading ||
      loading ||
      !pageInfo.endCursor
    )
      return;
    setLoadMoreError(false);
    setLoadingMore(true);

    try {
      const result = await fetchMore({
        variables: { query, after: pageInfo.endCursor, first: 50 },
      });
      if (result.data?.search?.edges) {
        const newItems = result.data.search.edges
          .map(edge => edge?.node)
          .filter(Boolean)
          .map(edge => {
            if (edge && '__typename' in edge) {
              const { __typename, ...rest } = edge;
              return rest;
            }
            return edge;
          });

        setIssues(prev => {
          return [...prev, ...newItems];
        });
        const newPageInfo = result.data?.search?.pageInfo as {
          endCursor: string;
          hasNextPage: boolean;
        };
        setPageInfo(newPageInfo);
      }
      setLoadingMore(false);
    } catch (err) {
      setLoadMoreError(true);
      console.error('Error loading more:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (networkStatus === NetworkStatus.loading) {
    return <Loading fullScreen />;
  }

  const handlePress = (item: Issue) => {
    navigation.navigate('MainNavStack', { screen: 'Item', params: item });
  };

  if (error) return <ErrorView />;

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      data={issues}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <MemoizedListItem item={item} onPress={handlePress} />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.8}
      ListEmptyComponent={<NoSearchResults searchTerm={searchTerm} />}
      ListFooterComponent={
        <>
          {loadMoreError && <LoadMoreError />}
          {loadingMore && <Loading infiniteScrolling />}
        </>
      }
    />
  );
};

export default SearchResultsScreen;
