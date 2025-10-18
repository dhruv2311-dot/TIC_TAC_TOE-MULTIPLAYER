import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters'],
  },
  wins: {
    type: Number,
    default: 0,
    min: 0,
  },
  losses: {
    type: Number,
    default: 0,
    min: 0,
  },
  draws: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add virtual for total games
PlayerSchema.virtual('totalGames').get(function() {
  return this.wins + this.losses + this.draws;
});

// Add virtual for win rate
PlayerSchema.virtual('winRate').get(function() {
  const total = this.totalGames;
  return total > 0 ? ((this.wins / total) * 100).toFixed(1) : 0;
});

// Ensure virtuals are included in JSON
PlayerSchema.set('toJSON', { virtuals: true });
PlayerSchema.set('toObject', { virtuals: true });

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema);
