import React from 'react';
import { PlayerCoin } from '../../utils/PlayerCoin';

interface ICoinProps {
  player: number;
  isWin: boolean;
}

export const Coin: React.FC<ICoinProps> = (props) => {
  const { player } = props;
  const baseClasses = "flex items-center justify-center [&_svg]:w-[55%] [&_svg]:h-[55%]";
  const normalClasses = "";
  const winClasses = "animate-winner";

  return (
    <div className={`${baseClasses} ${props.isWin ? winClasses : normalClasses}`}>
      <PlayerCoin player={player} />
    </div>
  );
}
