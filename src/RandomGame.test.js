import React from 'react';
import { render } from '@testing-library/react';
import RandomGame from './RandomGame';

describe('Main app tests', () => {
  describe('Static tests', () => {
    test('Navbar title', () => {
      const { getByText } = render(<RandomGame />);
      const linkElement = getByText(/Boggle Game/i);
      expect(linkElement).toBeInTheDocument();
    });

    test('Renders start button on load', () => {
      const { getByText } = render(<RandomGame />);
      const linkElement = getByText(/START/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
