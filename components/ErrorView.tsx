import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  message?: string;
};

const Error = (props: Props) => {
  // const ErrorView: React.FC<Props> =  (props: Props) => {
  const theme = useTheme();
  const message = props.message
    ? props.message
    : 'There was an error loading the content. Please try again.';
  return (
    <View
      testID="error-message"
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40,
        paddingBottom: 100,
      }}
    >
      <Text
        style={{
          color: theme.colors.onSurface,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default Error;
