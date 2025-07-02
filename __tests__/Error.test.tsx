import React from 'react';
import { render } from '@testing-library/react-native';
import Error from '../components/Error';

describe('Error Component', () => {
  it('renders correctly with the provided error message', () => {
    const errorMessage = 'Something went wrong!';
    const { getByText } = render(<Error message={errorMessage} />);

    // Check if the error message is displayed
    expect(getByText(errorMessage)).toBeTruthy();
  });

});