import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { defaultConfig } from './config';
import { IMovePosition, CoinState, RoundStatus, GameState, PlayerState, GameStatus, GameConfig } from './interfaces';
import { updateMoveInGame } from './gameService';
import { findBestMove } from './aiService';

// interface IMakeMovePayload {
//   move: IMovePosition;
// }

interface IUpdatePlayerPayload {
  player: number;
  property: keyof PlayerState;
  value: any;
}

// interface IEmpty {
//   i: number;
// }

const initBoardState = (config: GameConfig) => {
  const initial: CoinState[][] = [];
  for (let i = 0; i < config.boardRows; i++) {
    initial[i] = [];
    for (let j = 0; j < config.boardColumns; j++) {
      initial[i][j] = { player: -1, isWinCoin: false }; // blank coin, -1 means empty
    }
  }
  return initial;
}

const initPlayerState = (config: GameConfig) => {
  const initial: PlayerState[] = [];
  // Use 0-based indexing for players
  for (let i = 0; i < config.maxPlayers; i++) {
    initial.push({ streaks: 0, wins: 0, name: '', isRoundWin: false })
  }
  return initial;
}

// Player at index 0 is the unused. 
export const initialState: GameState = {
  boardState: initBoardState(defaultConfig),
  playerStates: initPlayerState(defaultConfig),
  gameStatus: GameStatus.Configure,
  roundStatus: RoundStatus.Continue,
  currentPlayer: 0, // Start with player 0
  moveCount: 0,
  config: {
    ...defaultConfig,
    coinSize: 75, // Set CoinSize as a constant
    numOfStreaksToWin: 1, // Set Number of Streaks to Win as a constant
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<{ move: IMovePosition }>) => {
      const { move } = action.payload;
      state = updateMoveInGame(state, move);

      // If it's player 2's turn after the human move and the game is still in progress
      if (state.currentPlayer === 1 && state.gameStatus === GameStatus.InProgress && state.roundStatus === RoundStatus.Continue) {
        // Get AI move
        const aiMove = findBestMove(state.boardState, state.config, 1);
        // Make AI move
        state = updateMoveInGame(state, aiMove);
      }
    },
    updatePlayer: (state, action: PayloadAction<IUpdatePlayerPayload>) => {
      const { player, property, value } = action.payload;
      state.playerStates[player] = {
        ...state.playerStates[player],
        [property]: value
      };
    },
    startGame: (state) => {
      state.gameStatus = GameStatus.InProgress;
    },
    nextRound: (state) => {
      if (state.gameStatus === GameStatus.InProgress) {
        state.currentPlayer = (state.currentPlayer + 1) % state.config.maxPlayers;
        state.playerStates.forEach(p => p.isRoundWin = false);
        state.boardState = initBoardState(state.config);
        state.roundStatus = RoundStatus.Continue;
        state.moveCount = 0;

        // If AI starts the next round
        if (state.currentPlayer === 1) {
          const aiMove = findBestMove(state.boardState, state.config, 1);
          state = updateMoveInGame(state, aiMove);
        }
      }
    },
    nextGame: (state) => {
      if (state.gameStatus === GameStatus.End) {
        state.boardState = initBoardState(state.config);
        state.playerStates.forEach(p => {
          p.streaks = 0;
          p.wins = 0;
          p.isRoundWin = false
        });
        state.roundStatus = RoundStatus.Continue;
        state.gameStatus = GameStatus.NewGame;
        state.currentPlayer = 0;
        state.moveCount = 0;
      }
    },
    reset: (_) => {
      return initialState;
    },
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
      if (action.payload === GameStatus.NewGame) {
        state.boardState = initBoardState(state.config);
        state.playerStates = initPlayerState(state.config);
        state.currentPlayer = 0;
        state.moveCount = 0;
        state.roundStatus = RoundStatus.Continue;
      }
    },
    updateConfig: (state, action: PayloadAction<GameConfig>) => {
      state.config = { ...action.payload, coinSize: 75, numOfStreaksToWin: 1 };
    },
  },
});

export const { makeMove, updatePlayer, startGame, nextRound, nextGame, reset, setGameStatus, updateConfig } = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoardState = (state: RootState) => state.game.boardState;
export const selectPlayerState = (state: RootState) => state.game.playerStates;
export const selectCurrentPlayer = (state: RootState) => state.game.currentPlayer;
export const selectGameStatus = (state: RootState) => state.game.gameStatus;
export const selectRoundStatus = (state: RootState) => state.game.roundStatus;
export const selectGameConfig = (state: RootState) => state.game.config;

export default gameSlice.reducer;
