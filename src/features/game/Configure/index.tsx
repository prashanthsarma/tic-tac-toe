import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { CentralPlaceholder } from '../utils/CentralPlaceholder';
import { setGameStatus, updateConfig } from '../gameSlice';
import { GameStatus, GameConfig } from "../interfaces";
import { selectGameConfig } from '../gameSlice';
import { CentrePageLayout } from "../utils/CentrePageLayout";

export const Configure = () => {
  const config = useSelector(selectGameConfig);
  const dispatch = useDispatch();
  const [localConfig, setLocalConfig] = React.useState<GameConfig>(config);

  React.useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalConfig((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleNewGame = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateConfig(localConfig));
    dispatch(setGameStatus(GameStatus.NewGame));
  };

  return (
    <CentrePageLayout>
      <CentralPlaceholder>
        <form className="flex flex-col items-center p-6 w-full max-w-md" onSubmit={handleNewGame}>
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-100">Game Configuration</h1>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row items-center gap-3 px-3">
              <label className="flex-[2] text-left text-gray-100">Rows</label>
              <input 
                name="boardRows" 
                type="number" 
                min={1} 
                max={10} 
                value={localConfig.boardRows} 
                onChange={handleChange}
                className="flex-1 h-12 px-3 text-right text-gray-100 bg-[#23243a] rounded focus:outline-none focus:ring-2 focus:ring-[#fba202]"
              />
            </div>
            <div className="flex flex-row items-center gap-3 px-3">
              <label className="flex-[2] text-left text-gray-100">Columns</label>
              <input 
                name="boardColumns" 
                type="number" 
                min={1} 
                max={10} 
                value={localConfig.boardColumns} 
                onChange={handleChange}
                className="flex-1 h-12 px-3 text-right text-gray-100 bg-[#23243a] rounded focus:outline-none focus:ring-2 focus:ring-[#fba202]"
              />
            </div>
            <div className="flex flex-row items-center gap-3 px-3">
              <label className="flex-[2] text-left text-gray-100">Winning Streak</label>
              <input 
                name="minWinCoinsInStreak" 
                type="number" 
                min={1} 
                max={7} 
                value={localConfig.minWinCoinsInStreak} 
                onChange={handleChange}
                className="flex-1 h-12 px-3 text-right text-gray-100 bg-[#23243a] rounded focus:outline-none focus:ring-2 focus:ring-[#fba202]"
              />
            </div>
            <div className="flex flex-row items-center gap-3 px-3">
              <label className="flex-[2] text-left text-gray-100">Race to ...</label>
              <input 
                name="maxWins" 
                type="number" 
                min={1} 
                max={7} 
                value={localConfig.maxWins} 
                onChange={handleChange}
                className="flex-1 h-12 px-3 text-right text-gray-100 bg-[#23243a] rounded focus:outline-none focus:ring-2 focus:ring-[#fba202]"
              />
            </div>
            <div className="flex flex-row items-center gap-3 px-3">
              <label className="flex-[2] text-left text-gray-100">Players</label>
              <input 
                name="maxPlayers" 
                type="number" 
                min={2} 
                max={4} 
                value={localConfig.maxPlayers} 
                onChange={handleChange}
                className="flex-1 h-12 px-3 text-right text-gray-100 bg-[#23243a] rounded focus:outline-none focus:ring-2 focus:ring-[#fba202]"
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="w-[300px] h-12 mt-6 text-gray-100 text-sm bg-gradient-to-r from-[#ff5800] to-[#fba202] shadow-lg rounded hover:opacity-90 transition-opacity"
          >
            New Game
          </button>
        </form>
      </CentralPlaceholder>
    </CentrePageLayout>
  );
}
