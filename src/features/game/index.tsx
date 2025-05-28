import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectGameStatus } from './gameSlice';
import { GameStatus } from './interfaces';
import { Arena } from './main/Arena';
import { End } from './End';
import { Start } from './Start';
import { Configure} from './Configure';
import './styles.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ReactComponent as Logo } from './../../resources/svgs/TicTacToe.svg'


export const Game = () => {
  const gameStatus = useSelector(selectGameStatus);
  const startRef = useRef(null);
  const arenaRef = useRef(null);
  const endRef = useRef(null);

  // Avoiding use of react router
  const renderComponent = () => {
    switch (gameStatus) {
      case GameStatus.Configure:
        return (
          <CSSTransition nodeRef={startRef} key={'Configure'} timeout={500} classNames="item">
            <div ref={startRef}>
              <Configure />
            </div>
          </CSSTransition>
        );
      case GameStatus.NewGame:
        return (
          <CSSTransition nodeRef={startRef} key={'NewGame'} timeout={500} classNames="item">
            <div ref={startRef}>
              <Start />
            </div>
          </CSSTransition>
        )
      case GameStatus.InProgress:
        return (
          <CSSTransition nodeRef={arenaRef} key={'Arena'} timeout={500} classNames="item">
            <div ref={arenaRef}>
              <Arena />
            </div>
          </CSSTransition>
        );
      case GameStatus.End:
        return (
          <CSSTransition nodeRef={endRef} key={'End'} timeout={500} classNames="item">
            <div ref={endRef}>
              <End />
            </div>
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
