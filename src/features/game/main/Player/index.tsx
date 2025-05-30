import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerState, selectCurrentPlayer, selectRoundStatus, selectGameConfig } from '../../gameSlice';
import { RoundStatus, PlayerState } from '../../interfaces';
import { PlayerDetail } from '../../utils/PlayerDetail';

interface IPlayerProps {
  player: number;
}

export const Player: FC<IPlayerProps> = (props) => {
  const { player } = props;
  const playerState = useSelector(selectPlayerState);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const roundstatus = useSelector(selectRoundStatus);
  const config = useSelector(selectGameConfig);
  const p = playerState[player];

  const roundWins = []
  for (let i = 1; i <= config.maxWins; i++) {
    roundWins.push(      
    <svg key={i} viewBox={`0 0 10 10`} className="w-[10px] h-[10px] mr-[10px] stroke-0 overflow-visible">        <ellipse 
          className={i <= p.wins ? 'animate-winEllipse' : 'fill-[var(--secondary-bg)]'}
          cx="5" cy="5" rx="5" ry="5" 
          style={{transformOrigin: 'center'}}
        />
      </svg>
    )
  }

  const showStatus = (status: RoundStatus, playerDetail: PlayerState, currentPlayer: number, player: number) => {
    switch (status) {
      case RoundStatus.Draw:
        return <span className="text-[31px] text-[var(--primary-fg)]">DRAW</span>
      case RoundStatus.Win:
        return playerDetail.isRoundWin ? <span className="text-[31px] animate-winner">WINNER</span> : null;
      case RoundStatus.Continue:
        return currentPlayer === player ? <span className="text-[21px] text-[var(--secondary-fg)]">Your Turn</span> : null;
    }
  }

  return (
    <div className="relative h-[137px] w-[123px] my-20">
      <div className="absolute flex w-[123px] justify-around -top-[50px] left-0">
        {showStatus(roundstatus, p, currentPlayer, player)}
      </div>
      <PlayerDetail player={player} fontStyle="text-[17px]" />
      <div className="absolute flex w-[123px] justify-center -bottom-[25px] left-0 h-[10px]">
        {roundWins}
      </div>
    </div>
  );
}
