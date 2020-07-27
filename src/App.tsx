import React from 'react';
import { Game } from './features/game';
import './App.css';

function App() {
  return (
    <div data-testid="tictactoe" className="App">
      <Game />
    </div>
  );
}

export default App;
