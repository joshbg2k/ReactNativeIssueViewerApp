import React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import {
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Issue } from '../graphql/generated/graphql';

type Props = {
  item: Partial<Issue>;
  onPress: (item: any) => void;
};

const ListItem = (props: Props) => {
  const { item, onPress } = props;
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{ backgroundColor: theme.colors.onPrimary, marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <Text style={{ color: theme.colors.primary, fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 14, color: theme.colors.onSurface, fontWeight: "bold" }}>
              #{item.number} · {item.createdAt}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {item.state === 'OPEN' && (
              <Chip mode="flat">
                <Text style={{color: theme.colors.onSurface, fontWeight:"800"}}>{item.state}</Text>
              </Chip>
            )}
            {item.state === 'CLOSED' && (
              <Chip mode="flat">
                <Text style={{color: theme.colors.onSurface, fontWeight:"800"}}>{item.state}</Text>
              </Chip>
            )}
          </View>
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
