import React from 'react';
import { Text, View, Image } from 'react-native';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';
import { Chip } from 'react-native-paper';
import { StyleProp, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  title: string;
  number: number;
  body: string;
  date: string;
  state: string;
};

type MarkdownStyles = {
  [key: string]: StyleProp<TextStyle | ViewStyle>;
};

const ItemScreenHeader = ({ title, number, body, date, state }: Props) => {
  const theme = useTheme();

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

  const renderImage = props => {
    const { key, ...restProps } = props;
    return <Image key={key} {...restProps} style={pageStyles.image} />;
  };

  return (
    <View>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 22,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ alignItems: 'flex-start' }}>
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.secondary,
              fontWeight: 'bold',
            }}
          >
            #{number} · {date}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          {state === 'OPEN' && (
            <Chip mode="flat">
              <Text
                style={{ color: theme.colors.onSurface, fontWeight: '800' }}
              >
                {state}
              </Text>
            </Chip>
          )}
          {state === 'CLOSED' && (
            <Chip mode="flat">
              <Text
                style={{ color: theme.colors.onSurface, fontWeight: '800' }}
              >
                {state}
              </Text>
            </Chip>
          )}
        </View>
      </View>
      <Markdown
        style={pageStyles}
        markdownit={MarkdownIt({ typographer: true })}
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
        {body}
      </Markdown>
      <Text style={pageStyles.heading3}>Activity</Text>
    </View>
  );
};

export default ItemScreenHeader;
