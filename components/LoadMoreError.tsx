import React from 'react';
import { Text, View } from 'react-native';

const LoadMoreError = () => {
  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
        Error loading more content.
      </Text>
    </View>
  );
};

export default LoadMoreError;
