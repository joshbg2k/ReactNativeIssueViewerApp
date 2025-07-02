import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/fontawesome5';
// import { Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from 'react-native-paper';
import { Searchbar, Checkbox, RadioButton, SegmentedButtons, Button } from 'react-native-paper';

const SearchModalScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const searchRef = useRef<TextInput>(null);
  const theme = useTheme();
  const [checked, setChecked] = useState('')
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<'open' | 'closed' | 'all'>('open');

  useEffect(() => {
    searchRef.current?.focus();
    navigation.setOptions({
      title: 'Search for issues',
      headerTintColor: theme.colors.onSurface,
      headerTitleStyle: {
        color: theme.colors.onSurface,
        fontWeight: 'bold',
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Close search modal"
        >
          <Text style={{fontSize: 18}}>Cancel</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onSubmit = () => {
    if (search === '') return;
    let issueState = '';
    if (selected === 'open') issueState = 'is:open';
    else if (selected === 'closed') issueState = 'is:closed';

    const fullQuery = `repo:facebook/react-native in:title,body is:issue ${issueState} ${search}`;
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate('MainNavStack', {
        screen: 'SearchResults',
        params: { query: fullQuery, searchTerm: search },
      });
    }, 100);
  };

  return (
    <View style={{flex: 1, padding: 10, rowGap: 10, backgroundColor: theme.colors.background}}>
      <Searchbar
        ref={searchRef}
        onChangeText={setSearch}
        value={search}
        placeholder="Search React Native on GitHub"
        onSubmitEditing={onSubmit}
        icon="magnify"
        clearIcon="close"
        returnKeyType="search"
      />
      <SegmentedButtons
        value={selected}
        onValueChange={setSelected}
        buttons={[
          {
            value: 'open',
            label: 'Open',
          },
          {
            value: 'closed',
            label: 'Closed',
          },
          { value: 'all', label: 'All' },
        ]}
      />
      <Button mode="contained" onPress={onSubmit}>Search</Button>
    </View>
  );
};

export default SearchModalScreen;
