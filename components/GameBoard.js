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
    <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
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
              text-5xl font-bold rounded-lg
              transition-all duration-200
              ${isTaken ? 'cell-taken' : 'cell-hover'}
              ${isWinningCell ? 'winning-cell' : ''}
              ${!disabled && !isTaken ? 'hover:scale-105' : ''}
              ${cell === 'X' ? 'text-[var(--primary)]' : cell === 'O' ? 'text-[var(--danger)]' : ''}
            `}
          >
            {cell}
          </button>
        );
      })}
    </div>
  );
}
