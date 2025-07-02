import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ItemScreenHeader from '../../components/ItemScreenHeader';

describe('ItemScreenHeader', () => {
  const defaultProps = {
    title: 'Fix navigation bug',
    number: 42,
    body: '**Steps to reproduce:**\n1. Tap the button\n2. Crash',
    date: '2025-07-01',
    state: 'OPEN',
  };

  it('renders title, number, and date', () => {
    const { getByText } = render(
      <PaperProvider>
        <ItemScreenHeader {...defaultProps} />
      </PaperProvider>
    );

    expect(getByText(defaultProps.title)).toBeTruthy();
    expect(getByText(`#${defaultProps.number} · ${defaultProps.date}`)).toBeTruthy();
  });

  it('renders body as Markdown', () => {
    const { getByText } = render(
      <PaperProvider>
        <ItemScreenHeader {...defaultProps} />
      </PaperProvider>
    );

    expect(getByText('Steps to reproduce:')).toBeTruthy();
    expect(getByText('Tap the button')).toBeTruthy();
    expect(getByText('Crash')).toBeTruthy();
  });

  it('renders correct state chip when state is OPEN', () => {
    const { getByText } = render(
      <PaperProvider>
        <ItemScreenHeader {...defaultProps} />
      </PaperProvider>
    );

    expect(getByText('OPEN')).toBeTruthy();
  });

  it('renders correct state chip when state is CLOSED', () => {
    const { getByText } = render(
      <PaperProvider>
        <ItemScreenHeader {...defaultProps} state="CLOSED" />
      </PaperProvider>
    );

    expect(getByText('CLOSED')).toBeTruthy();
  });

  it('renders Comments heading', () => {
    const { getByText } = render(
      <PaperProvider>
        <ItemScreenHeader {...defaultProps} />
      </PaperProvider>
    );

    expect(getByText('Comments')).toBeTruthy();
  });
});
