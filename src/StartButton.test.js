import React from 'react';
import { render } from '@testing-library/react';
import StartButton from './StartButton.js';

test('Start state works', () => {
  const state = 'stopped';

  const { getByText } = render(<StartButton state={state} />);

  const element = getByText(/start/i);
  expect(element).toBeInTheDocument();
});

test('Stop state works', () => {
  const state = 'active';

  const { getByText } = render(<StartButton state={state} />);

  const element = getByText(/stop/i);
  expect(element).toBeInTheDocument();
});
