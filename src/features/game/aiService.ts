import { CoinState, GameConfig, IMovePosition } from "./interfaces";

// Evaluate the board state for the AI player
const evaluateBoard = (board: CoinState[][], config: GameConfig, aiPlayer: number): number => {
    // Check horizontal
    for (let i = 0; i < config.boardRows; i++) {
        for (let j = 0; j <= config.boardColumns - config.minWinCoinsInStreak; j++) {
            let score = checkLine(board, i, j, 0, 1, config.minWinCoinsInStreak, aiPlayer);
            if (score !== 0) return score;
        }
    }

    // Check vertical
    for (let i = 0; i <= config.boardRows - config.minWinCoinsInStreak; i++) {
        for (let j = 0; j < config.boardColumns; j++) {
            let score = checkLine(board, i, j, 1, 0, config.minWinCoinsInStreak, aiPlayer);
            if (score !== 0) return score;
        }
    }

    // Check diagonal
    for (let i = 0; i <= config.boardRows - config.minWinCoinsInStreak; i++) {
        for (let j = 0; j <= config.boardColumns - config.minWinCoinsInStreak; j++) {
            let score = checkLine(board, i, j, 1, 1, config.minWinCoinsInStreak, aiPlayer);
            if (score !== 0) return score;
        }
    }

    // Check anti-diagonal
    for (let i = 0; i <= config.boardRows - config.minWinCoinsInStreak; i++) {
        for (let j = config.minWinCoinsInStreak - 1; j < config.boardColumns; j++) {
            let score = checkLine(board, i, j, 1, -1, config.minWinCoinsInStreak, aiPlayer);
            if (score !== 0) return score;
        }
    }

    return 0;
};

const checkLine = (
    board: CoinState[][],
    startRow: number,
    startCol: number,
    rowDelta: number,
    colDelta: number,
    length: number,
    aiPlayer: number
): number => {
    let aiCount = 0;
    let humanCount = 0;

    for (let i = 0; i < length; i++) {
        const row = startRow + i * rowDelta;
        const col = startCol + i * colDelta;
        const cell = board[row][col];

        if (cell.player === aiPlayer) {
            aiCount++;
        } else if (cell.player !== -1) {
            humanCount++;
        }
    }

    if (aiCount === length) return 100;
    if (humanCount === length) return -100;
    if (aiCount > 0 && humanCount === 0) return aiCount;
    if (humanCount > 0 && aiCount === 0) return -humanCount;
    return 0;
};

const getAvailableMoves = (board: CoinState[][]): IMovePosition[] => {
    const moves: IMovePosition[] = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].player === -1) {
                moves.push({ i, j });
            }
        }
    }
    return moves;
};

const minimax = (
    board: CoinState[][],
    depth: number,
    isMaximizing: boolean,
    alpha: number,
    beta: number,
    config: GameConfig,
    aiPlayer: number
): { score: number; move?: IMovePosition } => {
    const score = evaluateBoard(board, config, aiPlayer);
    if (Math.abs(score) === 100 || depth === 0) {
        return { score };
    }

    const availableMoves = getAvailableMoves(board);
    if (availableMoves.length === 0) {
        return { score: 0 };
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        let bestMove: IMovePosition | undefined;

        for (const move of availableMoves) {
            board[move.i][move.j].player = aiPlayer;
            const { score } = minimax(board, depth - 1, false, alpha, beta, config, aiPlayer);
            board[move.i][move.j].player = -1;

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) break;
        }

        return { score: bestScore, move: bestMove };
    } else {
        let bestScore = Infinity;
        let bestMove: IMovePosition | undefined;

        for (const move of availableMoves) {
            board[move.i][move.j].player = aiPlayer === 1 ? 0 : 1;
            const { score } = minimax(board, depth - 1, true, alpha, beta, config, aiPlayer);
            board[move.i][move.j].player = -1;

            if (score < bestScore) {
                bestScore = score;
                bestMove = move;
            }
            beta = Math.min(beta, bestScore);
            if (beta <= alpha) break;
        }

        return { score: bestScore, move: bestMove };
    }
};

export const findBestMove = (board: CoinState[][], config: GameConfig, aiPlayer: number): IMovePosition => {
    const maxDepth = 4; // Adjust this value to control AI difficulty
    const { move } = minimax(board, maxDepth, true, -Infinity, Infinity, config, aiPlayer);
    
    // If no move is found (shouldn't happen in normal gameplay), return first available move
    if (!move) {
        const availableMoves = getAvailableMoves(board);
        return availableMoves[0];
    }
    
    return move;
};