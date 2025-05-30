import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRoundStatus, selectCurrentPlayer, nextRound, selectGameConfig } from '../../gameSlice';
import { Board } from '../Board';
import { CentralPlaceholder } from '../../utils/CentralPlaceholder';
import { Player } from '../Player';
import { CentrePageLayout } from '../../utils/CentrePageLayout';
import { RoundStatus } from '../../interfaces';
import { PlayerCoin } from '../../utils/PlayerCoin';

export const Arena = () => {
  const [cursorUpdate, setCursorUpdate] = useState(false);
  const status = useSelector(selectRoundStatus);
  const player = useSelector(selectCurrentPlayer);
  const config = useSelector(selectGameConfig);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const onMousemove = (e: MouseEvent) => {
      if (cursorRef == null || cursorRef.current == null)
        return;
      cursorRef.current!.setAttribute("style", "top: " + (e.pageY - 9) + "px; left: " + (e.pageX+1) + "px;")
      if (!cursorUpdate) {
        setCursorUpdate(true);
      }
    }
    
    const onMouseUp = (_: MouseEvent) => {
      // Only handle mouse up for round end
      if (status !== RoundStatus.Continue) {
        dispatch(nextRound());
      }
    }

    if (status === RoundStatus.Continue) {
       window.addEventListener('mousemove', onMousemove)
      window.removeEventListener('click', onMouseUp)
    } else {
      setCursorUpdate(false);
      window.removeEventListener('mousemove', onMousemove)
      window.addEventListener('click', onMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', onMousemove);
      window.removeEventListener('click', onMouseUp)
    }
  }, [status, cursorRef, dispatch, cursorUpdate])

  const showCursor = status === RoundStatus.Continue && cursorUpdate;

  const oddPlayers = [];
  const evenPlayers = [];
  for (let i = 0; i < config.maxPlayers; i = i + 2) {
    oddPlayers.push(<Player key={`Player${i}`} player={i} />)
  }
  for (let i = 1; i < config.maxPlayers; i = i + 2) {
    evenPlayers.push(<Player key={`Player${i}`} player={i} />)
  }

  const handleLayoutClick = () => {
    // Only handle clicks for round end
    if (status !== RoundStatus.Continue) {
      dispatch(nextRound());
    }
  };

  return (
    <CentrePageLayout isCustomCursor onClick={handleLayoutClick}>
      <div 
        ref={cursorRef} 
        className={`w-5 h-5 absolute z-10 pointer-events-none ${showCursor ? '' : 'hidden'} [&_svg]:stroke-white [&_svg]:fill-white [&_.cursor]:fill-white [&_.cursor]:stroke-white`}
      >
        <PlayerCoin player={player} />
      </div>
      <div>
        {oddPlayers}
      </div>
      <CentralPlaceholder>
        <Board />
      </CentralPlaceholder>
      <div>
        {evenPlayers}
      </div>
    </CentrePageLayout>
  );
}
