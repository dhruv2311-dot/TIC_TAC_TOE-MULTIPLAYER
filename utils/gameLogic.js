/**
 * Check if there's a winner on the board
 * @param {Array} board - Array of 9 elements representing the board
 * @returns {string|null} - 'X', 'O', or null if no winner
 */
export function checkWinner(board) {
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

/**
 * Check if the board is full (draw)
 * @param {Array} board - Array of 9 elements representing the board
 * @returns {boolean} - true if board is full, false otherwise
 */
export function isBoardFull(board) {
  return board.every(cell => cell !== '');
}

/**
 * Check if the game is over
 * @param {Array} board - Array of 9 elements representing the board
 * @returns {Object} - { isOver: boolean, winner: string|null, isDraw: boolean }
 */
export function checkGameOver(board) {
  const winner = checkWinner(board);
  const isDraw = !winner && isBoardFull(board);
  
  return {
    isOver: winner !== null || isDraw,
    winner,
    isDraw,
  };
}

/**
 * Get winning positions if there's a winner
 * @param {Array} board - Array of 9 elements representing the board
 * @returns {Array|null} - Array of winning positions or null
 */
export function getWinningPositions(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combination;
    }
  }

  return null;
}
