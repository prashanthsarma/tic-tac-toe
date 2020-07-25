import React, { useState, CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBoardState,
  makeMove,
} from '../gameSlice';
import { Coin } from '../Coin';
import { CoinState } from '../interfaces';
import { CellWidth } from '../constants';
import { Lines } from './Lines';
import styles from './Board.module.css';

export const Board = () => {
  const boardState = useSelector(selectBoardState);
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  const getRow = (row: CoinState[], i: number,) => {
    const cellStyle: CSSProperties = { width: `${CellWidth}px`, height: `${CellWidth}px` }

    return (
      <div className={styles.row}>
        {row.map((c, j, a) => (
          <>
            {
              c.player > 0
                ?
                <div key={`${i},${j}`}
                  style={cellStyle}
                  className={styles.coinContainer}>
                  <Coin i={i} j={j} player={c.player} isWin={c.isWinCoin} />
                </div>
                :
                <div key={`${i},${j}`}
                  style={cellStyle}
                  className={styles.coinContainer}
                  onClick={() => dispatch(makeMove({ move: { i, j } }))}>
                </div>
            }
          </>
        ))}
      </div>

    )
  }

  const rows = boardState.map((row, i, a) => getRow(row, i));

  return (
    <div className={styles.outerborder}>
      <div className={styles.gameTable}>
        {rows}
        <Lines />
      </div>
    </div>
  );
}
