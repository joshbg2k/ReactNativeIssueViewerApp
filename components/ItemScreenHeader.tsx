import React from 'react';
import { Text, View } from 'react-native';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';
import { Chip } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

type Props = {
  title: string;
  number: number;
  body: string;
  date: string;
  state: string;
};

const ItemScreenHeader = ({ title, number, body, date, state }: Props) => {
  const theme = useTheme();
  return (
    <View>
      <Text style={{ color: theme.colors.primary, fontSize: 22, fontWeight: 'bold' }}>{title}</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 16, color: theme.colors.secondary, fontWeight: 'bold'  }}>
            #{number} · {date}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          {state === 'OPEN' && (
            <Chip mode="flat">
              <Text style={{color: theme.colors.onSurface, fontWeight:"800"}}>{state}</Text>
            </Chip>
          )}
          {state === 'CLOSED' && (
            <Chip mode="flat">
               <Text style={{color: theme.colors.onSurface, fontWeight:"800"}}>{state}</Text>
            </Chip>
          )}
        </View>
      </View>

      <Markdown
        markdownit={MarkdownIt({ typographer: true }).disable(['image'])}
      >
        {body}
      </Markdown>
      <Text style={{fontSize: 20, color: theme.colors.primary, fontWeight:"bold"}}>Comments</Text>
    </View>
  );
};

export default ItemScreenHeader;
