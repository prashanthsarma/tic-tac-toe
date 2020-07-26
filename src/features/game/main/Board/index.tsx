import React, { CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBoardState,
  makeMove,
  selectRoundStatus,
} from '../../gameSlice';
import { Coin } from '../Coin';
import { CoinState, RoundStatus } from '../../interfaces';
import { CellWidth } from '../../constants';
import { Lines } from './Lines';
import styles from './Board.module.css';

export const Board: React.FC = () => {
  const boardState = useSelector(selectBoardState);
  const status = useSelector(selectRoundStatus);
  const dispatch = useDispatch();

  const getRow = (row: CoinState[], i: number,) => {
    const cellStyle: CSSProperties = { width: `${CellWidth}px`, height: `${CellWidth}px` }

    return (
      <div className={styles.row}>
        {row.map((c, j) => (
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
                <>{
                  status === RoundStatus.Continue ?
                    < div key={`${i},${j}`}
                      style={cellStyle}
                      className={styles.coinContainer}
                      onClick={() => dispatch(makeMove({ move: { i, j } }))}>
                    </div>
                    : < div key={`${i},${j}`}
                      style={cellStyle}
                      className={styles.coinContainer}
                    >
                    </div>
                }
                </>
            }
          </>
        ))
        }
      </div >

    )
  }

  const rows = boardState.map((row, i) => getRow(row, i));

  return (
    <div className={styles.outerborder}>
      <div className={styles.gameTable}>
        {rows}
        <Lines />
      </div>
    </div>
  );
}
