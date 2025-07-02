import React from 'react';
import { render } from '@testing-library/react-native';
import ErrorView from '../../components/ErrorView';

describe('Error Component', () => {
  it('renders correctly with the provided error message', () => {
    const errorMessage = 'Something went wrong!';
    const { getByText } = render(<ErrorView message={errorMessage} />);

    // Check if the error message is displayed
    expect(getByText(errorMessage)).toBeTruthy();
  });
});
