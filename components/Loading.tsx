import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

type Props = {
  fullScreen?: boolean;
  infiniteScrolliing?: boolean;
};

const Loading = ({ fullScreen = false, infiniteScrolliing = false }: Props) => {
  return (
    <>
      {fullScreen && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      {infiniteScrolliing && (
        <View style={{ flex: 1, marginTop: 20, marginBottom: 30 }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {!infiniteScrolliing && !fullScreen && <ActivityIndicator size="large" />}
    </>
  );
};

export default Loading;
