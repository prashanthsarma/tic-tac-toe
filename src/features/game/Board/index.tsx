import React, { useState, CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBoardState,
  makeMove,
} from '../gameSlice';
import styles from './Board.module.css';
import { Coin } from '../Coin';
import { CoinState } from '../interfaces';
import { BoardColumns, BoardRows, CellWidth } from '../constants';

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
  const lines = []

  // Creat Horizontal lines
  for (let i = 1; i < BoardRows; i++) {
    const width = BoardRows * CellWidth;
    lines.push(<svg viewBox={`0 0 ${width} 2`} style={{ top: `${i * CellWidth}px`, position: "absolute", left: "0px" }}>
      <line x1="0" y1="0" x2={`${width}`} y2="0" className={styles.dotted} stroke="white" />
    </svg>)
  }

  // Creat Vertical lines
  for (let i = 1; i < BoardColumns; i++) {
    const height = BoardColumns * CellWidth;
    lines.push(<svg viewBox={`0 0 2 ${height}`} style={{ left: `${i * CellWidth}px`, position: "absolute", top: "0px", height }}>
      <line x1="0" y1="0" x2="0" y2={`${height}`} className={styles.dotted} stroke="white" />
    </svg>)
  }

  return (
    <div className={styles.outerborder}>
      <div className={styles.gameTable}>
        {rows}
        {lines}
      </div>
    </div>
  );
}
