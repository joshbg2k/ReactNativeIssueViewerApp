import { NavigatorScreenParams } from '@react-navigation/native';
import { Issue } from '../graphql/generated/graphql';

export type MainStackParamList = {
  Home: undefined;
  Item: { item: Issue };
  SearchResults: { query: string; searchTerm: string };
};

export type RootStackParamList = {
  MainNavStack: NavigatorScreenParams<MainStackParamList> & {
    item?: Partial<Issue>;
  };
  Modal: Array<Partial<Issue>>;
};
