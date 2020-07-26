import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BoardRows, BoardColumns, MaxPlayers } from './constants';
import { IMovePosition, CoinState, RoundStatus, GameState, PlayerState, GameStatus } from './interfaces';
import { updateMoveInGame } from './gameService';

interface IMakeMovePayload {
  move: IMovePosition;
}

interface IUpdatePlayerPayload {
  player: number;
  property: keyof PlayerState;
  value: any;
}

interface IEmpty {
  i: number;
}

const initBoardState = () => {
  const initial: CoinState[][] = [];
  for (let i = 0; i < BoardRows; i++) {
    initial[i] = [];
    for (let j = 0; j < BoardColumns; j++) {
      initial[i][j] = { player: 0, isWinCoin: false }; // blank coin
    }
  }
  return initial;
}

const initPlayerState = () => {
  const initial: PlayerState[] = [];

  for (let i = 0; i <= MaxPlayers; i++) {
    initial.push({ streaks: 0, wins: 0, name: '', isRoundWin: false })
  }
  return initial;
}

// Player at index 0 is the unused. 
const initialState: GameState = {
  boardState: initBoardState(),
  playerStates: initPlayerState(),
  currentPlayer: 1,
  gameStatus: GameStatus.NotStarted,
  roundStatus: RoundStatus.Continue,
  moveCount: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    makeMove: (state, action: PayloadAction<IMakeMovePayload>) => {
      const { move } = action.payload;
      state = updateMoveInGame(state, move);
    },
    updatePlayer: (state, action: PayloadAction<IUpdatePlayerPayload>) => {
      const { player, property, value } = action.payload;
      state.playerStates[player][property] = value as never;
    },
    startGame: state => {
      state.gameStatus = GameStatus.InProgress;
    },
    nextRound: state => {
      if (state.gameStatus === GameStatus.InProgress) {
        state.currentPlayer = (state.currentPlayer % MaxPlayers) + 1;
        state.playerStates.forEach(p => p.isRoundWin = false);
        state.boardState = initBoardState();
        state.roundStatus = RoundStatus.Continue;
        state.moveCount = 0;
      }
    },
  },
});


export const { makeMove, updatePlayer, nextRound, startGame } = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoardState = (state: RootState) => state.game.boardState;
export const selectPlayerState = (state: RootState) => state.game.playerStates;
export const selectCurrentPlayer = (state: RootState) => state.game.currentPlayer;
export const selectGameStatus = (state: RootState) => state.game.gameStatus;
export const selectRoundStatus = (state: RootState) => state.game.roundStatus;

export default gameSlice.reducer;
