import { IMovePosition, CoinState, GameState, PlayerState, RoundStatus, GameStatus, GameConfig } from "./interfaces";

export const updateMoveInGame = (state: GameState, move: IMovePosition) => {
    const { boardState, playerStates, currentPlayer: player, config } = state;
    state.moveCount = state.moveCount + 1;
    boardState[move.i][move.j].player = player;

    let roundStatus = RoundStatus.Continue;
    let gameStatus = GameStatus.InProgress;

    // check column
    const downStreak = getCoinStreak(boardState, player, move, 0, 1, config);
    const upStreak = getCoinStreak(boardState, player, move, 0, -1, config);
    const colStreak = downStreak.concat(upStreak);
    colStreak.push(move);
    if (colStreak.length >= config.minWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, colStreak);
        roundStatus = updatePlayerState(playerStates, player, config);
    }

    // check row
    const leftStreak = getCoinStreak(boardState, player, move, -1, 0, config);
    const rightStreak = getCoinStreak(boardState, player, move, 1, 0, config);
    const rowStreak = leftStreak.concat(rightStreak);
    rowStreak.push(move);
    if (rowStreak.length >= config.minWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, rowStreak);
        roundStatus = updatePlayerState(playerStates, player, config);
    }

    // check diagonal
    const upleftStreak = getCoinStreak(boardState, player, move, -1, -1, config);
    const downrightStreak = getCoinStreak(boardState, player, move, 1, 1, config);
    const diagonalStreak = upleftStreak.concat(downrightStreak);
    diagonalStreak.push(move);
    if (diagonalStreak.length >= config.minWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, diagonalStreak);
        roundStatus = updatePlayerState(playerStates, player, config);
    }

    // check anti-diagonal
    const upRightStreak = getCoinStreak(boardState, player, move, -1, 1, config);
    const downLeftStreak = getCoinStreak(boardState, player, move, 1, -1, config);
    const antiDiagonalStreak = upRightStreak.concat(downLeftStreak);
    antiDiagonalStreak.push(move);
    if (antiDiagonalStreak.length >= config.minWinCoinsInStreak) {
        updateWinStreakInBoard(boardState, antiDiagonalStreak);
        roundStatus = updatePlayerState(playerStates, player, config);
    }

    if(roundStatus === RoundStatus.Win && playerStates[player].wins >= config.maxWins) {
        gameStatus = GameStatus.End;
    }
    if (state.moveCount === config.boardColumns * config.boardRows 
        && roundStatus !== RoundStatus.Win) {
        roundStatus = RoundStatus.Draw;
    }
    state.roundStatus = roundStatus;
    state.gameStatus = gameStatus
    if(roundStatus === RoundStatus.Continue) {
        // Dont modify current player if won or draw
        state.currentPlayer = (state.currentPlayer + 1) % config.maxPlayers;
    }
    
    return state;
}

const getCoinStreak = (board: CoinState[][], player: number, move: IMovePosition, iInc: number, jInc: number, config: GameConfig) => {
    let coinStreak: IMovePosition[] = [];
    for (let i = move.i + iInc, j = move.j + jInc;
        i > -1 && i < config.boardRows && j > -1 && j < config.boardColumns;
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

const updatePlayerState = (playerStates: PlayerState[], player: number, config: GameConfig) => {
    const playerState = playerStates[player];
    playerState.streaks = playerState.streaks + 1;
    if (playerState.streaks >= config.numOfStreaksToWin) {
        playerState.wins = playerState.wins + 1;
        playerState.isRoundWin = true;
        return RoundStatus.Win;
    }
    return RoundStatus.Continue;
}