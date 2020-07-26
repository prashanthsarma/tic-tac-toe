import React, {  } from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerState, selectCurrentPlayer, selectRoundStatus } from '../../gameSlice';
import styles from './Player.module.css';
import { MaxWins } from '../../constants';
import { RoundStatus, PlayerState } from '../../interfaces';
import { PlayerDetail } from '../../utils/PlayerDetail';

interface IPlayerProps {
  player: number;
}

export const Player: React.FC<IPlayerProps> = (props) => {

  const { player } = props;
  const playerState = useSelector(selectPlayerState);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const roundstatus = useSelector(selectRoundStatus);
  const p = playerState[player];

  const roundWins = []
  for (let i = 1; i <= MaxWins; i++) {
    roundWins.push(
      <svg key={i} viewBox={`0 0 10 10`} className={i <= p.wins ? styles.winSvg : ''}>
        <ellipse className={i <= p.wins ? styles.winEllipse : styles.emptyEllipse}
          cx="5" cy="5" rx="5" ry="5" />
      </svg>
    )
  }


  const showStatus = (status: RoundStatus, playerDetail: PlayerState,currentPlayer: number, player: number) => {
    switch (status) {
      case RoundStatus.Draw:
        return <span className={styles.playerDraw}>DRAW</span>
      case RoundStatus.Win:
        return playerDetail.isRoundWin ? <span className={styles.playerWin}>WINNER</span> : null;
      case RoundStatus.Continue:
        return currentPlayer === player ? <span className={styles.playerTurn}>Your Turn</span> : null;
    }
  }

  return (
    <div className={styles.playerDiv}>
      <div className={styles.playerRoundStatus}>
        {showStatus(roundstatus, p, currentPlayer, player)}
      </div>
      <PlayerDetail player={player} fontStyle={styles.detailFontStyle}/>
      <div className={styles.playerRoundWins}>
        {roundWins}
      </div>
    </div >
  );
}
