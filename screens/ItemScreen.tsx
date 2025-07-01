import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { MainStackParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetIssueWithCommentsQuery } from '../graphql/generated/graphql';
import { Issue } from '../graphql/generated/graphql';
import { ItemScreenHeader, Loading, Error } from '../components';
import { Button } from '@rneui/themed';
import Icon from '@react-native-vector-icons/fontawesome5';
type RouteProps = RouteProp<MainStackParamList, 'Item'>;

type Props = {
  route: RouteProps;
};

const ItemScreen = ({ route }: Props) => {
  const issue = route.params as any as Issue;
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [issueBody, setIssueBody] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const { data, loading, error } = useGetIssueWithCommentsQuery({
    variables: { number: issue.number ?? 0 },
  });

  useEffect(() => {
    if (data) {
      console.log('GitHub Issue CALL:', data);
      const uidata = data.repository?.issue ? [data.repository.issue] : [];
      const commentsMapped =
        uidata[0]?.comments?.nodes?.map((comment: any) => comment) || [];
      setIssueBody(uidata[0]?.body || '');
      setComments(commentsMapped);
    }
  }, [data]);

  useEffect(() => {
    navigation.setOptions({
      title: `${issue.title}`,
    });
  }, []);

  if (loading) return <Loading fullScreen={true} />;
  if (error) return <Error />;

  const renderHeader = () => {
    return (
      <ItemScreenHeader
        title={issue.title}
        number={issue.number}
        body={issueBody}
        date={issue.createdAt}
        state={issue.state}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <FlatList
        style={{ flex: 1, padding: 10 }}
        ListHeaderComponent={renderHeader}
        data={comments}
        keyExtractor={item => item.id}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.author.login} · {item.createdAt}
            </Text>
            <Text>#{item.body}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', fontSize: 18 }}>
            *** No comments yet ***
          </Text>
        }
        ListFooterComponent={
          !loading && comments.length > 0 ? (
            <View style={{ marginTop: 10 }}>
              <Button>
                View all comments on github.com{' '}
                <Icon
                  style={{ marginLeft: 8 }}
                  name="external-link-alt"
                  size={20}
                  color="white"
                />
              </Button>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default ItemScreen;
