import React from 'react';
import { usePlayerState } from './usePlayerState';
import styles from './PlayerDetailInput.module.css'

interface IPlayerDetailInput {
  player: number
}

export const PlayerDetailInput: React.FC<IPlayerDetailInput> = (props) => {

  const { playerDetail, setPlayerDetail } = usePlayerState(props.player);

  return (
    <div data-testid="player-detail" className={styles.control}>
      <label>{`PLAYER ${props.player + 1}`}</label>
      <input type="text"
        data-testid="player-detail-name"
        name="name"
        required
        minLength={1}
        maxLength={25}
        value={playerDetail.name}
        onChange={setPlayerDetail}>
      </input>
    </div>
  );
}
