import React from 'react';
import { render } from '@testing-library/react';
import DenseAppBar from './DenseAppBar.js';

test('Title is Boggle Game', () => {
  const { getByText } = render(<DenseAppBar />);

  const element = getByText(/Boggle Game/i);
  expect(element).toBeInTheDocument();
});
