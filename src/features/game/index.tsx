import React from 'react';
import { useSelector } from 'react-redux';
import { selectGameStatus } from './gameSlice';
import { GameStatus } from './interfaces';
import { Arena } from './main/Arena';
import { End } from './End';
import { Start } from './Start';
import './styles.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ReactComponent as Logo } from './../../resources/svgs/TicTacToe.svg'


export const Game = () => {

  const gameStatus = useSelector(selectGameStatus);

  // Avoiding use of react router
  const renderComponent = () => {
    switch (gameStatus) {
      case GameStatus.NotStarted:
        return (
          <CSSTransition key={'Start'} timeout={500} classNames="item">
            <Start />
          </CSSTransition>
        )
      case GameStatus.InProgress:
        return (
          <CSSTransition key={'Arena'} timeout={500} classNames="item">
            <Arena />
          </CSSTransition>
        );
      case GameStatus.End:
        return (
          <CSSTransition key={'End'} timeout={500} classNames="item">
            <End />
          </CSSTransition>
        )
    }
  }

  return (
    <>
      <Logo className="logo" />
      <TransitionGroup>
        {renderComponent()}
      </TransitionGroup>
    </>
  )
}
