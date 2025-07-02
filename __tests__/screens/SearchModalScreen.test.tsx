import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import SearchModalScreen from '../../screens/SearchModalScreen';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockSetOptions = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    navigate: mockNavigate,
    setOptions: mockSetOptions,
  }),
}));

describe('SearchModalScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Searchbar, SegmentedButtons, and Search button', () => {
    const { getByPlaceholderText, getByText } = render(
      <PaperProvider>
        <SearchModalScreen />
      </PaperProvider>,
    );

    expect(getByPlaceholderText('Search React Native on GitHub')).toBeTruthy();
    expect(getByText('Open')).toBeTruthy();
    expect(getByText('Closed')).toBeTruthy();
    expect(getByText('All')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('does not submit empty search', () => {
    const { getByText } = render(
      <PaperProvider>
        <SearchModalScreen />
      </PaperProvider>,
    );

    fireEvent.press(getByText('Search'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('submits search and navigates with correct query', async () => {
    const { getByText, getByPlaceholderText } = render(
      <PaperProvider>
        <SearchModalScreen />
      </PaperProvider>,
    );

    const input = getByPlaceholderText('Search React Native on GitHub');
    fireEvent.changeText(input, 'keyboard');

    await act(async () => {
      fireEvent.press(getByText('Search'));
    });

    expect(mockGoBack).toHaveBeenCalled();

    await act(() => new Promise(r => setTimeout(r, 150)));

    expect(mockNavigate).toHaveBeenCalledWith('MainNavStack', {
      screen: 'SearchResults',
      params: {
        query: expect.stringContaining('keyboard'),
        searchTerm: 'keyboard',
      },
    });
  });

  it('sets header options on mount', () => {
    render(
      <PaperProvider>
        <SearchModalScreen />
      </PaperProvider>,
    );

    expect(mockSetOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Search for issues',
      }),
    );
  });
});
