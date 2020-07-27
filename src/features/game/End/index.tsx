import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPlayerState, nextGame } from '../gameSlice';
import { CentralPlaceholder } from '../utils/CentralPlaceholder';
import { CentrePageLayout } from '../utils/CentrePageLayout';
import styles from './End.module.css';
import { PlayerDetail } from '../utils/PlayerDetail';
import { MaxWins } from '../constants';


export const End = () => {

  const players = useSelector(selectPlayerState);
  const player = players.findIndex(p => p.wins >= MaxWins)
  const dispatch = useDispatch();


  return (
    <CentrePageLayout>
      <CentralPlaceholder>
        <div className={styles.endContainer} onClick={()=>dispatch(nextGame())}>
          <span className={styles.textWinner}>WINNER!</span>
          <div className={styles.playerDetailContainer}>
            <PlayerDetail player={player} fontStyle={styles.detailFontStyle} />
          </div>
        </div>
      </CentralPlaceholder>
    </CentrePageLayout>
  );
}
