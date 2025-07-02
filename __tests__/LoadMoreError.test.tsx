import React from 'react';
import { render } from '@testing-library/react-native';
import LoadMoreError from '../components/LoadMoreError';
import { Provider as PaperProvider } from 'react-native-paper';

describe('LoadMoreError', () => {
  it('renders error message text', () => {
    const { getByText } = render(
      <PaperProvider>
        <LoadMoreError />
      </PaperProvider>
    );
    expect(getByText('Error loading more content.')).toBeTruthy();
  });
});
