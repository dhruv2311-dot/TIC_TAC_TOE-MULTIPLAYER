'use client';

import { getWinningPositions } from '@/utils/gameLogic';

export default function GameBoard({ board, onCellClick, disabled }) {
  const winningPositions = getWinningPositions(board);

  const handleCellClick = (index) => {
    if (disabled || board[index] !== '') {
      return;
    }
    onCellClick(index);
  };

  return (
    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto p-6 gaming-card">
      {board.map((cell, index) => {
        const isWinningCell = winningPositions?.includes(index);
        const isTaken = cell !== '';

        return (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={disabled || isTaken}
            className={`
              aspect-square flex items-center justify-center
              text-6xl font-black rounded-xl
              transition-all duration-300
              ${isTaken ? 'cell-taken' : 'cell-hover'}
              ${isWinningCell ? 'winning-cell' : ''}
              ${!disabled && !isTaken ? 'hover:scale-110' : ''}
              ${cell === 'X' ? 'text-cyan-400 neon-text' : cell === 'O' ? 'text-pink-400 neon-text' : ''}
              relative
            `}
          >
            {cell && (
              <span className="relative z-10 drop-shadow-[0_0_15px_currentColor]">
                {cell}
              </span>
            )}
            {!isTaken && !disabled && (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}
