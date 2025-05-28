import React, { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../gameSlice';
import { CentralPlaceholder } from '../utils/CentralPlaceholder';
import { CentrePageLayout } from '../utils/CentrePageLayout';
import { PlayerDetailInput } from '../utils/PlayerDetailInput';
import styles from './Start.module.css';
import { MaxPlayers } from '../config';



export const Start: React.FC = () => {

  const dispatch = useDispatch();

  const onContinueClicked = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(startGame());
  }

  const playerDetails = []
  for (let i = 0; i < MaxPlayers; i++) {
    playerDetails.push(<PlayerDetailInput player={i} key={i} />)
  }

  return (
    <CentrePageLayout>
      <CentralPlaceholder>
        <form className={styles.containerDiv} onSubmit={onContinueClicked}>
          <div className={styles.welcomeText}>
            <span className={styles.textWelcomeTo}>{`Welcome to `}</span>
            <span className={styles.textTicTacToe} >{`TIC TAC TOE`}</span>
          </div>
          <div  data-testid="player-detail-list" className={styles.listOfPlayerDetails}>
            {playerDetails}
          </div>
          <button className={styles.continueBtn}>Continue</button>
        </form>
      </CentralPlaceholder>
    </CentrePageLayout>
  );
}
