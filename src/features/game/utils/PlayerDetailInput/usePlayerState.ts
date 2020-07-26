import { ChangeEvent } from "react";
import { updatePlayer, selectPlayerState } from "../../gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { PlayerState } from "../../interfaces";

export const usePlayerState = (initPlayer: number) => {

  const playerStates = useSelector(selectPlayerState);
  const dispatch = useDispatch();

  return {
    playerDetail: playerStates[initPlayer],
    setPlayerDetail: (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(updatePlayer({ player: initPlayer, property: e.target.name as keyof PlayerState, value: e.target.value }
      ));
    }
  };
};