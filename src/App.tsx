import React from 'react';
import logo from './logo.svg';
import { Arena } from './features/game/Arena';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Arena />
        
      </header>
    </div>
  );
}

export default App;
