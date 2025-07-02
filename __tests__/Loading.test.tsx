import React from 'react';
import { render } from '@testing-library/react-native';
import Loading from '../components/Loading';

describe('Loading', () => {
  it('renders full screen loading when fullScreen is true', () => {
    const { getByTestId } = render(<Loading fullScreen />);
    const loader = getByTestId('full-screen-loader');
    expect(loader).toBeTruthy();
  });

  it('renders infinite scroll loading when infiniteScrolling is true', () => {
    const { getByTestId } = render(<Loading infiniteScrolling />);
    const loader = getByTestId('infinite-scroll-loader');
    expect(loader).toBeTruthy();
  });

  it('renders default loading when no props are true', () => {
    const { getByTestId } = render(<Loading />);
    const loader = getByTestId('default-loader');
    expect(loader).toBeTruthy();
  });

  it('renders both loaders when both props are true', () => {
    const { getByTestId } = render(<Loading fullScreen infiniteScrolling />);
    expect(getByTestId('full-screen-loader')).toBeTruthy();
    expect(getByTestId('infinite-scroll-loader')).toBeTruthy();
  });
});
