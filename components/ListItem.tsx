import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ISSUES } from '../graphql/queries/getIssues.ts';
import { githubClient } from '../api/githubClient';
import { StyleSheet } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
  NavigationContainer,
  NavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import {
  Text,
  View,
  FlatList,
  Pressable,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome5';
// import { Chip } from '@rneui/themed';
import { Issue } from '../graphql/generated/graphql';

type Props = {
  item: Partial<Issue>;
  onPress: (item: any) => void;
};

const ListItem = (props: Props) => {
  const { item, onPress } = props;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 14, color: 'gray' }}>
              #{item.number} · {item.createdAt}
            </Text>
          </View>
          {/* <View style={{ alignItems: 'flex-end' }}>
            {item.state === 'OPEN' && (
              <Chip type="outline" size="sm">
                {item.state}
              </Chip>
            )}
            {item.state === 'CLOSED' && (
              <Chip size="sm">
                {item.state}
                <Icon name="check" size={18} color="white" solid />
              </Chip>
            )}
          </View> */}
        </View>
        <View
          style={{
            marginTop: 10,
            borderBottomColor: '#aaa',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        ></View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;
