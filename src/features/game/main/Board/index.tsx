import React, { CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBoardState,
  makeMove,
  selectRoundStatus,
  selectGameConfig,
} from '../../gameSlice';
import { Coin } from '../Coin';
import { CoinState, RoundStatus } from '../../interfaces';
import { Lines } from './Lines';

export const Board: React.FC = () => {
  const boardState = useSelector(selectBoardState);
  const status = useSelector(selectRoundStatus);
  const config = useSelector(selectGameConfig);
  const dispatch = useDispatch();

  const handleCellClick = (i: number, j: number) => {
    if (status === RoundStatus.Continue) {
      dispatch(makeMove({ move: { i, j } }));
    }
  };

  const getRow = (row: CoinState[], i: number,) => {
    const cellStyle: CSSProperties = { width: `${config.coinSize}px`, height: `${config.coinSize}px` }

    return (
      <div key={`row${i}`} className="flex flex-row">
        {row.map((c, j) => (
          <React.Fragment key={`${i},${j}`}>
            {
              c.player >= 0
                ?
                <div
                  key={`${i},${j}`}
                  style={cellStyle}
                  className="flex justify-center items-center"
                >
                  <Coin player={c.player} isWin={c.isWinCoin} />
                </div>
                :
                <div
                  key={`${i},${j}`}
                  style={cellStyle}
                  className="flex justify-center items-center"
                  onClick={() => handleCellClick(i, j)}
                >
                </div>
            }
          </React.Fragment>
        ))}
      </div>
    )
  }

  const rows = boardState.map((row, i) => getRow(row, i));

  return (
    <div onClick={(e) => {
      e.stopPropagation();
    }}>
      <div onClick={(e) => {
        e.stopPropagation();
      }}>
        {rows}
        <Lines />
      </div>
    </div>
  );
}
