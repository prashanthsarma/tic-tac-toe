import { useSelector, useDispatch } from 'react-redux';
import { selectPlayerState, selectGameConfig, nextGame } from '../gameSlice';
import { CentralPlaceholder } from '../utils/CentralPlaceholder';
import { CentrePageLayout } from '../utils/CentrePageLayout';
import styles from './End.module.css';
import { PlayerDetail } from '../utils/PlayerDetail';


export const End = () => {
  const players = useSelector(selectPlayerState);
  const config = useSelector(selectGameConfig);
  const player = players.findIndex(p => p.wins >= config.maxWins)
  const dispatch = useDispatch();


  return (
    <CentrePageLayout onClick={()=>dispatch(nextGame())}>
      <CentralPlaceholder>
        <div className={styles.endContainer} >
          <span className={styles.textWinner}>WINNER!</span>
          <div className={styles.playerDetailContainer}>
            <PlayerDetail player={player} fontStyle={styles.detailFontStyle} />
          </div>
        </div>
      </CentralPlaceholder>
    </CentrePageLayout>
  );
}
