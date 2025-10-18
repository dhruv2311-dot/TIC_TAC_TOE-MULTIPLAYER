# Architecture Documentation

This document provides a comprehensive overview of the Tic Tac Toe multiplayer application architecture.

## Table of Contents
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Data Flow](#data-flow)
5. [Database Design](#database-design)
6. [API Architecture](#api-architecture)
7. [Frontend Architecture](#frontend-architecture)
8. [Rendering Strategies](#rendering-strategies)
9. [State Management](#state-management)
10. [Security Considerations](#security-considerations)

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client (Browser)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Home Page   │  │  Game Board  │  │ Leaderboard  │      │
│  │    (SSG)     │  │    (CSR)     │  │    (SSR)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    App Router                         │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │   Pages    │  │    API     │  │ Components │    │  │
│  │  │  (Routes)  │  │  (Routes)  │  │            │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│                            │ Mongoose ODM                    │
│                            ▼                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Database Layer                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │  Player    │  │    Game    │  │    Move    │    │  │
│  │  │   Model    │  │   Model    │  │   Model    │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ MongoDB Wire Protocol
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     MongoDB Atlas                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Players    │  │    Games     │  │    Moves     │     │
│  │  Collection  │  │  Collection  │  │  Collection  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

```
User Action → React Component → API Call → API Route → 
Database Query → MongoDB → Response → Update UI
```

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **Database**: MongoDB Atlas
- **ODM**: Mongoose 8

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Code Editor**: VS Code (recommended)

### Deployment
- **Hosting**: Vercel (recommended)
- **Database**: MongoDB Atlas (Cloud)
- **CDN**: Vercel Edge Network

---

## Project Structure

```
tic-tac-toe-multiplayer/
│
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── players/
│   │   │   └── route.js          # GET, POST /api/players
│   │   ├── games/
│   │   │   ├── route.js          # POST /api/games
│   │   │   ├── open/
│   │   │   │   └── route.js      # GET /api/games/open
│   │   │   └── [gameId]/
│   │   │       ├── route.js      # GET /api/games/:id
│   │   │       ├── join/
│   │   │       │   └── route.js  # POST /api/games/:id/join
│   │   │       └── move/
│   │   │           └── route.js  # POST /api/games/:id/move
│   │   └── history/
│   │       └── [playerId]/
│   │           └── route.js      # GET /api/history/:id
│   │
│   ├── game/
│   │   └── [gameId]/
│   │       └── page.js           # Game board page (CSR)
│   │
│   ├── leaderboard/
│   │   └── page.js               # Leaderboard page (SSR)
│   │
│   ├── history/
│   │   ├── page.js               # History list (ISR)
│   │   └── [gameId]/
│   │       └── page.js           # Game replay page
│   │
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page (SSG)
│   ├── globals.css               # Global styles
│   ├── loading.js                # Loading component
│   └── not-found.js              # 404 page
│
├── components/                   # React Components
│   ├── Navigation.js             # Navigation bar
│   ├── GameLobby.js              # Game lobby
│   └── GameBoard.js              # Game board
│
├── lib/                          # Library code
│   ├── mongodb.js                # MongoDB connection
│   └── models/                   # Mongoose models
│       ├── Player.js             # Player schema
│       ├── Game.js               # Game schema
│       └── Move.js               # Move schema
│
├── utils/                        # Utility functions
│   └── gameLogic.js              # Game logic utilities
│
├── public/                       # Static assets
│
├── .env.local                    # Environment variables (not in git)
├── .env.local.example            # Environment template
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
├── next.config.js                # Next.js configuration
├── jsconfig.json                 # JavaScript configuration
└── README.md                     # Project documentation
```

---

## Data Flow

### 1. Player Creation Flow

```
┌─────────────┐
│    User     │
│ enters name │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  GameLobby.js   │
│  handleCreate   │
└──────┬──────────┘
       │
       ▼
┌─────────────────────┐
│ POST /api/players   │
│  { username }       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Player.create()    │
│  Save to MongoDB    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Return player data │
│  Save to localStorage│
└─────────────────────┘
```

### 2. Game Creation Flow

```
┌─────────────┐
│    User     │
│ clicks      │
│ "Create"    │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  GameLobby.js   │
│  handleCreate   │
└──────┬──────────┘
       │
       ▼
┌─────────────────────┐
│ POST /api/games     │
│  { playerId }       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Game.create()      │
│  status: 'open'     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Redirect to        │
│  /game/[gameId]     │
└─────────────────────┘
```

### 3. Gameplay Flow

```
┌─────────────┐
│   Player    │
│ clicks cell │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  GameBoard.js       │
│  handleCellClick    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────┐
│ POST /api/games/:id/move│
│  { playerId, position } │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────┐
│  Validate move      │
│  - Right turn?      │
│  - Cell empty?      │
│  - Game active?     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Update game.board  │
│  Save Move record   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Check game over    │
│  - Winner?          │
│  - Draw?            │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Update stats       │
│  (if game over)     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Return updated     │
│  game state         │
└─────────────────────┘
```

---

## Database Design

### Entity Relationship Diagram

```
┌──────────────────┐
│     Player       │
│──────────────────│
│ _id (PK)         │
│ username (UQ)    │
│ wins             │
│ losses           │
│ draws            │
│ createdAt        │
└────────┬─────────┘
         │
         │ 1:N
         │
┌────────▼─────────┐
│      Game        │
│──────────────────│
│ _id (PK)         │
│ player1 (FK)     │◄───┐
│ player2 (FK)     │    │
│ status           │    │
│ winner (FK)      │────┘
│ board [9]        │
│ currentTurn (FK) │
│ createdAt        │
│ endedAt          │
└────────┬─────────┘
         │
         │ 1:N
         │
┌────────▼─────────┐
│      Move        │
│──────────────────│
│ _id (PK)         │
│ gameId (FK)      │
│ playerId (FK)    │
│ position         │
│ symbol           │
│ timestamp        │
└──────────────────┘
```

### Collection Schemas

#### Players Collection
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  username: "Alice",
  wins: 5,
  losses: 3,
  draws: 2,
  createdAt: ISODate("2024-01-15T10:30:00Z")
}
```

#### Games Collection
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  player1: ObjectId("507f1f77bcf86cd799439011"),
  player2: ObjectId("507f1f77bcf86cd799439013"),
  status: "finished",
  winner: ObjectId("507f1f77bcf86cd799439011"),
  board: ["X", "O", "X", "O", "X", "O", "X", "", ""],
  currentTurn: null,
  createdAt: ISODate("2024-01-15T11:00:00Z"),
  endedAt: ISODate("2024-01-15T11:05:00Z")
}
```

#### Moves Collection
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439014"),
  gameId: ObjectId("507f1f77bcf86cd799439012"),
  playerId: ObjectId("507f1f77bcf86cd799439011"),
  position: 0,
  symbol: "X",
  timestamp: ISODate("2024-01-15T11:00:30Z")
}
```

### Indexes

```javascript
// Players
db.players.createIndex({ username: 1 }, { unique: true })

// Games
db.games.createIndex({ status: 1, createdAt: -1 })
db.games.createIndex({ player1: 1 })
db.games.createIndex({ player2: 1 })

// Moves
db.moves.createIndex({ gameId: 1, timestamp: 1 })
```

---

## API Architecture

### RESTful Design Principles

#### Resource-Based URLs
- `/api/players` - Player resources
- `/api/games` - Game resources
- `/api/history` - History resources

#### HTTP Methods
- `GET` - Retrieve data
- `POST` - Create or update data

#### Response Format
```javascript
// Success
{
  success: true,
  data: { /* resource data */ }
}

// Error
{
  success: false,
  error: "Error message"
}
```

### API Endpoints

#### Player Endpoints

**GET /api/players**
- Purpose: Fetch all players
- Auth: None
- Response: Array of players

**POST /api/players**
- Purpose: Create new player
- Body: `{ username: string }`
- Response: Player object

#### Game Endpoints

**POST /api/games**
- Purpose: Create new game
- Body: `{ playerId: string }`
- Response: Game object

**GET /api/games/open**
- Purpose: Get open games
- Response: Array of open games

**GET /api/games/[gameId]**
- Purpose: Get game details
- Response: Game object with moves

**POST /api/games/[gameId]/join**
- Purpose: Join a game
- Body: `{ playerId: string }`
- Response: Updated game object

**POST /api/games/[gameId]/move**
- Purpose: Make a move
- Body: `{ playerId: string, position: number }`
- Response: Updated game object

#### History Endpoints

**GET /api/history/[playerId]**
- Purpose: Get player's game history
- Response: Array of finished games

---

## Frontend Architecture

### Component Hierarchy

```
App (layout.js)
│
├── Navigation
│
├── Home (page.js)
│   └── GameLobby
│
├── Game ([gameId]/page.js)
│   └── GameBoard
│
├── Leaderboard (page.js)
│
└── History
    ├── History List (page.js)
    └── Game Replay ([gameId]/page.js)
        └── GameBoard
```

### Component Responsibilities

#### Navigation.js
- Display navigation menu
- Highlight active route
- Handle navigation

#### GameLobby.js
- Player creation form
- Game creation button
- Open games list
- Join game functionality

#### GameBoard.js
- Display 3x3 grid
- Handle cell clicks
- Show winning cells
- Disable interaction when needed

---

## Rendering Strategies

### 1. Static Site Generation (SSG)

**Page**: Home (`/`)

**Implementation**:
```javascript
// No special config needed
export default function Home() {
  return <div>Static content</div>;
}
```

**Benefits**:
- Fastest page load
- Pre-rendered at build time
- Great for SEO
- Cached by CDN

**Use Case**: Static content that doesn't change frequently

---

### 2. Server-Side Rendering (SSR)

**Page**: Leaderboard (`/leaderboard`)

**Implementation**:
```javascript
export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  const players = await getLeaderboardData();
  return <div>{/* Render players */}</div>;
}
```

**Benefits**:
- Always fresh data
- Good for SEO
- Server-rendered HTML

**Use Case**: Real-time data that changes frequently

---

### 3. Client-Side Rendering (CSR)

**Page**: Game Board (`/game/[gameId]`)

**Implementation**:
```javascript
'use client';

export default function GamePage() {
  const [game, setGame] = useState(null);
  
  useEffect(() => {
    fetchGameData();
  }, []);
  
  return <div>{/* Render game */}</div>;
}
```

**Benefits**:
- Highly interactive
- Real-time updates
- Dynamic state management

**Use Case**: Interactive features requiring frequent updates

---

### 4. Incremental Static Regeneration (ISR)

**Page**: History (`/history`)

**Implementation**:
```javascript
'use client';

export default function HistoryPage() {
  // Client-side data fetching simulating ISR
  useEffect(() => {
    fetchHistory();
  }, []);
  
  return <div>{/* Render history */}</div>;
}
```

**Benefits**:
- Fast like SSG
- Periodically updated
- Balance of performance and freshness

**Use Case**: Data that changes but doesn't need real-time updates

---

## State Management

### Client-Side State

#### Local Component State
```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [data, setData] = useState(null);
```

#### LocalStorage
```javascript
// Save player
localStorage.setItem('player', JSON.stringify(player));

// Retrieve player
const player = JSON.parse(localStorage.getItem('player'));
```

### Server-Side State

#### MongoDB as Source of Truth
- All game state stored in database
- Client polls for updates
- Ensures consistency across clients

---

## Security Considerations

### Input Validation

#### Client-Side
```javascript
if (!username || username.length < 3) {
  setError('Username must be at least 3 characters');
  return;
}
```

#### Server-Side
```javascript
if (!body.username || body.username.trim().length < 3) {
  return NextResponse.json(
    { success: false, error: 'Invalid username' },
    { status: 400 }
  );
}
```

### Database Security

- Connection string in environment variables
- No credentials in code
- Network access restrictions in MongoDB Atlas
- Database user with limited permissions

### API Security

- Input validation on all endpoints
- Error messages don't expose internals
- Rate limiting (recommended for production)
- CORS configuration (if needed)

---

## Performance Optimizations

### Database
- Connection pooling
- Indexed queries
- Lean queries for read-only data
- Populated references in single query

### Frontend
- Component-based architecture
- Efficient re-rendering
- LocalStorage caching
- Code splitting (automatic with Next.js)

### Network
- API response caching
- CDN for static assets
- Optimized bundle size
- Lazy loading

---

## Scalability Considerations

### Horizontal Scaling
- Serverless functions (Vercel)
- Auto-scaling based on traffic
- No server management needed

### Database Scaling
- MongoDB Atlas auto-scaling
- Sharding for large datasets
- Read replicas for high traffic

### Caching Strategy
- Client-side: LocalStorage
- Server-side: MongoDB connection pool
- CDN: Static assets
- Future: Redis for session data

---

## Monitoring & Logging

### Application Monitoring
- Vercel Analytics (if deployed)
- Error tracking (Sentry recommended)
- Performance metrics

### Database Monitoring
- MongoDB Atlas dashboard
- Query performance
- Connection metrics
- Storage usage

---

## Future Architecture Improvements

### Real-Time Updates
- WebSocket integration
- Socket.io for live gameplay
- Eliminate polling

### Authentication
- JWT tokens
- Secure sessions
- Password hashing

### Microservices
- Separate game logic service
- Dedicated matchmaking service
- Analytics service

### Caching Layer
- Redis for session storage
- Cache frequently accessed data
- Reduce database load

---

## Conclusion

This architecture provides a solid foundation for a scalable, maintainable multiplayer game. The separation of concerns, clear data flow, and use of modern technologies ensure the application can grow and evolve with future requirements.
