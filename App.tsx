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
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { adaptNavigationTheme } from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import Icon from '@react-native-vector-icons/material-design-icons';
import {
  HomeScreen,
  ItemScreen,
  SearchModalScreen,
  SearchResultsScreen,
} from './screens';
import { RootStackParamList, MainStackParamList } from './navigation/types';

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
          headerRight: () => <TouchableOpacity><Icon name="magnify" size={36} /></TouchableOpacity>,
        }}
        component={HomeScreen}
      />
      <MainStack.Screen name="Item" component={ItemScreen} />
      <MainStack.Screen name="SearchResults" component={SearchResultsScreen} />
    </MainStack.Navigator>
  );
}

function App() {
  const { LightTheme: NavigationTheme } = adaptNavigationTheme({
    reactNavigationLight: {
      ...NavigationDefaultTheme,
      colors: {
        ...NavigationDefaultTheme.colors,
        ...MD3LightTheme.colors,
        primary: MD3LightTheme.colors.primary,
        secondary: MD3LightTheme.colors.secondary,
        tertiary: MD3LightTheme.colors.tertiary,
        background: MD3LightTheme.colors.background,
        card: MD3LightTheme.colors.background,
        text: MD3LightTheme.colors.onSurface,
        border: MD3LightTheme.colors.outline,
        notification: MD3LightTheme.colors.error,
      },
    },
  });
  
  const theme = {
    ...MD3LightTheme,
  };

  const CombinedTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...NavigationTheme.colors,
    },
  };

  return (
    <SafeAreaProvider >
      <ApolloProvider client={client}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={CombinedTheme}>
            <RootStack.Navigator 
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerTintColor: theme.colors.onSurface,
                headerTitleStyle: {
                  color: theme.colors.onSurface,
                  fontWeight: 'bold',
                },
              }}
              >
              <RootStack.Screen
                name="MainNavStack"
                component={MainStackScreen}
                options={{ headerShown: false,
                  headerTintColor: CombinedTheme.colors.primary,
                  headerTitleStyle: {
                    color: CombinedTheme.colors.primary,
                    fontWeight: 'bold',
                  },
                }}
              />
              <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen name="Modal" component={SearchModalScreen} />
              </RootStack.Group>
            </RootStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default App;