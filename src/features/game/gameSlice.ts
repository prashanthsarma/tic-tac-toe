import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { BoardRows, BoardColumns, MaxPlayers } from './constants';
import { IMovePosition, CoinState, RoundStatus, GameState, PlayerState } from './interfaces';
import { updateMoveInGame } from './gameService';






interface IMakeMovePayload {
  move: IMovePosition;
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

const initRoundState = () => {
  const initial: PlayerState[] = [];
  for (let i = 0; i <= MaxPlayers; i++) {
    initial.push({ currentStatus: RoundStatus.Continue, streaks: 0, wins: 2, name:'Ram' })
  }
  return initial;
}

const initialState: GameState = {
  boardState: initBoardState(),
  playerStates: initRoundState(),
  currentPlayer: 1,
  moveCount: 0,
};

export const gameSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    makeMove: (state, action: PayloadAction<IMakeMovePayload>) => {
      const { move } = action.payload;
      state = updateMoveInGame(state, move);
      console.log(state);
    },
    decrement: state => {
      
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      
    },
  },
});

export const { makeMove, decrement, incrementByAmount } = gameSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number): AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoardState = (state: RootState) => state.game.boardState;
export const selectPlayerState = (state: RootState) => state.game.playerStates;
export const selectCurrentPlayer = (state: RootState) => state.game.currentPlayer;

export default gameSlice.reducer;
