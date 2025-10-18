import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/lib/models/Game';
import Move from '@/lib/models/Move';

// GET /api/games/[gameId] - Fetch game details
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { gameId } = params;

    const game = await Game.findById(gameId)
      .populate('player1', 'username')
      .populate('player2', 'username')
      .populate('winner', 'username')
      .populate('currentTurn', 'username');

    if (!game) {
      return NextResponse.json(
        { success: false, error: 'Game not found' },
        { status: 404 }
      );
    }

    // Fetch all moves for this game
    const moves = await Move.find({ gameId })
      .populate('playerId', 'username')
      .sort({ timestamp: 1 });

    return NextResponse.json({ 
      success: true, 
      data: { game, moves } 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
