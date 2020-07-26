import React from 'react';
import { useSelector } from 'react-redux';
import { selectCommonStatus } from '../../gameSlice';
import { Board } from '../Board';
import { CentralPlaceholder } from '../../utils/CentralPlaceholder';
import styles from './Arena.module.css';
import { Player } from '../Player';

export const Arena = () => {

  const status = useSelector(selectCommonStatus);

  return (
    <div className={styles.arena}>
      <div className={styles.arenaCenter}>
        <Player player={1} />
        <CentralPlaceholder>
          <Board status={status} />
        </CentralPlaceholder>
        <Player player={2} />
        {/* <div className={styles.arenaBelowCenter}>another div here</div> */}
      </div>
    </div>
  );
}
