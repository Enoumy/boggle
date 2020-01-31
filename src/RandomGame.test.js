import React from 'react';
import { render } from '@testing-library/react';
import RandomGame from './RandomGame';

describe('Main app tests', () => {
  describe('Static tests', () => {
    test('Renders start button on load', () => {
      const { getByText } = render(<RandomGame />);
      const linkElement = getByText(/START/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
