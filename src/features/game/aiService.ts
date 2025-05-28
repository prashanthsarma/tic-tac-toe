import { CoinState, GameConfig, IMovePosition } from "./interfaces";

// Generate position weights dynamically based on board dimensions
const generatePositionWeights = (rows: number, cols: number): number[][] => {
    const weights: number[][] = [];
    const centerRow = Math.floor(rows / 2);
    const centerCol = Math.floor(cols / 2);
    const maxDistance = Math.max(
        Math.sqrt(Math.pow(centerRow, 2) + Math.pow(centerCol, 2)),
        Math.sqrt(Math.pow(rows - 1 - centerRow, 2) + Math.pow(cols - 1 - centerCol, 2))
    );

    for (let i = 0; i < rows; i++) {
        weights[i] = [];
        for (let j = 0; j < cols; j++) {
            // Calculate distance from center
            const distance = Math.sqrt(
                Math.pow(i - centerRow, 2) + Math.pow(j - centerCol, 2)
            );
            
            // Normalize distance to 0-1 range and invert it (closer to center = higher value)
            const normalizedValue = 1 - (distance / maxDistance);
            
            // Scale to 1-5 range and add corner bonus
            let weight = 1 + (normalizedValue * 4);
            
            // Add bonus for corners
            if ((i === 0 || i === rows - 1) && (j === 0 || j === cols - 1)) {
                weight += 1;
            }
            
            weights[i][j] = Number(weight.toFixed(2));
        }
    }
    return weights;
};

// Evaluate the board state for the AI player
const evaluateBoard = (board: CoinState[][], config: GameConfig, aiPlayer: number): number => {
    let totalScore = 0;
    const positionWeights = generatePositionWeights(config.boardRows, config.boardColumns);

    // Evaluate all possible lines (horizontal, vertical, diagonal)
    const directions = [
        { rowD: 0, colD: 1 }, // horizontal
        { rowD: 1, colD: 0 }, // vertical
        { rowD: 1, colD: 1 }, // diagonal
        { rowD: 1, colD: -1 } // anti-diagonal
    ];

    for (let i = 0; i < config.boardRows; i++) {
        for (let j = 0; j < config.boardColumns; j++) {
            // Add position-based score
            if (board[i][j].player === aiPlayer) {
                totalScore += positionWeights[i][j] * 10; // Scale position weights for better balance
            } else if (board[i][j].player !== -1) {
                totalScore -= positionWeights[i][j] * 10;
            }

            // Evaluate lines in all directions
            for (const dir of directions) {
                const lineScore = evaluateLine(
                    board,
                    i,
                    j,
                    dir.rowD,
                    dir.colD,
                    config.minWinCoinsInStreak,
                    aiPlayer,
                    config
                );
                totalScore += lineScore;
            }
        }
    }

    return totalScore;
};

const evaluateLine = (
    board: CoinState[][],
    startRow: number,
    startCol: number,
    rowDelta: number,
    colDelta: number,
    length: number,
    aiPlayer: number,
    config: GameConfig
): number => {
    // Check if the line fits on the board
    if (
        startRow + (length - 1) * rowDelta >= config.boardRows ||
        startRow + (length - 1) * rowDelta < 0 ||
        startCol + (length - 1) * colDelta >= config.boardColumns ||
        startCol + (length - 1) * colDelta < 0
    ) {
        return 0;
    }

    let aiCount = 0;
    let humanCount = 0;
    let emptyCount = 0;

    // Count pieces in the line
    for (let i = 0; i < length; i++) {
        const row = startRow + i * rowDelta;
        const col = startCol + i * colDelta;
        const cell = board[row][col];

        if (cell.player === aiPlayer) {
            aiCount++;
        } else if (cell.player === -1) {
            emptyCount++;
        } else {
            humanCount++;
        }
    }

    // Return score based on the state of the line
    if (aiCount === length) return 1000; // Winning line
    if (humanCount === length) return -1000; // Opponent winning line
    if (aiCount === length - 1 && emptyCount === 1) return 100; // One move away from winning
    if (humanCount === length - 1 && emptyCount === 1) return -100; // Block opponent's winning move
    if (aiCount > 0 && humanCount === 0) return Math.pow(10, aiCount); // Potential winning line
    if (humanCount > 0 && aiCount === 0) return -Math.pow(10, humanCount); // Potential losing line
    
    return 0;
};

const getAvailableMoves = (board: CoinState[][], config: GameConfig): IMovePosition[] => {
    const moves: IMovePosition[] = [];
    const positionWeights = generatePositionWeights(config.boardRows, config.boardColumns);
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].player === -1) {
                moves.push({ i, j });
            }
        }
    }
    
    // Sort moves to prioritize better positions based on dynamic weights
    moves.sort((a, b) => {
        const scoreA = positionWeights[a.i][a.j];
        const scoreB = positionWeights[b.i][b.j];
        return scoreB - scoreA;
    });
    
    return moves;
};

const minimax = (
    board: CoinState[][],
    depth: number,
    isMaximizing: boolean,
    alpha: number,
    beta: number,
    config: GameConfig,
    aiPlayer: number,
    moveCount: number
): { score: number; move?: IMovePosition } => {
    const score = evaluateBoard(board, config, aiPlayer);
    
    // Terminal conditions
    if (Math.abs(score) >= 1000 || depth === 0 || moveCount >= config.boardRows * config.boardColumns) {
        return { score };
    }

    const availableMoves = getAvailableMoves(board, config);
    if (availableMoves.length === 0) {
        return { score: 0 };
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        let bestMove: IMovePosition | undefined;

        for (const move of availableMoves) {
            board[move.i][move.j].player = aiPlayer;
            const { score } = minimax(board, depth - 1, false, alpha, beta, config, aiPlayer, moveCount + 1);
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
            const { score } = minimax(board, depth - 1, true, alpha, beta, config, aiPlayer, moveCount + 1);
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
    const maxDepth = 4; // Increased depth for better lookahead
    const moveCount = board.reduce((count, row) => 
        count + row.reduce((rowCount, cell) => 
            rowCount + (cell.player !== -1 ? 1 : 0), 0), 0);
            
    const { move } = minimax(board, maxDepth, true, -Infinity, Infinity, config, aiPlayer, moveCount);
    
    // If no move is found (shouldn't happen in normal gameplay), return first available move
    if (!move) {
        const availableMoves = getAvailableMoves(board, config);
        return availableMoves[0];
    }
    
    return move;
};