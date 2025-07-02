import React from 'react';
import { render } from '@testing-library/react-native';
import NoSearchResults from '../components/NoSearchResults';
import { Provider as PaperProvider } from 'react-native-paper';

describe('NoSearchResults', () => {
  it('renders a message with the search term', () => {
    const term = 'react-native';
    const { getByText } = render(
      <PaperProvider>
        <NoSearchResults searchTerm={term} />
      </PaperProvider>
    );

    expect(getByText(`No results for ${term}`)).toBeTruthy();
  });
});
