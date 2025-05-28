import { GameConfig } from './interfaces';

export const defaultConfig: GameConfig = {
  boardRows: 7,
  boardColumns: 7,
  minWinCoinsInStreak: 4,
  numOfStreaksToWin: 1,
  maxWins: 4,
  maxPlayers: 2,
  coinSize: 75,
};

export const BoardWidth = (config: GameConfig) => config.coinSize * config.boardColumns;
export const BoardHeight = (config: GameConfig) => config.coinSize * config.boardRows;