import { useSelector, useDispatch } from 'react-redux';
import { selectPlayerState, selectGameConfig, nextGame } from '../gameSlice';
import { CentralPlaceholder } from '../utils/CentralPlaceholder';
import { CentrePageLayout } from '../utils/CentrePageLayout';
import { PlayerDetail } from '../utils/PlayerDetail';

export const End = () => {
  const players = useSelector(selectPlayerState);
  const config = useSelector(selectGameConfig);
  const player = players.findIndex(p => p.wins >= config.maxWins)
  const dispatch = useDispatch();

  return (
    <CentrePageLayout onClick={()=>dispatch(nextGame())}>
      <CentralPlaceholder>
        <div className="w-full h-full flex flex-col items-center justify-evenly box-border">
          <span className="text-[34px] font-poppins mb-4 animate-winner">WINNER!</span>
          <div className="w-[52%] h-[58%] mb-8">
            <PlayerDetail player={player} fontStyle="text-[33px]" />
          </div>
        </div>
      </CentralPlaceholder>
    </CentrePageLayout>
  );
}
