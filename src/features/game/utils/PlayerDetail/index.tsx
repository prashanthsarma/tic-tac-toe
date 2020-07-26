import React, {  } from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerState } from '../../gameSlice';
import { PlayerCoin } from '../PlayerCoin';
import styles from './PlayerDetail.module.css';
import { RoundStatus } from '../../interfaces';


interface IPlayerProps {
  player: number;
  fontStyle: string;
}

export const PlayerDetail: React.FC<IPlayerProps> = (props) => {

  const { player, fontStyle } = props;
  const playerState = useSelector(selectPlayerState);
  const p = playerState[player];

  const winnerStyle = p.currentStatus === RoundStatus.Win ? styles.winnerBorder : '';

  return (
    <div className={`${styles.playerDetailDiv} ${fontStyle} ${winnerStyle}`}>
      <div className={styles.playerNumberName}>
        <span className={styles.playerNumber}>{`PLAYER ${player}`}</span>
        <span className={styles.playerName}>{p.name}</span>
      </div>
      <div className={styles.playerCoinContainer}>
        <PlayerCoin player={player} />
      </div>
    </div >
  );
}
