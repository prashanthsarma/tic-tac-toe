import React from 'react';
import styles from './Coin.module.css';
import { PlayerCoin } from '../../utils/PlayerCoin';


interface ICoinProps {
  i: number;
  j: number;
  player: number;
  isWin: boolean;
}

export const Coin: React.FC<ICoinProps> = (props) => {
  const { player } = props;
  return (
    <div className={`${styles.placeholder} ${props.isWin ? styles.win : styles.normal}`}>
      <PlayerCoin player={player} />
    </div>
  );
}
