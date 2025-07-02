import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const LoadMoreError = () => {
  const theme = useTheme();
  return (
    <View style={{paddingTop: 20, paddingBottom: 20}}>
      <Text style={{ textAlign: 'center', color: theme.colors.onSurface, fontSize: 18, fontWeight: 'bold' }}>
        Error loading more content.
      </Text>
    </View>
  );
};

export default LoadMoreError;
