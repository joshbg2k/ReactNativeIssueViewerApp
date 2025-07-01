import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const Error = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40,
        paddingBottom: 100,
      }}
    >
      <Text style={{ color: theme.colors.onSurface, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
        There was an error loading the content. Please try again.
      </Text>
    </View>
  );
};

export default Error;
