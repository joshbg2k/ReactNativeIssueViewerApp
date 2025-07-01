import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NetworkStatus } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/fontawesome5';
import { RootStackParamList } from '../navigation/types';
import { useGetIssuesQuery } from '../graphql/generated/graphql';
import { ListItem, Loading, Error, LoadMoreError } from '../components';
import { Issue } from '../graphql/generated/graphql';

const HomeScreen = () => {
  const searchIcon = (
    <Icon name="search" size={25} color="black" iconStyle="solid" />
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
      first: 20 as number, // or however many you want per page
      after: null,
    },
  });

  interface HeaderRightProps {
    issues: Issue[];
  }

  const handleHeaderRight = useCallback(
    ({ issues }: HeaderRightProps) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Modal', issues)}
        accessibilityLabel="Go to search page"
      >
        {searchIcon}
      </TouchableOpacity>
    ),
    [navigation, issues, searchIcon],
  );

  useEffect(() => {
    if (data?.repository?.issues) {
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
        headerRight: () => handleHeaderRight({ issues: newIssues }),
      });
    }
  }, [data]);

  const handleLoadMore = async () => {
    if (!pageInfo.hasNextPage || loadingMore) return;
    setLoadMoreError(false);
    setLoadingMore(true);

    try {
      const result = await fetchMore({
        variables: {
          after: pageInfo.endCursor,
          first: 50,
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
    } catch (err) {
      setLoadingMore(true);
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
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <FlatList
        data={issues}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MemoizedListItem item={item} onPress={handlePress} />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <>
            {loadMoreError && !loadingMore && <LoadMoreError />}
            {loadingMore && !loadMoreError && (
              <Loading infiniteScrolliing={true} />
            )}
          </>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
