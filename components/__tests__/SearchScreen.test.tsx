import React from 'react';
import { render } from '@testing-library/react-native';
import SearchScreen from '../SearchScreen';

describe('SearchScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<SearchScreen />);
    expect(getByText('Hello World')).toBeTruthy();
  });
});