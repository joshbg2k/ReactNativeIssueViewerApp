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

  it('renders a default message if no message is provided', () => {
    const defaultMessage = 'An error occurred.';
    const { getByText } = render(<Error />);

    // Check if the default message is displayed
    expect(getByText(defaultMessage)).toBeTruthy();
  });
});