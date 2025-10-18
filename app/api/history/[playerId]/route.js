import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/lib/models/Game';

// GET /api/history/[playerId] - Fetch player's game history
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { playerId } = params;

    // Find all games where the player participated
    const games = await Game.find({
      $or: [
        { player1: playerId },
        { player2: playerId }
      ],
      status: 'finished'
    })
      .populate('player1', 'username')
      .populate('player2', 'username')
      .populate('winner', 'username')
      .sort({ endedAt: -1 })
      .limit(50);

    return NextResponse.json({ 
      success: true, 
      data: games 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
