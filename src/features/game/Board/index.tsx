import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBoardState,
} from '../gameSlice';
import styles from './Board.module.css';
import { Coin } from '../Coin';

export const Board = () => {
  const boardState = useSelector(selectBoardState);
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  const getRow = ( row: number[], i: number) => {
    return (
      <tr>
        {row.map((c, j) => (<td key={`${i},${j}`}><Coin i={i} j={j} p={c}/></td>))}
      </tr>
    )
  }
  
  const rows = boardState.map((row, i) => getRow(row, i));
  return (
    <div className={styles.outerBorder}>
      <table>
        {rows}
      </table>
    </div>
  );
}
