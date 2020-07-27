import { IMovePosition, CoinState, GameState, PlayerState, RoundStatus, GameStatus } from "./interfaces";
import { BoardColumns, MinWinCoinsInStreak, BoardRows, NumOfStreaksToWin, MaxPlayers, MaxWins } from "./config";


export const updateMoveInGame = (state: GameState, move: IMovePosition) => {

    const { boardState, playerStates, currentPlayer: player } = state; // Not making a deep copy
    state.moveCount = state.moveCount + 1;
    boardState[move.i][move.j].player = player;

    let roundStatus = RoundStatus.Continue;
    let gameStatus = GameStatus.InProgress;

    // check column
    const downStreak = getCoinStreak(boardState, player, move, 0, 1);
    const upStreak = getCoinStreak(boardState, player, move, 0, -1);
    const colStreak = downStreak.concat(upStreak);
    colStreak.push(move);
    if (colStreak.length >= MinWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, colStreak);
        roundStatus = updatePlayerState(playerStates, player);
    }

    // check row
    const leftStreak = getCoinStreak(boardState, player, move, -1, 0);
    const rightStreak = getCoinStreak(boardState, player, move, 1, 0);
    const rowStreak = leftStreak.concat(rightStreak);
    rowStreak.push(move);
    if (rowStreak.length >= MinWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, rowStreak);
        roundStatus = updatePlayerState(playerStates, player);
    }

    // check diagonal
    const upleftStreak = getCoinStreak(boardState, player, move, -1, -1);
    const downrightStreak = getCoinStreak(boardState, player, move, 1, 1);
    const diagonalStreak = upleftStreak.concat(downrightStreak);
    diagonalStreak.push(move);
    if (diagonalStreak.length >= MinWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, diagonalStreak);
        roundStatus = updatePlayerState(playerStates, player);
    }

    // check anti-diagonal
    const upRightStreak = getCoinStreak(boardState, player, move, -1, 1);
    const downLeftStreak = getCoinStreak(boardState, player, move, 1, -1);
    const antiDiagonalStreak = upRightStreak.concat(downLeftStreak);
    antiDiagonalStreak.push(move);
    if (antiDiagonalStreak.length >= MinWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, antiDiagonalStreak);
        roundStatus = updatePlayerState(playerStates, player);
    }

    if(roundStatus === RoundStatus.Win && playerStates[player].wins >= MaxWins) {
        gameStatus = GameStatus.End;
    }
    if (state.moveCount === BoardColumns * BoardRows 
        && roundStatus !== RoundStatus.Win) {
        roundStatus = RoundStatus.Draw;
    }
    state.roundStatus = roundStatus;
    state.gameStatus = gameStatus
    if(roundStatus === RoundStatus.Continue) {
        // Dont modify current player if won or draw
        state.currentPlayer = (state.currentPlayer % MaxPlayers) + 1;
    }
    
    return state;
}

const getCoinStreak = (board: CoinState[][], player: number, move: IMovePosition, iInc: number, jInc: number) => {
    let coinStreak: IMovePosition[] = [];
    for (let i = move.i + iInc, j = move.j + jInc;
        i > -1 && i < BoardRows && j > -1 && j < BoardColumns;
        i = i + iInc, j = j + jInc) {

        if (board[i][j].player === player) {
            coinStreak.push({ i, j })
        }
        else {
            return coinStreak;
        }
    }
    return coinStreak;
}

const updateWinStreakInBoard = (board: CoinState[][], coinStreak: IMovePosition[]) => {
    coinStreak.map(c => board[c.i][c.j].isWinCoin = true);
}

const updatePlayerState = (playerStates: PlayerState[], player: number) => {
    const playerState = playerStates[player];
    playerState.streaks = playerState.streaks + 1;
    if (playerState.streaks >= NumOfStreaksToWin) {
        playerState.wins = playerState.wins + 1;
        playerState.isRoundWin = true;
        return RoundStatus.Win;
    }
    return RoundStatus.Continue;
}