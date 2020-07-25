export interface IMovePosition {
    i: number,
    j: number,
}

export interface CoinState {
    player: number;
    isWinCoin: boolean;
}

export enum RoundStatus {
    Win,
    Continue,
    Draw,
    End,
}

export interface PlayerState {
    currentStatus: RoundStatus;
    streaks: number;
    wins: number;
}

export interface GameState {
    boardState: CoinState[][];
    currentPlayer: number;
    moveCount: number
    playerStates: PlayerState[];
}