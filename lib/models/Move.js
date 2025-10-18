import mongoose from 'mongoose';

const MoveSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  position: {
    type: Number,
    required: true,
    min: 0,
    max: 8,
  },
  symbol: {
    type: String,
    enum: ['X', 'O'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Add compound index for faster queries
MoveSchema.index({ gameId: 1, timestamp: 1 });

export default mongoose.models.Move || mongoose.model('Move', MoveSchema);
