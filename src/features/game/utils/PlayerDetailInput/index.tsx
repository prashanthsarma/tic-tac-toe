import React from 'react';
import { usePlayerState } from './usePlayerState';
import styles from './PlayerDetailInput.module.css'

interface IPlayerDetailInput {
  player: number
}

export const PlayerDetailInput: React.FC<IPlayerDetailInput> = (props) => {

  const { playerDetail, setPlayerDetail } = usePlayerState(props.player);

  return (
    <div className={styles.control}>
      <label>{`PLAYER ${props.player}`}</label>
      <input type="text"
        name="name"
        required
        minLength={1}
        maxLength={15}
        value={playerDetail.name}
        onChange={setPlayerDetail}>
      </input>
    </div>
  );
}
