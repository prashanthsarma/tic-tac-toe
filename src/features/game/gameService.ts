import { IMovePosition, CoinState, GameState, PlayerState, RoundStatus } from "./interfaces";
import { BoardColumns, MinWinCoinsInStreak, BoardRows, NumOfStreaksToWin, MaxPlayers } from "./constants";
import { makeMove } from "./gameSlice";


export const updateMoveInGame = (state: GameState, move: IMovePosition) => {

    const { boardState, playerStates, currentPlayer: player } = state; // Not making a deep copy
    state.moveCount = state.moveCount + 1;
    state.currentPlayer = (state.currentPlayer % MaxPlayers) + 1;
    boardState[move.i][move.j].player = player;

    // check column
    const downStreak = getCoinStreak(boardState, player, move, 0, 1);
    const upStreak = getCoinStreak(boardState, player, move, 0, -1);
    const colStreak = downStreak.concat(upStreak);
    colStreak.push(move);
    if (colStreak.length >= MinWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, colStreak);
        updatePlayerState(playerStates[player])

    }

    // check row
    const leftStreak = getCoinStreak(boardState, player, move, -1, 0);
    const rightStreak = getCoinStreak(boardState, player, move, 1, 0);
    const rowStreak = leftStreak.concat(rightStreak);
    rowStreak.push(move);
    if (rowStreak.length >= MinWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, rowStreak);
    }

    // check diagonal
    const upleftStreak = getCoinStreak(boardState, player, move, -1, -1);
    const downrightStreak = getCoinStreak(boardState, player, move, 1, 1);
    const diagonalStreak = upleftStreak.concat(downrightStreak);
    diagonalStreak.push(move);
    if (diagonalStreak.length >= MinWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, diagonalStreak);
    }

    // check anti-diagonal
    const upRightStreak = getCoinStreak(boardState, player, move, -1, 1);
    const downLeftStreak = getCoinStreak(boardState, player, move, 1, -1);
    const antiDiagonalStreak = upRightStreak.concat(downLeftStreak);
    antiDiagonalStreak.push(move);
    if (antiDiagonalStreak.length >= MinWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, antiDiagonalStreak);
    }

    if (state.moveCount === BoardColumns * BoardRows) {
        if (playerStates.every(p => p.currentStatus === RoundStatus.Continue)) {
            playerStates.forEach(p => p.currentStatus = RoundStatus.Draw)
        }
    }

    if (state.moveCount % MaxPlayers === 0) { // End of Turn for everyone
        const winningPlayers = playerStates.filter(p => p.currentStatus === RoundStatus.Win)
        if (winningPlayers.length > 0) {
            playerStates.filter(p => p.currentStatus !== RoundStatus.Win).forEach(p => p.currentStatus = RoundStatus.End)
        }
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

const updatePlayerState = (playerState: PlayerState) => {
    playerState.streaks = playerState.streaks + 1;
    if (playerState.streaks >= NumOfStreaksToWin) {
        playerState.currentStatus = RoundStatus.Win
        playerState.wins = playerState.wins + 1;
    }
}