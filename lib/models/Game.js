import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    default: null,
  },
  status: {
    type: String,
    enum: ['open', 'active', 'finished'],
    default: 'open',
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    default: null,
  },
  board: {
    type: [String],
    default: ['', '', '', '', '', '', '', '', ''],
  },
  currentTurn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: {
    type: Date,
    default: null,
  },
});

// Add index for faster queries
GameSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Game || mongoose.model('Game', GameSchema);
