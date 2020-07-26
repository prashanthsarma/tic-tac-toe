import React, { useEffect, useRef, MutableRefObject, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRoundStatus, selectCurrentPlayer, nextRound } from '../../gameSlice';
import { Board } from '../Board';
import { CentralPlaceholder } from '../../utils/CentralPlaceholder';
import styles from './Arena.module.css';
import { Player } from '../Player';
import { CentrePageLayout } from '../../utils/CentrePageLayout';
import { RoundStatus } from '../../interfaces';
import { PlayerCoin } from '../../utils/PlayerCoin';

export const Arena = () => {

  const [cursorUpdate, setCursorUpdate] = useState(false);
  const status = useSelector(selectRoundStatus);
  const player = useSelector(selectCurrentPlayer);
  const cursorRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const onMousemove = (e: MouseEvent) => {
      if (cursorRef == null || cursorRef.current == null)
        return;
      cursorRef.current!.setAttribute("style", "top: " + (e.pageY - 20) + "px; left: " + (e.pageX - 20) + "px;")
      if(!cursorUpdate){
        setCursorUpdate(true);
      }
    }
    const onMouseUp = (e: MouseEvent) => {
      dispatch(nextRound());
    }
    if (status === RoundStatus.Continue) {
      console.log("add event")
      window.addEventListener('mousemove', onMousemove)
      window.removeEventListener('click', onMouseUp)
    } else {
      setCursorUpdate(false);
      window.removeEventListener('mousemove', onMousemove)
      window.addEventListener('click', onMouseUp)
    }
    return () => {
      console.log("mousemov remove final");
      window.removeEventListener('mousemove', onMousemove);
      window.removeEventListener('click', onMouseUp)
    }
  }, [status, cursorRef, dispatch, cursorUpdate])

  const showCursor = status === RoundStatus.Continue && cursorUpdate;
  return (
    <CentrePageLayout>
      <div ref={cursorRef} className={`${styles.cursor} ${showCursor ? '' : 'none'}`}>
        <PlayerCoin player={player} />
      </div>

      <Player player={1} />
      <CentralPlaceholder>
        <Board/>
      </CentralPlaceholder>
      <Player player={2} />
      {/* <div className={styles.arenaBelowCenter}>another div here</div> */}
    </CentrePageLayout>
  );
}
