import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/lib/models/Game';

// GET /api/games/open - Fetch all open games
export async function GET() {
  try {
    await connectDB();
    
    const openGames = await Game.find({ status: 'open' })
      .populate('player1', 'username')
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json({ 
      success: true, 
      data: openGames 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
