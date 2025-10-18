# Testing Guide

This guide provides comprehensive testing instructions for the Tic Tac Toe multiplayer application.

## Table of Contents
1. [Manual Testing](#manual-testing)
2. [Feature Testing](#feature-testing)
3. [API Testing](#api-testing)
4. [Browser Testing](#browser-testing)
5. [Performance Testing](#performance-testing)
6. [Security Testing](#security-testing)

---

## Manual Testing

### Prerequisites
- Application running locally (`npm run dev`)
- MongoDB Atlas connection configured
- Two browser windows/tabs available

### Test Environment Setup

1. **Clear Previous Data**
   - Open MongoDB Atlas
   - Navigate to Collections
   - Clear all collections (optional for fresh start)

2. **Clear Browser Storage**
   ```javascript
   // In browser console
   localStorage.clear();
   sessionStorage.clear();
   ```

---

## Feature Testing

### 1. Player Creation

#### Test Case 1.1: Create Valid Player
**Steps:**
1. Navigate to home page (`/`)
2. Enter username: "TestPlayer1" (3-20 characters)
3. Click "Create Player"

**Expected Result:**
- ✅ Success message or player profile displayed
- ✅ Player saved to localStorage
- ✅ "Create New Game" button becomes available
- ✅ Player stored in MongoDB

#### Test Case 1.2: Invalid Username (Too Short)
**Steps:**
1. Enter username: "ab" (less than 3 characters)
2. Click "Create Player"

**Expected Result:**
- ❌ Error message: "Username must be at least 3 characters"
- ❌ Player not created

#### Test Case 1.3: Invalid Username (Too Long)
**Steps:**
1. Enter username: "ThisIsAVeryLongUsernameThatExceedsTwentyCharacters"
2. Click "Create Player"

**Expected Result:**
- ❌ Error message displayed
- ❌ Player not created

#### Test Case 1.4: Duplicate Username
**Steps:**
1. Create player "TestPlayer1"
2. Clear localStorage
3. Try to create "TestPlayer1" again

**Expected Result:**
- ✅ Returns existing player data
- ✅ Message: "Player already exists"

---

### 2. Game Creation

#### Test Case 2.1: Create New Game
**Steps:**
1. Create player "Player1"
2. Click "Create New Game"

**Expected Result:**
- ✅ Redirected to `/game/[gameId]`
- ✅ Game board displayed
- ✅ Status shows "Waiting for another player to join..."
- ✅ Player1 shown as Player 1 (X)
- ✅ Player 2 shows "Waiting..."

#### Test Case 2.2: Create Game Without Login
**Steps:**
1. Clear localStorage
2. Try to create a game (if possible)

**Expected Result:**
- ❌ Error message: "Please create a player first"
- ❌ Game not created

---

### 3. Joining Games

#### Test Case 3.1: Join Open Game
**Steps:**
1. Window 1: Create "Player1" and create a game
2. Window 2: Create "Player2"
3. Window 2: Click "Join Game" on Player1's game

**Expected Result:**
- ✅ Window 2 redirected to game board
- ✅ Both windows show active game
- ✅ Game status changes to "active"
- ✅ Player1's turn indicator shows

#### Test Case 3.2: Join Own Game
**Steps:**
1. Create player and game
2. Try to join your own game

**Expected Result:**
- ❌ Error: "Cannot join your own game"
- ❌ Game remains open

#### Test Case 3.3: Join Already Active Game
**Steps:**
1. Create game with 2 players (active)
2. Window 3: Try to join the same game

**Expected Result:**
- ❌ Error: "Game is not open for joining"
- ❌ Cannot join

---

### 4. Gameplay

#### Test Case 4.1: Valid Move
**Steps:**
1. Start game with 2 players
2. Player1 (X) clicks empty cell

**Expected Result:**
- ✅ X appears in clicked cell
- ✅ Turn switches to Player2
- ✅ Move saved to database
- ✅ Move appears in move history

#### Test Case 4.2: Invalid Move (Not Your Turn)
**Steps:**
1. Start game with 2 players
2. Player2 tries to move on Player1's turn

**Expected Result:**
- ❌ Error: "Not your turn"
- ❌ Cell remains empty
- ❌ Turn doesn't change

#### Test Case 4.3: Invalid Move (Cell Taken)
**Steps:**
1. Player1 marks a cell
2. Player2 tries to mark the same cell

**Expected Result:**
- ❌ Cell not clickable (cursor: not-allowed)
- ❌ No move registered
- ❌ Turn remains with Player2

#### Test Case 4.4: Win Condition - Horizontal
**Steps:**
1. Play moves to create horizontal win:
   - Player1 (X): positions 0, 1, 2

**Expected Result:**
- ✅ Game status: "finished"
- ✅ Winner announced: "Player1 wins! 🎉"
- ✅ Winning cells highlighted
- ✅ No more moves allowed
- ✅ Player1 wins +1 in database
- ✅ Player2 losses +1 in database

#### Test Case 4.5: Win Condition - Vertical
**Steps:**
1. Play moves to create vertical win:
   - Player1 (X): positions 0, 3, 6

**Expected Result:**
- ✅ Same as Test Case 4.4

#### Test Case 4.6: Win Condition - Diagonal
**Steps:**
1. Play moves to create diagonal win:
   - Player1 (X): positions 0, 4, 8

**Expected Result:**
- ✅ Same as Test Case 4.4

#### Test Case 4.7: Draw Game
**Steps:**
1. Play moves to fill board with no winner:
   ```
   X | O | X
   X | O | O
   O | X | X
   ```

**Expected Result:**
- ✅ Game status: "finished"
- ✅ Message: "It's a draw!"
- ✅ Both players draws +1 in database
- ✅ No winner declared

---

### 5. Leaderboard

#### Test Case 5.1: View Leaderboard
**Steps:**
1. Create multiple players and play games
2. Navigate to `/leaderboard`

**Expected Result:**
- ✅ All players displayed
- ✅ Sorted by wins (descending)
- ✅ Statistics shown: wins, losses, draws, total games, win rate
- ✅ Top 3 players have special badges
- ✅ Win rate progress bars displayed

#### Test Case 5.2: Empty Leaderboard
**Steps:**
1. Clear database
2. Navigate to `/leaderboard`

**Expected Result:**
- ✅ Message: "No players yet. Be the first to play!"
- ✅ No error displayed

#### Test Case 5.3: Leaderboard Updates
**Steps:**
1. View leaderboard
2. Play a game in another tab
3. Refresh leaderboard

**Expected Result:**
- ✅ Statistics updated
- ✅ Rankings may change
- ✅ New win/loss reflected

---

### 6. Game History

#### Test Case 6.1: View Personal History
**Steps:**
1. Login as player with completed games
2. Navigate to `/history`

**Expected Result:**
- ✅ All completed games displayed
- ✅ Statistics summary shown
- ✅ Games sorted by date (newest first)
- ✅ Result badges (Win/Loss/Draw) displayed
- ✅ Opponent names shown

#### Test Case 6.2: Empty History
**Steps:**
1. Create new player
2. Navigate to `/history`

**Expected Result:**
- ✅ Message: "No games played yet"
- ✅ Button: "Play Now"
- ✅ Statistics show all zeros

#### Test Case 6.3: History Without Login
**Steps:**
1. Clear localStorage
2. Navigate to `/history`

**Expected Result:**
- ✅ Redirected to home page
- ✅ Prompt to create player

---

### 7. Game Replay

#### Test Case 7.1: View Replay
**Steps:**
1. Complete a game
2. Go to history
3. Click "View Replay"

**Expected Result:**
- ✅ Redirected to `/history/[gameId]`
- ✅ Empty board shown initially
- ✅ Player names and result displayed
- ✅ Move list shown with timestamps
- ✅ Playback controls available

#### Test Case 7.2: Replay Controls - Play
**Steps:**
1. Open replay
2. Click Play button

**Expected Result:**
- ✅ Moves play automatically (1 per second)
- ✅ Board updates with each move
- ✅ Progress bar advances
- ✅ Current move highlighted in list

#### Test Case 7.3: Replay Controls - Pause
**Steps:**
1. Start playing replay
2. Click Pause button

**Expected Result:**
- ✅ Playback stops
- ✅ Board frozen at current state
- ✅ Can resume from same position

#### Test Case 7.4: Replay Controls - Next/Previous
**Steps:**
1. Open replay
2. Click Next button multiple times
3. Click Previous button

**Expected Result:**
- ✅ Board advances one move per click
- ✅ Board goes back one move per click
- ✅ Move list updates accordingly

#### Test Case 7.5: Replay Controls - Reset
**Steps:**
1. Play through some moves
2. Click Reset button

**Expected Result:**
- ✅ Board clears to empty state
- ✅ Progress bar resets to 0
- ✅ Move counter shows 0 of X

#### Test Case 7.6: Replay Controls - Skip to End
**Steps:**
1. Open replay
2. Click Skip to End button

**Expected Result:**
- ✅ Board shows final state
- ✅ Progress bar at 100%
- ✅ Last move highlighted

#### Test Case 7.7: Click Move in List
**Steps:**
1. Open replay
2. Click any move in the move list

**Expected Result:**
- ✅ Board jumps to that move state
- ✅ Selected move highlighted
- ✅ Progress bar updates

---

## API Testing

### Using Browser Console or Postman

#### Test API 1: Create Player
```javascript
// POST /api/players
fetch('/api/players', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'APITestPlayer' })
})
.then(r => r.json())
.then(console.log);

// Expected: { success: true, data: { _id, username, wins, losses, draws } }
```

#### Test API 2: Get All Players
```javascript
// GET /api/players
fetch('/api/players')
.then(r => r.json())
.then(console.log);

// Expected: { success: true, data: [...players] }
```

#### Test API 3: Create Game
```javascript
// POST /api/games
fetch('/api/games', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ playerId: 'PLAYER_ID_HERE' })
})
.then(r => r.json())
.then(console.log);

// Expected: { success: true, data: { _id, player1, status: 'open', ... } }
```

#### Test API 4: Get Open Games
```javascript
// GET /api/games/open
fetch('/api/games/open')
.then(r => r.json())
.then(console.log);

// Expected: { success: true, data: [...openGames] }
```

#### Test API 5: Join Game
```javascript
// POST /api/games/[gameId]/join
fetch('/api/games/GAME_ID_HERE/join', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ playerId: 'PLAYER_ID_HERE' })
})
.then(r => r.json())
.then(console.log);

// Expected: { success: true, data: { ...game, status: 'active' } }
```

#### Test API 6: Make Move
```javascript
// POST /api/games/[gameId]/move
fetch('/api/games/GAME_ID_HERE/move', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ playerId: 'PLAYER_ID_HERE', position: 0 })
})
.then(r => r.json())
.then(console.log);

// Expected: { success: true, data: { ...game }, gameOver: false }
```

#### Test API 7: Get Game Details
```javascript
// GET /api/games/[gameId]
fetch('/api/games/GAME_ID_HERE')
.then(r => r.json())
.then(console.log);

// Expected: { success: true, data: { game: {...}, moves: [...] } }
```

#### Test API 8: Get Player History
```javascript
// GET /api/history/[playerId]
fetch('/api/history/PLAYER_ID_HERE')
.then(r => r.json())
.then(console.log);

// Expected: { success: true, data: [...games] }
```

---

## Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] iOS Safari
- [ ] Chrome Mobile (Android)
- [ ] Samsung Internet

### Test Checklist for Each Browser
- [ ] Pages load correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] Game board responsive
- [ ] Buttons clickable
- [ ] Styles render correctly
- [ ] No console errors

---

## Performance Testing

### Page Load Times
Test with browser DevTools (Network tab):

1. **Home Page**
   - Target: < 2 seconds
   - Check: First Contentful Paint

2. **Leaderboard**
   - Target: < 3 seconds (SSR)
   - Check: Time to Interactive

3. **Game Board**
   - Target: < 2 seconds
   - Check: Client-side rendering time

4. **History**
   - Target: < 2 seconds
   - Check: Data fetching time

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

**Target Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Network Performance
- Test on slow 3G
- Test on fast 4G
- Test on WiFi
- Check bundle size (< 500KB)

---

## Security Testing

### Input Validation
- [ ] SQL injection attempts (N/A - using MongoDB)
- [ ] XSS attempts in username
- [ ] Long input strings
- [ ] Special characters
- [ ] Empty inputs
- [ ] Null values

### API Security
- [ ] Test without authentication
- [ ] Test with invalid IDs
- [ ] Test with malformed requests
- [ ] Test rate limiting (if implemented)

### Data Validation
- [ ] Invalid game IDs
- [ ] Invalid player IDs
- [ ] Invalid positions (< 0 or > 8)
- [ ] Invalid game status transitions

---

## Regression Testing

After any code changes, test:
1. Player creation
2. Game creation
3. Joining games
4. Making moves
5. Winning a game
6. Drawing a game
7. Viewing leaderboard
8. Viewing history
9. Viewing replay

---

## Test Data

### Sample Players
```javascript
const testPlayers = [
  { username: 'Alice' },
  { username: 'Bob' },
  { username: 'Charlie' },
  { username: 'Diana' },
  { username: 'Eve' }
];
```

### Sample Game Scenarios

**Scenario 1: Quick Win**
```
Moves: [0, 3, 1, 4, 2]
Result: Player1 (X) wins horizontally
```

**Scenario 2: Draw**
```
Moves: [0, 1, 2, 3, 4, 8, 5, 6, 7]
Result: Draw
```

**Scenario 3: Diagonal Win**
```
Moves: [0, 1, 4, 2, 8]
Result: Player1 (X) wins diagonally
```

---

## Bug Reporting Template

When you find a bug, report it with:

```markdown
**Title:** Brief description

**Severity:** Critical / High / Medium / Low

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:**
What should happen

**Actual Result:**
What actually happens

**Screenshots:**
(if applicable)

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Date: 2024-01-15

**Additional Notes:**
Any other relevant information
```

---

## Testing Checklist

### Before Release
- [ ] All features tested manually
- [ ] All API endpoints tested
- [ ] Cross-browser testing complete
- [ ] Mobile responsive testing done
- [ ] Performance benchmarks met
- [ ] Security checks passed
- [ ] No console errors
- [ ] Database queries optimized
- [ ] Error handling verified
- [ ] User flows tested end-to-end

### After Release
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify database operations
- [ ] Test with real users
- [ ] Collect feedback
- [ ] Address critical issues

---

## Automated Testing (Future Enhancement)

Consider adding:
- **Unit Tests**: Jest for utility functions
- **Integration Tests**: Testing API routes
- **E2E Tests**: Playwright or Cypress
- **Visual Regression**: Percy or Chromatic

---

## Conclusion

Thorough testing ensures a reliable and enjoyable user experience. Follow this guide systematically and document any issues found. Happy testing! 🧪
