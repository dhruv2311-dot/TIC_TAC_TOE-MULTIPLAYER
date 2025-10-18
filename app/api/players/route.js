import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Player from '@/lib/models/Player';

// GET /api/players - Fetch all players
export async function GET() {
  try {
    await connectDB();
    const players = await Player.find({}).sort({ wins: -1, createdAt: 1 });
    
    return NextResponse.json({ 
      success: true, 
      data: players 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/players - Create a new player
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { username } = body;

    if (!username || username.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Username must be at least 3 characters' },
        { status: 400 }
      );
    }

    // Check if player already exists
    const existingPlayer = await Player.findOne({ 
      username: username.trim() 
    });

    if (existingPlayer) {
      return NextResponse.json({ 
        success: true, 
        data: existingPlayer,
        message: 'Player already exists' 
      });
    }

    // Create new player
    const player = await Player.create({ 
      username: username.trim() 
    });

    return NextResponse.json(
      { success: true, data: player },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Username already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
