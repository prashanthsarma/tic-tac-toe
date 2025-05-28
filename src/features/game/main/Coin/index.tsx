import React from 'react';
import { PlayerCoin } from '../../utils/PlayerCoin';

interface ICoinProps {
  i: number;
  j: number;
  player: number;
  isWin: boolean;
}

export const Coin: React.FC<ICoinProps> = (props) => {
  const { player } = props;
  return (
    <div className={`flex items-center justify-center [&_svg]:w-[55%] [&_svg]:h-[55%] ${
      props.isWin 
        ? '[&_ellipse]:animate-strokeWin [&_path]:animate-pathWin [&_text]:animate-pathWin' 
        : '[&_ellipse]:stroke-[var(--primary-fg)] [&_path]:fill-[var(--primary-fg)] [&_text]:fill-[var(--primary-fg)]'
    }`}>
      <PlayerCoin player={player} />
    </div>
  );
}
