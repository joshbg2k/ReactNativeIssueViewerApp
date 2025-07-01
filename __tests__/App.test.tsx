/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
test('App renders correctly', () => {
  const tree = ReactTestRenderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('App displays correct text', () => {
  const tree = ReactTestRenderer.create(<App />).root;
  const textComponent = tree.findByType(Text);
  expect(textComponent.props.children).toBe('HEY');
});

test('App has correct View styling', () => {
  const tree = ReactTestRenderer.create(<App />).root;
  const viewComponent = tree.findByType(View);
  expect(viewComponent.props.style).toEqual({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  });
});
test('App contains a Text component', () => {
  const tree = ReactTestRenderer.create(<App />).root;
  const textComponent = tree.findByType(Text);
  expect(textComponent).toBeDefined();
});

test('App contains a View component', () => {
  const tree = ReactTestRenderer.create(<App />).root;
  const viewComponent = tree.findByType(View);
  expect(viewComponent).toBeDefined();
});

test('App renders the search icon correctly', () => {
  const searchIcon = ReactTestRenderer.create(
    <Icon name="search" size={25} color="black" iconStyle="solid" />
  ).toJSON();
  expect(searchIcon).toMatchSnapshot();
});