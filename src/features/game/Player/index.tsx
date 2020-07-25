import React, { useState, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPlayerState, selectCurrentPlayer } from '../gameSlice';
import { ReactComponent as CoinX } from './../../../resources/svgs/coinx.svg'
import { ReactComponent as CoinO } from './../../../resources/svgs/coino.svg'
import { PlayerCoin } from '../utils/PlayerCoin';
import styles from './Player.module.css';
import { MaxWins } from '../constants';
import { RoundStatus } from '../interfaces';

interface IPlayerProps {
  player: number;
}

export const coinMap: { [key in number]: ReactElement } = {
  1: <CoinX />,
  2: <CoinO />
}


export const Player: React.FC<IPlayerProps> = (props) => {

  const { player } = props;
  const playerState = useSelector(selectPlayerState);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const p = playerState[player];

  const roundWins = []
  for (let i = 1; i <= MaxWins; i++) {
    roundWins.push(
      <svg viewBox={`0 0 10 10`}>
        <ellipse className={i <= p.wins ? styles.winEllipse : styles.emptyEllipse}
          cx="5" cy="5" rx="5" ry="5" />
      </svg>
    )
  }


  const roundstatus = (status: RoundStatus, currentPlayer: number, player: number) => {
    switch (status) {
      case RoundStatus.End:
        return null;
      case RoundStatus.Draw:
        return <span className={styles.playerDraw}>DRAW</span>
      case RoundStatus.Win:
        return <span className={styles.playerWin}>WINNER</span>
      case RoundStatus.Continue:
        return currentPlayer === player ? <span className={styles.playerTurn}>Your Turn</span> : null;
    }
  }

  return (
    <div className={styles.playerDiv}>
      <div className={styles.playerRoundStatus}>
        {roundstatus(p.currentStatus, currentPlayer, player)}
      </div>
      <div className={styles.playerNumberName}>
        <span className={styles.playerNumber}>{`PLAYER ${player}`}</span>
        <span className={styles.playerName}>{p.name}</span>
      </div>
      <PlayerCoin player={player} />
      <div className={styles.playerRoundWins}>
        {roundWins}
      </div>
    </div >
  );
}
