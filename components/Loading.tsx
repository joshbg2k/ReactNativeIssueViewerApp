import React from 'react';
import { View, ActivityIndicator } from 'react-native';

type Props = {
  fullScreen?: boolean;
  infiniteScrolling?: boolean;
};

const Loading = ({ fullScreen = false, infiniteScrolling = false }: Props) => {
  return (
    <>
      {fullScreen && (
        <View
          testID="full-screen-loader"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      {infiniteScrolling && (
        <View 
          testID="infinite-scroll-loader"
          style={{ flex: 1, marginTop: 20, marginBottom: 30 }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      {!infiniteScrolling && !fullScreen && (
        <ActivityIndicator 
          testID="default-loader"
          size="large" 
        />
      )}
    </>
  );
};

export default Loading;
