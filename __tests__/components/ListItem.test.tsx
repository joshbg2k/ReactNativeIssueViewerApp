import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ListItem from '../../components/ListItem';
import { Provider as PaperProvider } from 'react-native-paper';

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('ListItem', () => {
  const defaultItem = {
    title: 'Test Issue',
    number: 123,
    createdAt: '2025-07-02',
    state: 'OPEN',
  };

  it('renders item title, number, and date', () => {
    const { getByText } = render(
      <PaperProvider>
        <ListItem item={defaultItem} onPress={jest.fn()} />
      </PaperProvider>
    );

    expect(getByText(defaultItem.title)).toBeTruthy();
    expect(getByText(`#${defaultItem.number} · ${defaultItem.createdAt}`)).toBeTruthy();
  });

  it('renders OPEN state chip', () => {
    const { getByText } = render(
      <PaperProvider>
        <ListItem item={{ ...defaultItem, state: 'OPEN' }} onPress={jest.fn()} />
      </PaperProvider>
    );

    expect(getByText('OPEN')).toBeTruthy();
  });

  it('renders CLOSED state chip', () => {
    const { getByText } = render(
      <PaperProvider>
        <ListItem item={{ ...defaultItem, state: 'CLOSED' }} onPress={jest.fn()} />
      </PaperProvider>
    );

    expect(getByText('CLOSED')).toBeTruthy();
  });

  it('calls onPress callback when pressed', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <PaperProvider>
        <ListItem item={defaultItem} onPress={onPressMock} />
      </PaperProvider>
    );

    fireEvent.press(getByText(defaultItem.title));
    expect(onPressMock).toHaveBeenCalledWith(defaultItem);
  });
});
