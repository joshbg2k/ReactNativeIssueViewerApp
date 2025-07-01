import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/fontawesome5';
import { RootStackParamList } from '../navigation/types';
// import { SearchBar, CheckBox } from '@rneui/themed';

const SearchModalScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const searchRef = useRef<TextInput>(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<'open' | 'closed' | 'all'>('open');

  useEffect(() => {
    searchRef.current?.focus();
    navigation.setOptions({
      title: 'Search for issues',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Close search modal"
        >
          <Icon name="times" size={25} color="black" solid />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onSubmit = () => {
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

  const checkedIcon = <Icon name="check-square" size={25} color="black" />;
  const uncheckedIcon = <Icon name="square" size={25} color="black" />;

  return (
    <View>
      {/* <SearchBar
        ref={searchRef}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        placeholder="Search React Native on GitHub"
        round
        lightTheme
        value={search}
        onChangeText={setSearch}
        searchIcon={<Icon name="search" size={25} color="black" solid />}
        clearIcon={
          <Icon
            name="times"
            size={25}
            color="black"
            solid
            onPress={() => setSearch('')}
          />
        }
      />
      <CheckBox
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        title="Open issues only"
        checked={selected === 'open'}
        onPress={() => setSelected('open')}
      />
      <CheckBox
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        title="Closed issues only"
        checked={selected === 'closed'}
        onPress={() => setSelected('closed')}
      />
      <CheckBox
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        title="Open and closed issues"
        checked={selected === 'all'}
        onPress={() => setSelected('all')}
      /> */}
    </View>
  );
};

export default SearchModalScreen;
