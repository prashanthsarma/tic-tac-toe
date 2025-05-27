import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

describe('App', () => {
  it('renders the TicTacToe game', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const gameElement = screen.getByTestId('tictactoe');
    expect(gameElement).toBeInTheDocument();
    expect(gameElement).toHaveClass('App');
  });
});
