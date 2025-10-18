import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/lib/models/Game';
import Move from '@/lib/models/Move';
import Player from '@/lib/models/Player';
import { checkGameOver } from '@/utils/gameLogic';

// POST /api/games/[gameId]/move - Submit a move
export async function POST(request, { params }) {
  try {
    await connectDB();
    const { gameId } = params;
    const body = await request.json();
    const { playerId, position } = body;

    // Validate input
    if (!playerId || position === undefined) {
      return NextResponse.json(
        { success: false, error: 'Player ID and position are required' },
        { status: 400 }
      );
    }

    if (position < 0 || position > 8) {
      return NextResponse.json(
        { success: false, error: 'Invalid position' },
        { status: 400 }
      );
    }

    // Find the game
    const game = await Game.findById(gameId);
    if (!game) {
      return NextResponse.json(
        { success: false, error: 'Game not found' },
        { status: 404 }
      );
    }

    // Check if game is active
    if (game.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'Game is not active' },
        { status: 400 }
      );
    }

    // Check if it's the player's turn
    if (game.currentTurn.toString() !== playerId) {
      return NextResponse.json(
        { success: false, error: 'Not your turn' },
        { status: 400 }
      );
    }

    // Check if position is already taken
    if (game.board[position] !== '') {
      return NextResponse.json(
        { success: false, error: 'Position already taken' },
        { status: 400 }
      );
    }

    // Determine player's symbol
    const symbol = game.player1.toString() === playerId ? 'X' : 'O';

    // Update board
    game.board[position] = symbol;

    // Save move to database
    await Move.create({
      gameId,
      playerId,
      position,
      symbol,
    });

    // Check if game is over
    const gameStatus = checkGameOver(game.board);

    if (gameStatus.isOver) {
      game.status = 'finished';
      game.endedAt = new Date();

      if (gameStatus.winner) {
        // Determine winner
        const winnerId = symbol === gameStatus.winner ? playerId : 
          (game.player1.toString() === playerId ? game.player2 : game.player1);
        game.winner = winnerId;

        // Update player stats
        await Player.findByIdAndUpdate(winnerId, { $inc: { wins: 1 } });
        const loserId = winnerId.toString() === game.player1.toString() ? 
          game.player2 : game.player1;
        await Player.findByIdAndUpdate(loserId, { $inc: { losses: 1 } });
      } else if (gameStatus.isDraw) {
        // Update both players' draw count
        await Player.findByIdAndUpdate(game.player1, { $inc: { draws: 1 } });
        await Player.findByIdAndUpdate(game.player2, { $inc: { draws: 1 } });
      }
    } else {
      // Switch turn
      game.currentTurn = game.player1.toString() === playerId ? 
        game.player2 : game.player1;
    }

    await game.save();

    // Fetch updated game with populated fields
    const updatedGame = await Game.findById(gameId)
      .populate('player1', 'username')
      .populate('player2', 'username')
      .populate('winner', 'username')
      .populate('currentTurn', 'username');

    return NextResponse.json({ 
      success: true, 
      data: updatedGame,
      gameOver: gameStatus.isOver,
      winner: gameStatus.winner,
      isDraw: gameStatus.isDraw,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
