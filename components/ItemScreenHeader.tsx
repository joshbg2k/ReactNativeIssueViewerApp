import React from 'react';
import { Text, View } from 'react-native';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';
import { Chip } from 'react-native-paper';
import Icon from '@react-native-vector-icons/fontawesome5';

type Props = {
  title: string;
  number: number;
  body: string;
  date: string;
  state: string;
};

const ItemScreenHeader = ({ title, number, body, date, state }: Props) => {
  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 18, color: 'gray' }}>
            #{number} · {date}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          {state === 'OPEN' && (
            <Chip mode="flat">
              {state}
            </Chip>
          )}
          {state === 'CLOSED' && (
            <Chip mode="flat">
              {state} <Icon name="check" size={18} color="white" iconStyle="solid" />
            </Chip>
          )}
        </View>
      </View>

      <Markdown
        markdownit={MarkdownIt({ typographer: true }).disable(['image'])}
      >
        {body}
      </Markdown>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Comments</Text>
    </View>
  );
};

export default ItemScreenHeader;
