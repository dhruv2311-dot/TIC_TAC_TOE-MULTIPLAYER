# Quick Start Guide

Get your Tic Tac Toe multiplayer game running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier)

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Set Up MongoDB Atlas (2 minutes)

### Create Account & Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free account
3. Create a free cluster (M0)
4. Wait for cluster to deploy

### Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Username: `tictactoe_user`
4. Password: Generate a secure password (save it!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### Whitelist IP Address
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Add `/tictactoe` after `.net` to specify database name

Example:
```
mongodb+srv://tictactoe_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/tictactoe?retryWrites=true&w=majority
```

## Step 3: Configure Environment (30 seconds)

Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://tictactoe_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/tictactoe?retryWrites=true&w=majority
```

## Step 4: Run the Application (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Test the Game (1 minute)

### Window 1 (Normal Browser)
1. Enter username: "Player1"
2. Click "Create Player"
3. Click "Create New Game"
4. Wait on game board

### Window 2 (Incognito/Private Window)
1. Enter username: "Player2"
2. Click "Create Player"
3. Click "Join Game" on Player1's game
4. Start playing!

## That's It! 🎉

You now have a fully functional multiplayer Tic Tac Toe game running locally.

## Next Steps

- Explore the [README.md](README.md) for detailed information
- Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for comprehensive setup instructions
- Check [FEATURES.md](FEATURES.md) to learn about all features
- Review [TESTING_GUIDE.md](TESTING_GUIDE.md) to test the application
- See [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to production

## Common Issues

### "Cannot connect to MongoDB"
- Check your connection string in `.env.local`
- Verify your IP is whitelisted in MongoDB Atlas
- Ensure your password is correct (no special characters that need encoding)

### "Module not found"
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### "Port 3000 already in use"
- Stop other applications using port 3000
- Or run on different port: `npm run dev -- -p 3001`

## Need Help?

- Check the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- Review [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common problems
- Open an issue on GitHub

## Project Structure

```
tic-tac-toe-multiplayer/
├── app/                  # Next.js pages and API routes
├── components/           # React components
├── lib/                  # Database models and utilities
├── utils/                # Helper functions
└── .env.local           # Your environment variables (create this)
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint (if configured)
```

## Features Overview

✅ **Two-player gameplay** - Play with friends in real-time  
✅ **Player statistics** - Track wins, losses, and draws  
✅ **Global leaderboard** - See top players ranked by wins  
✅ **Game history** - Review all your past games  
✅ **Game replay** - Watch move-by-move playback  
✅ **Responsive design** - Works on desktop and mobile  
✅ **Modern UI** - Beautiful interface with Tailwind CSS  

## Technology Stack

- **Next.js 14** - React framework with App Router
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## Learning Resources

This project demonstrates:
- ✅ **SSG** (Static Site Generation) - Home page
- ✅ **SSR** (Server-Side Rendering) - Leaderboard
- ✅ **CSR** (Client-Side Rendering) - Game board
- ✅ **ISR** (Incremental Static Regeneration) - History
- ✅ **SEO** optimization with metadata
- ✅ **RESTful API** design
- ✅ **MongoDB** integration
- ✅ **Responsive** design

Perfect for learning Next.js and MongoDB! 📚

---

**Happy Gaming! 🎮**
