import React from 'react';
import { render } from '@testing-library/react';
import Tile from './Tile.js';

test('Tile contains correct content', () => {
  const { getByText } = render(<Tile data="H" />);

  const element = getByText(/H/i);
  expect(element).toBeInTheDocument();
});

test('Tile contains correct content multiple characters', () => {
  const { getByText } = render(<Tile data="Hello" />);

  const element = getByText(/Hello/i);
  expect(element).toBeInTheDocument();
});
