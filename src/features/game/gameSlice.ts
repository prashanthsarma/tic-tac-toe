import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { BoardRows, BoardColumns } from './constants';

interface CounterState {
  value: number;
  boardState: number[][];
}

interface IAddCoin {
  i: number;
  j: number;
  player: number;
}

const initBoardState = () => {
  const initial: number[][] = [];
  for (let i = 0; i < BoardRows; i++) {
    for (let j = 0; j < BoardColumns; j++) {
      initial[i][j] = 0;
    }
  }
  return initial;
}

const initialState: CounterState = {
  value: 0,
  boardState: initBoardState(),
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    addCoin: (state, action: PayloadAction<IAddCoin>) => {
      const { i, j, player } = action.payload;
      state.boardState[i][j] = player;
    },
    decrement: state => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { addCoin, decrement, incrementByAmount } = counterSlice.actions;

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

export default counterSlice.reducer;
