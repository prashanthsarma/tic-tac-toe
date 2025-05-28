export interface IMovePosition {
    i: number,
    j: number,
}

export interface CoinState {
    player: number;
    isWinCoin: boolean;
}

export enum RoundStatus {
    Continue,
    Win,
    Draw,
}

export enum GameStatus {
    Configure = 3,
    NewGame = 0,
    InProgress = 1,
    End = 2,
}

export interface PlayerState {
    streaks: number;
    wins: number;
    name: string;
    isRoundWin: boolean;
}

export interface GameConfig {
    boardRows: number;
    boardColumns: number;
    minWinCoinsInStreak: number;
    numOfStreaksToWin: number;
    maxWins: number;
    maxPlayers: number;
    coinSize: number;
}

export interface GameState {
    boardState: CoinState[][];
    playerStates: PlayerState[];
    currentPlayer: number;
    moveCount: number;
    gameStatus: GameStatus;
    roundStatus: RoundStatus;
    config: GameConfig;
}