import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/lib/models/Game';
import Player from '@/lib/models/Player';

// POST /api/games/[gameId]/join - Join an open game
export async function POST(request, { params }) {
  try {
    await connectDB();
    const { gameId } = params;
    const body = await request.json();
    const { playerId } = body;

    if (!playerId) {
      return NextResponse.json(
        { success: false, error: 'Player ID is required' },
        { status: 400 }
      );
    }

    // Verify player exists
    const player = await Player.findById(playerId);
    if (!player) {
      return NextResponse.json(
        { success: false, error: 'Player not found' },
        { status: 404 }
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

    // Check if game is open
    if (game.status !== 'open') {
      return NextResponse.json(
        { success: false, error: 'Game is not open for joining' },
        { status: 400 }
      );
    }

    // Check if player is trying to join their own game
    if (game.player1.toString() === playerId) {
      return NextResponse.json(
        { success: false, error: 'Cannot join your own game' },
        { status: 400 }
      );
    }

    // Update game with player2 and set status to active
    game.player2 = playerId;
    game.status = 'active';
    await game.save();

    const updatedGame = await Game.findById(gameId)
      .populate('player1', 'username')
      .populate('player2', 'username')
      .populate('currentTurn', 'username');

    return NextResponse.json({ 
      success: true, 
      data: updatedGame 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
