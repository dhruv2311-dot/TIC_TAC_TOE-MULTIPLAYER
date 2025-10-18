# Setup Guide - Tic Tac Toe Multiplayer

This guide will walk you through setting up the Tic Tac Toe multiplayer application from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- A **MongoDB Atlas** account ([Sign up](https://www.mongodb.com/cloud/atlas/register))

## Step 1: MongoDB Atlas Setup

### 1.1 Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Verify your email address

### 1.2 Create a New Cluster
1. Click "Build a Database"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Click "Create Cluster" (this may take 3-5 minutes)

### 1.3 Create a Database User
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username (e.g., `tictactoe_user`)
5. Generate a secure password (save it!)
6. Set privileges to "Read and write to any database"
7. Click "Add User"

### 1.4 Configure Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note**: For production, restrict to specific IP addresses
4. Click "Confirm"

### 1.5 Get Your Connection String
1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as the driver
5. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` with your database username
7. Replace `<password>` with your database password
8. Add `/tictactoe` after `.net` to specify the database name:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tictactoe?retryWrites=true&w=majority
   ```

## Step 2: Project Setup

### 2.1 Install Dependencies
Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- Mongoose
- Tailwind CSS
- Lucide React (icons)

### 2.2 Configure Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tictactoe?retryWrites=true&w=majority
   ```

   **Important**: Never commit `.env.local` to version control!

## Step 3: Run the Application

### 3.1 Development Mode
Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 3.2 Build for Production
To create an optimized production build:

```bash
npm run build
npm start
```

## Step 4: Verify Installation

### 4.1 Test Database Connection
1. Open the application in your browser
2. Enter a username and click "Create Player"
3. If successful, the database connection is working!

### 4.2 Test Game Creation
1. After creating a player, click "Create New Game"
2. You should be redirected to the game board
3. Open another browser window (or incognito mode)
4. Create a different player and join the game

## Project Structure

```
tic-tac-toe-multiplayer/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── players/          # Player endpoints
│   │   ├── games/            # Game endpoints
│   │   └── history/          # History endpoints
│   ├── game/[gameId]/        # Game board page (CSR)
│   ├── leaderboard/          # Leaderboard page (SSR)
│   ├── history/              # History pages (ISR)
│   ├── layout.js             # Root layout
│   ├── page.js               # Home page (SSG)
│   ├── globals.css           # Global styles
│   ├── loading.js            # Loading component
│   └── not-found.js          # 404 page
├── components/               # React components
│   ├── Navigation.js         # Navigation bar
│   ├── GameLobby.js          # Game lobby component
│   └── GameBoard.js          # Game board component
├── lib/                      # Library code
│   ├── mongodb.js            # MongoDB connection
│   └── models/               # Mongoose models
│       ├── Player.js         # Player model
│       ├── Game.js           # Game model
│       └── Move.js           # Move model
├── utils/                    # Utility functions
│   └── gameLogic.js          # Game logic utilities
├── public/                   # Static assets
├── .env.local                # Environment variables (create this)
├── .env.local.example        # Environment template
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── next.config.js            # Next.js configuration
└── README.md                 # Project documentation
```

## Rendering Strategies Explained

### 1. Static Site Generation (SSG) - Home Page (`/`)
- **File**: `app/page.js`
- **How it works**: Page is pre-rendered at build time
- **Use case**: Static content like instructions and features
- **Benefits**: Fastest page load, great for SEO

### 2. Server-Side Rendering (SSR) - Leaderboard (`/leaderboard`)
- **File**: `app/leaderboard/page.js`
- **How it works**: Page is rendered on the server for each request
- **Use case**: Real-time data that changes frequently
- **Benefits**: Always shows latest data, good for SEO

### 3. Client-Side Rendering (CSR) - Game Board (`/game/[gameId]`)
- **File**: `app/game/[gameId]/page.js`
- **How it works**: Page is rendered in the browser using JavaScript
- **Use case**: Interactive features requiring real-time updates
- **Benefits**: Highly interactive, can poll for updates

### 4. Incremental Static Regeneration (ISR) - History (`/history`)
- **File**: `app/history/page.js`
- **How it works**: Static page that regenerates periodically
- **Use case**: Data that changes but doesn't need real-time updates
- **Benefits**: Fast like SSG but stays relatively fresh

## Database Schema

### Players Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, 3-20 chars),
  wins: Number (default: 0),
  losses: Number (default: 0),
  draws: Number (default: 0),
  createdAt: Date
}
```

### Games Collection
```javascript
{
  _id: ObjectId,
  player1: ObjectId (ref: Player),
  player2: ObjectId (ref: Player, nullable),
  status: String ('open' | 'active' | 'finished'),
  winner: ObjectId (ref: Player, nullable),
  board: Array[9] (game state),
  currentTurn: ObjectId (ref: Player),
  createdAt: Date,
  endedAt: Date (nullable)
}
```

### Moves Collection
```javascript
{
  _id: ObjectId,
  gameId: ObjectId (ref: Game),
  playerId: ObjectId (ref: Player),
  position: Number (0-8),
  symbol: String ('X' | 'O'),
  timestamp: Date
}
```

## API Endpoints

### Players
- `GET /api/players` - Get all players
- `POST /api/players` - Create new player
  ```json
  { "username": "player1" }
  ```

### Games
- `POST /api/games` - Create new game
  ```json
  { "playerId": "player_id" }
  ```
- `GET /api/games/open` - Get all open games
- `GET /api/games/[gameId]` - Get game details
- `POST /api/games/[gameId]/join` - Join a game
  ```json
  { "playerId": "player_id" }
  ```
- `POST /api/games/[gameId]/move` - Make a move
  ```json
  { "playerId": "player_id", "position": 0 }
  ```

### History
- `GET /api/history/[playerId]` - Get player's game history

## Troubleshooting

### MongoDB Connection Issues
**Problem**: "MongooseError: The `uri` parameter to `openUri()` must be a string"
- **Solution**: Check that `MONGODB_URI` is set in `.env.local`

**Problem**: "MongoNetworkError: failed to connect to server"
- **Solution**: Verify your IP address is whitelisted in MongoDB Atlas Network Access

**Problem**: "MongoServerError: bad auth"
- **Solution**: Check your username and password in the connection string

### Application Issues
**Problem**: "Module not found" errors
- **Solution**: Run `npm install` again

**Problem**: Page not updating
- **Solution**: Clear browser cache or use incognito mode

**Problem**: Styles not loading
- **Solution**: Restart the development server

## Development Tips

### Testing Multiplayer
1. Open the app in a normal browser window
2. Create a player and start a game
3. Open an incognito/private window
4. Create a different player and join the game
5. Play by switching between windows

### Viewing Database
1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections"
3. View your `tictactoe` database
4. Explore `players`, `games`, and `moves` collections

### Hot Reload
Next.js supports hot reload - save any file and see changes instantly!

## Next Steps

- Deploy to Vercel or Netlify
- Add real-time updates with WebSockets
- Implement user authentication
- Add game rooms and private games
- Create tournament mode
- Add sound effects and animations

## Support

For issues or questions:
1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Review [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
3. Check [Mongoose Documentation](https://mongoosejs.com/docs/)

## License

MIT License - Feel free to use this project for learning and development!
