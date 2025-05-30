import React from 'react';
import { usePlayerState } from './usePlayerState';

interface IPlayerDetailInput {
  player: number
}

export const PlayerDetailInput: React.FC<IPlayerDetailInput> = (props) => {
  const { playerDetail, setPlayerDetail } = usePlayerState(props.player);

  return (
    <div data-testid="player-detail" className="flex flex-col items-start font-normal">
      <label className="text-xs">{`PLAYER ${props.player + 1}`}</label>
      <input 
        type="text"
        data-testid="player-detail-name"
        name="name"
        required
        minLength={1}
        maxLength={25}
        value={playerDetail.name}
        onChange={setPlayerDetail}
        className="w-[300px] h-[49px] text-sm text-[#f0f0f0] bg-[var(--secondary-bg)] rounded-[2px] border border-[#f0f0f0] outline-none focus:border-[#fba202]"
      />
    </div>
  );
}
