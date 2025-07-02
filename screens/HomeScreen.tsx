import React, { useEffect, useState  } from 'react';
import {
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NetworkStatus } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/material-design-icons';
import { useTheme } from 'react-native-paper';
import { RootStackParamList } from '../navigation/types';
import { useGetIssuesQuery } from '../graphql/generated/graphql';
import { ListItem, Loading, Error, LoadMoreError } from '../components';
import { Issue } from '../graphql/generated/graphql';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const [issues, setIssues] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<{
    endCursor: string;
    hasNextPage: boolean;
  }>({ endCursor: '', hasNextPage: true });
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);
  const MemoizedListItem = React.memo(ListItem);
  const { data, loading, error, fetchMore, networkStatus } = useGetIssuesQuery({
    variables: {
      first: 20 as number,
      after: null,
    },
  });

  useEffect(() => {
    if (data?.repository?.issues.edges) {
      const newIssues = data.repository.issues.edges
        ?.map(edge => edge?.node)
        .filter(Boolean) as Issue[];
      setIssues(newIssues);
      console.log('GitHub Issues:', newIssues);
      setPageInfo({
        endCursor: data.repository.issues.pageInfo.endCursor ?? '',
        hasNextPage: data.repository.issues.pageInfo.hasNextPage,
      });

      navigation.setOptions({
        headerTintColor: theme.colors.onSurface,
        headerTitleStyle: {
          color: theme.colors.onSurface,
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Modal')}
            accessibilityLabel="Go to search page"
          >
            <Icon style={{color: "black" }} name="magnify" size={36} />
          </TouchableOpacity>
        )
      });
    }
  }, [data]);

  const handleLoadMore = async () => {
    if (!pageInfo.hasNextPage || loadMoreError || loadingMore || networkStatus === NetworkStatus.loading || loading || !pageInfo.endCursor) return;
    setLoadingMore(true);
    setLoadMoreError(false);

    try {
      const result = await fetchMore({
        variables: {
          after: pageInfo.endCursor,
          first: 20,
        },
      });

      const newEdges = result.data?.repository?.issues?.edges ?? [];
      const newItems = newEdges.map((edge: any) => edge.node);
      setIssues(prev => [...prev, ...newItems]);
      console.log('Loaded more issues:', newItems);
      const newPageInfo = result.data?.repository?.issues?.pageInfo as {
        endCursor: string;
        hasNextPage: boolean;
      };
      setPageInfo(newPageInfo);
      setLoadingMore(false);
    } catch (err) {
      setLoadMoreError(true);
      console.error('Error loading more issues:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (networkStatus === NetworkStatus.loading) {
    return <Loading fullScreen={true} />;
  }

  if (error) return <Error />;

  const handlePress = (item: Issue) => {
    navigation.navigate('MainNavStack', { screen: 'Item', params: item });
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      data={issues}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <MemoizedListItem item={item} onPress={handlePress} />
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        <>
          {loadMoreError && <LoadMoreError />}
          {loadingMore && (<Loading infiniteScrolliing={true} />
)}
        </>
      }
    />
  );
};

export default HomeScreen;
