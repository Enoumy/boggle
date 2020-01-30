import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import WordList from './WordList.js';

let container = null;
beforeEach(() => {
  // Sets up a DOM element as render target.
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Cleanup
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('Renders correct title', () => {
  act(() => {
    render(<WordList title="Game of Thrones" words={['']} />, container);
  });
});
