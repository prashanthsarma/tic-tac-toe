import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerState } from '../../gameSlice';
import { Coin } from '../../main/Coin';

interface IPlayerProps {
  player: number;
  fontStyle: string;
}

export const PlayerDetail: FC<IPlayerProps> = (props) => {
  const { player, fontStyle } = props;
  const playerState = useSelector(selectPlayerState);
  const p = playerState[player];
  if(p== null){
    return null;
  }

  const winnerStyle = p.isRoundWin ? 'border-3 border-[var(--secondary-fg)]' : '';

  return (
    <div className={`h-full w-full bg-[var(--secondary-bg)] flex flex-col items-center justify-between py-4 pb-5 box-border rounded-2xl ${fontStyle} ${winnerStyle}`}>
      <div className="flex flex-col items-center justify-between box-border h-[calc(55%-0.5rem)] w-full">
        <span className="text-[61%] text-[var(--secondary-fg)]">{`PLAYER ${player}`}</span>
        <span className="text-[100%] max-h-[80%] max-w-[80%] overflow-hidden">{p.name}</span>
      </div>
      <div className="h-[45%] w-full flex items-center justify-center">
        <Coin player={player} isWin={false} />
      </div>
    </div>
  );
}
