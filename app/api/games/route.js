import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/lib/models/Game';
import Player from '@/lib/models/Player';

// POST /api/games - Create a new game
export async function POST(request) {
  try {
    await connectDB();
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

    // Create new game
    const game = await Game.create({
      player1: playerId,
      status: 'open',
      currentTurn: playerId,
    });

    const populatedGame = await Game.findById(game._id)
      .populate('player1', 'username')
      .populate('player2', 'username');

    return NextResponse.json(
      { success: true, data: populatedGame },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
