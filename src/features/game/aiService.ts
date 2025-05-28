import { CoinState, IMovePosition, GameState, GameStatus } from './interfaces';
import { updateMoveInGame } from './gameService';

// Helper: Get all available moves
export function getAvailableMoves(board: CoinState[][]): IMovePosition[] {
  const moves: IMovePosition[] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].player === -1) {
        moves.push({ i, j });
      }
    }
  }
  return moves;
}

// Helper: Check winner (returns player index or -1 for no winner)
export function checkWinner(board: CoinState[][], streak: number): number {
  const rows = board.length;
  const cols = board[0].length;
  // Check rows
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <= cols - streak; j++) {
      const player = board[i][j].player;
      if (player !== -1 && Array.from({ length: streak }).every((_, k) => board[i][j + k].player === player)) {
        return player;
      }
    }
  }
  // Check columns
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i <= rows - streak; i++) {
      const player = board[i][j].player;
      if (player !== -1 && Array.from({ length: streak }).every((_, k) => board[i + k][j].player === player)) {
        return player;
      }
    }
  }
  // Check diagonals
  for (let i = 0; i <= rows - streak; i++) {
    for (let j = 0; j <= cols - streak; j++) {
      const player = board[i][j].player;
      if (player !== -1 && Array.from({ length: streak }).every((_, k) => board[i + k][j + k].player === player)) {
        return player;
      }
    }
  }
  for (let i = 0; i <= rows - streak; i++) {
    for (let j = streak - 1; j < cols; j++) {
      const player = board[i][j].player;
      if (player !== -1 && Array.from({ length: streak }).every((_, k) => board[i + k][j - k].player === player)) {
        return player;
      }
    }
  }
  return -1;
}

// Minimax AI for TicTacToe (player 0: human, player 1: AI)
export function minimax(board: CoinState[][], depth: number, isMax: boolean, streak: number, maxDepth: number = 6): { score: number; move?: IMovePosition } {
  const winner = checkWinner(board, streak);
  if (winner === 0) return { score: -10 + depth };
  if (winner === 1) return { score: 10 - depth };
  if (getAvailableMoves(board).length === 0) return { score: 0 };
  if (depth >= maxDepth) return { score: 0 }; // Depth limit reached

  if (isMax) {
    let bestScore = -Infinity;
    let bestMove: IMovePosition | undefined = undefined;
    for (const move of getAvailableMoves(board)) {
      board[move.i][move.j].player = 1;
      const result = minimax(board, depth + 1, false, streak, maxDepth);
      board[move.i][move.j].player = -1;
      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
    }
    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove: IMovePosition | undefined = undefined;
    for (const move of getAvailableMoves(board)) {
      board[move.i][move.j].player = 0;
      const result = minimax(board, depth + 1, true, streak, maxDepth);
      board[move.i][move.j].player = -1;
      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
    }
    return { score: bestScore, move: bestMove };
  }
}

// Synchronous AI move function that returns updated state
export function makeAIMoveSync(state: GameState): GameState {
  if (state.currentPlayer !== 1 || state.gameStatus !== GameStatus.InProgress) {
    return state;
  }
  
  const boardCopy = state.boardState.map((row: CoinState[]) => row.map((cell: CoinState) => ({ ...cell })));
  const streak = state.config.minWinCoinsInStreak || 3;
  
  // Use a reasonable depth limit based on board size
  const boardSize = state.boardState.length * state.boardState[0].length;
  const maxDepth = boardSize <= 9 ? 9 : 4; // Full depth for 3x3, limited for larger boards
  
  const { move } = minimax(boardCopy, 0, true, streak, maxDepth);
  
  if (move) {
    return updateMoveInGame(state, move);
  }
  
  return state;
}
