import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Start } from '.';
import { store } from '../../../app/store';

const renderWithRedux = (component: React.ReactElement) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

afterEach(() => {
  cleanup();
  // Reset store state after each test
  store.dispatch({ type: 'game/reset' });
});

describe('Start Component', () => {
  it('should render correctly', () => {
    const { container } = renderWithRedux(<Start />);
    expect(container).toMatchSnapshot();
  });

  it('should have name input for all players', () => {
    renderWithRedux(<Start />);
    const playerInputs = screen.getAllByTestId('player-detail');
    const state = store.getState();
    expect(playerInputs).toHaveLength(state.game.config.maxPlayers);
  });

  it('should update player name in store when input changes', () => {
    const testName = 'First Player';
    renderWithRedux(<Start />);
    
    const playerInputs = screen.getAllByTestId('player-detail-name');
    const firstPlayerInput = playerInputs[0] as HTMLInputElement;
    
    fireEvent.change(firstPlayerInput, { target: { value: testName } });
    
    const state = store.getState();
    expect(state.game.playerStates[0].name).toBe(testName);
  });
});