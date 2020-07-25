import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {

} from '../gameSlice';
import { Board } from '../Board';
import { CentralPlaceholder } from '../CentralPlaceholder';
import styles from './Arena.module.css';
import { Player } from '../Player';

export const Arena = () => {

  return (
    <div className={styles.arena}>
      <Player player={1} />
      <CentralPlaceholder>
        <Board />
      </CentralPlaceholder>
      <Player player={2} />
    </div>
  );
}
