/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client';
import { client } from './api/githubClient';
import Icon from '@react-native-vector-icons/fontawesome5';
import {
  HomeScreen,
  ItemScreen,
  SearchModalScreen,
  SearchResultsScreen,
} from './screens';
import { RootStackParamList, MainStackParamList } from './navigation/types';

const searchIcon = (
  <Icon name="search" size={25} color="black" iconStyle="solid" />
);

const MainStack = createNativeStackNavigator<MainStackParamList>({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: HomeScreen,
    },
    Item: {
      screen: ItemScreen,
    },
    SearchResults: {
      screen: SearchResultsScreen,
    },
  },
});

const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    Modal: {
      screen: SearchModalScreen,
      options: {
        title: 'Search issues',
        headerShown: false,
      },
    },
    MainNavStack: {
      screen: MainStack,
    },
  },
});

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        options={{
          title: 'React Native Issues',
          headerRight: () => <TouchableOpacity>{searchIcon}</TouchableOpacity>,
        }}
        component={HomeScreen}
      />
      <MainStack.Screen name="Item" component={ItemScreen} />
      <MainStack.Screen name="SearchResults" component={SearchResultsScreen} />
    </MainStack.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              name="MainNavStack"
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
              <RootStack.Screen name="Modal" component={SearchModalScreen} />
            </RootStack.Group>
          </RootStack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default App;