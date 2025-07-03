import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking, StyleSheet, Image } from 'react-native';
import {
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { MainStackParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetIssueWithCommentsQuery } from '../graphql/generated/graphql';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';
import { Issue } from '../graphql/generated/graphql';
import { ItemScreenHeader, Loading, ErrorView } from '../components';
import { useTheme } from 'react-native-paper';
import { Button } from 'react-native-paper';

type RouteProps = RouteProp<MainStackParamList, 'Item'>;

type Props = {
  route: RouteProps;
};

const ItemScreen = ({ route }: Props) => {
  const theme = useTheme();
  const issue = route.params as any as Issue;
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [issueBody, setIssueBody] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const { data, loading, error } = useGetIssueWithCommentsQuery({
    variables: { number: issue.number ?? 0 },
  });

  // i know this is duplicated, styling the markdown content is jsut a lats minute thing to make the app look pretty!
  const pageStyles = StyleSheet.create({
    heading3: {
      fontSize: 22,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginTop: 14,
    },
    body: {
      fontSize: 18,
      color: theme.colors.onSurface,
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'contain',
    },
    body_bold: {
      fontSize: 18,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
  });
  useEffect(() => {
    if (data) {
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
      headerTintColor: theme.colors.onSurface,
      headerTitleStyle: {
        color: theme.colors.onSurface,
        fontWeight: 'bold',
      },
    });
  }, []);

  if (loading) return <Loading fullScreen={true} />;
  if (error) return <ErrorView />;

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
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
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
          <View testID="comment" style={{ marginTop: 10, rowGap: 2 }}>
            <Text style={pageStyles.body_bold}>
              {item.author.login} · {item.createdAt}
            </Text>
            <Markdown
              style={pageStyles}
              rules={{
                image: (node, children, parent, styles) => {
                  const imageUrl = node.attributes.src;
                  const altText = node.attributes.alt || '';

                  return (
                    <View key={imageUrl} style={{ flex: 1 }}>
                      <Image
                        source={{ uri: imageUrl }}
                        style={pageStyles.image}
                        accessible
                        accessibilityLabel={altText}
                      />
                    </View>
                  );
                },
              }}
            >
              {item.body}
            </Markdown>
          </View>
        )}
        ListEmptyComponent={
          <Text
            style={{
              color: theme.colors.secondary,
              fontStyle: 'italic',
              textAlign: 'center',
              fontSize: 18,
            }}
          >
            No comments yet
          </Text>
        }
        ListFooterComponent={
          !loading && (
            <View style={{ marginTop: 10 }}>
              <Button
                contentStyle={{ flexDirection: 'row-reverse' }}
                icon="open-in-new"
                mode="contained"
                onPress={() => {
                  Linking.openURL(issue.url);
                }}
              >
                View issue on github.com
              </Button>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default ItemScreen;
