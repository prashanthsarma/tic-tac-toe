import { Game } from './features/game';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function App() {
  return (
    <div data-testid="tictactoe" className="App">
      <ErrorBoundary>
        <Game />
      </ErrorBoundary>
    </div>
  );
}

export default App;
