import React, {  } from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerState, selectCurrentPlayer } from '../../gameSlice';
import styles from './Player.module.css';
import { MaxWins } from '../../constants';
import { RoundStatus } from '../../interfaces';
import { PlayerDetail } from '../../utils/PlayerDetail';

interface IPlayerProps {
  player: number;
}

export const Player: React.FC<IPlayerProps> = (props) => {

  const { player } = props;
  const playerState = useSelector(selectPlayerState);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const p = playerState[player];

  const roundWins = []
  for (let i = 1; i <= MaxWins; i++) {
    roundWins.push(
      <svg viewBox={`0 0 10 10`}>
        <ellipse className={i <= p.wins ? styles.winEllipse : styles.emptyEllipse}
          cx="5" cy="5" rx="5" ry="5" />
      </svg>
    )
  }


  const roundstatus = (status: RoundStatus, currentPlayer: number, player: number) => {
    switch (status) {
      case RoundStatus.End:
        return null;
      case RoundStatus.Draw:
        return <span className={styles.playerDraw}>DRAW</span>
      case RoundStatus.Win:
        return <span className={styles.playerWin}>WINNER</span>
      case RoundStatus.Continue:
        return currentPlayer === player ? <span className={styles.playerTurn}>Your Turn</span> : null;
    }
  }

  return (
    <div className={styles.playerDiv}>
      <div className={styles.playerRoundStatus}>
        {roundstatus(p.currentStatus, currentPlayer, player)}
      </div>
      <PlayerDetail player={player} fontStyle={styles.detailFontStyle}/>
      <div className={styles.playerRoundWins}>
        {roundWins}
      </div>
    </div >
  );
}
