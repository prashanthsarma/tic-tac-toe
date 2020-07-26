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
    NotStarted = 0,
    InProgress = 1,
    End = 2,
}

export interface PlayerState {
    streaks: number;
    wins: number;
    name: string;
    isRoundWin: boolean;
}

export interface GameState {
    boardState: CoinState[][];
    playerStates: PlayerState[];
    currentPlayer: number;
    moveCount: number;
    gameStatus: GameStatus;
    roundStatus: RoundStatus;
}