import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from '../gameSlice';
import styles from './Board.module.css';
import { BoardColumns, BoardRows } from '../constants';

export const Board = ()=> {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  const rows = []
  for (let i = 0; i < BoardRows; i++) {
      const rows = <Coin    
  }
  return (
    <div className={styles.outerBorder}>

    </div>
  );
}
