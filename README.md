# Tic Tac Toe Multiplayer - Next.js & MongoDB

A full-stack multiplayer Tic Tac Toe game built with Next.js 14 (App Router) and MongoDB Atlas.

## Features

- **Two-player gameplay** with real-time move validation
- **MongoDB Atlas** for persistent data storage
- **Player statistics** tracking (wins, losses, draws)
- **Game history** with replay functionality
- **Global leaderboard** ranked by wins
- **Multiple rendering strategies**: SSR, CSR, SSG, and ISR
- **SEO optimized** with proper metadata

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: MongoDB Atlas
- **ORM**: Mongoose
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account and cluster

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tic-tac-toe-multiplayer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your MongoDB Atlas connection URI:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/tictactoe?retryWrites=true&w=majority
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string and add it to `.env.local`

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── players/      # Player endpoints
│   │   ├── games/        # Game endpoints
│   │   └── history/      # History endpoints
│   ├── game/[gameId]/    # Game board (CSR)
│   ├── leaderboard/      # Leaderboard (SSR)
│   ├── history/          # Game history (ISR)
│   ├── layout.js         # Root layout
│   └── page.js           # Home page (SSG)
├── lib/
│   ├── mongodb.js        # MongoDB connection
│   └── models/           # Mongoose models
├── components/           # React components
└── utils/               # Utility functions
```

## Rendering Strategies

- **SSG (Static Site Generation)**: Home page (`/`) - Static content with game instructions
- **CSR (Client-Side Rendering)**: Game board (`/game/[gameId]`) - Dynamic gameplay updates
- **SSR (Server-Side Rendering)**: Leaderboard (`/leaderboard`) - Real-time rankings
- **ISR (Incremental Static Regeneration)**: History (`/history`) - Periodically revalidated data

## API Endpoints

### Players
- `GET /api/players` - Fetch all players
- `POST /api/players` - Create new player

### Games
- `POST /api/games` - Create new game
- `GET /api/games/open` - Fetch open games
- `GET /api/games/[gameId]` - Fetch game details
- `POST /api/games/[gameId]/join` - Join a game
- `POST /api/games/[gameId]/move` - Submit a move

### History
- `GET /api/history/[playerId]` - Fetch player's game history

## Database Schema

### Players Collection
```javascript
{
  username: String (unique),
  wins: Number,
  losses: Number,
  draws: Number
}
```

### Games Collection
```javascript
{
  player1: ObjectId (ref: Player),
  player2: ObjectId (ref: Player),
  status: String ('open' | 'active' | 'finished'),
  winner: ObjectId (ref: Player, optional),
  createdAt: Date,
  endedAt: Date
}
```

### Moves Collection
```javascript
{
  gameId: ObjectId (ref: Game),
  playerId: ObjectId (ref: Player),
  position: Number (0-8),
  timestamp: Date
}
```

## License

MIT
