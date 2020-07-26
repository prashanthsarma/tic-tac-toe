import React from 'react';
import { useSelector } from 'react-redux';
import { selectGameStatus } from './gameSlice';
import { GameStatus } from './interfaces';
import { Arena } from './main/Arena';
import { End } from './End';
import { Start } from './Start';

export const Game = () => {

  const gameStatus = useSelector(selectGameStatus);

  // Avoiding use of react router
  const renderComponent = () => {
    switch (gameStatus) {
      case GameStatus.NotStarted:
        return <Start />
      case GameStatus.InProgress:
        return <Arena />
      case GameStatus.End:
        return <End />
    }
  }

  return (
    <>
      {renderComponent()}
    </>
  );
}
