import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  searchTerm: string;
};

const NoSearchResults = ({ searchTerm }: Props) => {
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
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
        No results for {searchTerm}
      </Text>
    </View>
  );
};

export default NoSearchResults;
