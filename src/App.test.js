import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Main app tests', () => {
  test('Navbar title', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Boggle Game/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Renders start button on load', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/START/i);
    expect(linkElement).toBeInTheDocument();
  });
});
