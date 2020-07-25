import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCommonStatus, selectCurrentPlayer } from '../gameSlice';
import { Board } from '../Board';
import { CentralPlaceholder } from '../CentralPlaceholder';
import styles from './Arena.module.css';
import { Player } from '../Player';

export const Arena = () => {
  
  const status = useSelector(selectCommonStatus);
  const currentPlayer = useSelector(selectCurrentPlayer);

  return (
    <div className={styles.arena}>
      <Player player={1} />
      <CentralPlaceholder>
        <Board status={status}/>
      </CentralPlaceholder>
      <Player player={2} />
    </div>
  );
}
