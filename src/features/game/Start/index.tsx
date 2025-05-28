import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, selectGameConfig } from '../gameSlice';
import { CentralPlaceholder } from '../utils/CentralPlaceholder';
import { CentrePageLayout } from '../utils/CentrePageLayout';
import { PlayerDetailInput } from '../utils/PlayerDetailInput';

export const Start: React.FC = () => {
  const dispatch = useDispatch();
  const config = useSelector(selectGameConfig);

  const onContinueClicked = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(startGame());
  }

  const playerDetails = [];
  for (let i = 0; i < config.maxPlayers; i++) {
    playerDetails.push(<PlayerDetailInput player={i} key={i} />)
  }

  return (
    <CentrePageLayout>
      <CentralPlaceholder>
        <form className="font-poppins text-gray-100 flex flex-col items-center justify-between h-full p-12 box-border" onSubmit={onContinueClicked}>
          <div className="tracking-[0.83px]">
            <span className="text-[23px]">{`Welcome to `}</span>
            <span className="text-[25px] font-semibold text-[#fba202]">{`TIC TAC TOE`}</span>
          </div>
          <div data-testid="player-detail-list" className="flex flex-grow flex-col items-center justify-evenly">
            {playerDetails}
          </div>
          <button className="w-[300px] h-12 text-sm text-gray-100 bg-gradient-to-r from-[#ff5800] to-[#fba202] shadow-lg rounded hover:opacity-90 transition-opacity border-none">
            Continue
          </button>
        </form>
      </CentralPlaceholder>
    </CentrePageLayout>
  );
}
