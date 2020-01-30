import React from 'react';
import { render } from '@testing-library/react';
import WordList from './WordList.js';

test('Renders correct title', () => {
  // Tests that the WordList is rendered with the correct title.
  const title = 'Game of Thrones';
  const words = [''];

  const { getByText } = render(<WordList title={title} words={words} />);

  const element = getByText(/Game of Thrones/i);
  expect(element).toBeInTheDocument();
});

test('Renders correct word list', () => {
  // Tests that the WordList renders the correct word list.
  const title = '';
  const words = ['Ravenclaw', 'Hufflepuff', 'Griffindor'];

  const { getByText } = render(<WordList title={title} words={words} />);

  let element;
  element = getByText(/Ravenclaw/i);
  expect(element).toBeInTheDocument();
  element = getByText(/Hufflepuff/i);
  expect(element).toBeInTheDocument();
  element = getByText(/Griffindor/i);
  expect(element).toBeInTheDocument();
});
