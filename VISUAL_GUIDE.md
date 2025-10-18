# Visual Guide - Tic Tac Toe Multiplayer

A visual walkthrough of the application's features and user interface.

## 🎨 Application Flow

### User Journey Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         START HERE                               │
│                              │                                   │
│                              ▼                                   │
│                    ┌──────────────────┐                         │
│                    │   Home Page (/)   │                         │
│                    │      (SSG)        │                         │
│                    └────────┬──────────┘                         │
│                             │                                    │
│              ┌──────────────┴──────────────┐                    │
│              ▼                              ▼                    │
│    ┌──────────────────┐          ┌──────────────────┐          │
│    │  Create Player   │          │   View Games     │          │
│    │  Enter Username  │          │   (Open List)    │          │
│    └────────┬─────────┘          └────────┬─────────┘          │
│             │                              │                    │
│             ▼                              ▼                    │
│    ┌──────────────────┐          ┌──────────────────┐          │
│    │  Create New Game │          │   Join Game      │          │
│    └────────┬─────────┘          └────────┬─────────┘          │
│             │                              │                    │
│             └──────────────┬───────────────┘                    │
│                            ▼                                    │
│                  ┌──────────────────┐                          │
│                  │  Game Board Page │                          │
│                  │  /game/[gameId]  │                          │
│                  │      (CSR)       │                          │
│                  └────────┬─────────┘                          │
│                           │                                    │
│                  ┌────────┴─────────┐                         │
│                  ▼                  ▼                          │
│         ┌─────────────┐    ┌─────────────┐                   │
│         │  Play Game  │    │ Game Ends   │                   │
│         │  Take Turns │    │ Win/Draw    │                   │
│         └─────────────┘    └──────┬──────┘                   │
│                                   │                           │
│              ┌────────────────────┴────────────────┐          │
│              ▼                                     ▼          │
│    ┌──────────────────┐                 ┌──────────────────┐ │
│    │  View History    │                 │  View Leaderboard│ │
│    │  /history (ISR)  │                 │ /leaderboard(SSR)│ │
│    └────────┬─────────┘                 └──────────────────┘ │
│             │                                                 │
│             ▼                                                 │
│    ┌──────────────────┐                                      │
│    │   Game Replay    │                                      │
│    │ /history/[gameId]│                                      │
│    │      (CSR)       │                                      │
│    └──────────────────┘                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏠 Home Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🎮 Tic Tac Toe    [Home] [Leaderboard] [History]          │ ← Navigation
├─────────────────────────────────────────────────────────────┤
│                                                              │
│         Welcome to Tic Tac Toe Multiplayer                  │
│    Challenge your friends in the classic game...            │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ 🎮 Easy  │  │ 👥 Multi │  │ 🏆 Leader│  │ ⏰ History│  │ ← Features
│  │ to Play  │  │  player  │  │  board   │  │          │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Game Lobby                               │  │
│  │                                                        │  │
│  │  Enter your username to get started                   │  │
│  │  ┌────────────────────────┐  ┌──────────────┐       │  │
│  │  │ Username (min 3 chars) │  │ Create Player│       │  │ ← Player Creation
│  │  └────────────────────────┘  └──────────────┘       │  │
│  │                                                        │  │
│  │  Logged in as: PlayerName                   [Switch] │  │
│  │                                                        │  │
│  │  ┌────────────────────┐  ┌──┐                        │  │
│  │  │ Create New Game    │  │↻ │                        │  │ ← Game Actions
│  │  └────────────────────┘  └──┘                        │  │
│  │                                                        │  │
│  │  Open Games (3)                                       │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │ Alice's Game      Created 2 min ago  [Join] │   │  │ ← Open Games
│  │  │ Bob's Game        Created 5 min ago  [Join] │   │  │
│  │  │ Charlie's Game    Created 8 min ago  [Join] │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  How to Play                                                │
│  • The game is played on a 3x3 grid                        │
│  • Players take turns placing X or O                       │
│  • First to get 3 in a row wins                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎮 Game Board Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🎮 Tic Tac Toe    [Home] [Leaderboard] [History]          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Game Board                              [↻ Refresh] [Home] │
│                                                              │
│  ┌──────────────────────────────────┐  ┌────────────────┐  │
│  │                                   │  │ Game Info      │  │
│  │  ✓ Your turn! (X)                │  │                │  │
│  │                                   │  │ Started:       │  │
│  │  ┌──────────────────────────┐   │  │ 2:30 PM        │  │
│  │  │                           │   │  │                │  │
│  │  │  ┌────┬────┬────┐        │   │  │ Status:        │  │
│  │  │  │ X  │ O  │    │        │   │  │ Active         │  │
│  │  │  ├────┼────┼────┤        │   │  └────────────────┘  │
│  │  │  │    │ X  │ O  │        │   │                      │
│  │  │  ├────┼────┼────┤        │   │  ┌────────────────┐  │
│  │  │  │    │    │    │        │   │  │ Move History   │  │
│  │  │  └────┴────┴────┘        │   │  │                │  │
│  │  │                           │   │  │ 1. Alice X→0   │  │
│  │  └──────────────────────────┘   │  │ 2. Bob O→1     │  │
│  │                                   │  │ 3. Alice X→4   │  │
│  │  ┌──────────┐  ┌──────────┐    │  │ 4. Bob O→5     │  │
│  │  │Player 1(X)│  │Player 2(O)│    │  │                │  │
│  │  │  Alice    │  │   Bob     │    │  └────────────────┘  │
│  │  └──────────┘  └──────────┘    │                      │
│  └──────────────────────────────────┘                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏆 Leaderboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🎮 Tic Tac Toe    [Home] [Leaderboard] [History]          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    🏆 Leaderboard                           │
│            Top players ranked by wins                       │
│                                                              │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                   │
│  │  50  │  │ 150  │  │ 95.2%│  │  25  │                   │
│  │Players│  │Games │  │Top Win│  │Most │                   │
│  └──────┘  └──────┘  └──────┘  └──────┘                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │Rank│ Player  │ Wins │ Losses│ Draws│ Total│Win Rate│  │
│  ├────┼─────────┼──────┼───────┼──────┼──────┼────────┤  │
│  │ 🏆1│ Alice   │  25  │   5   │  3   │  33  │ ████ 75%│  │
│  │ 🥈2│ Bob     │  22  │   8   │  2   │  32  │ ███  68%│  │
│  │ 🥉3│ Charlie │  20  │   7   │  5   │  32  │ ███  62%│  │
│  │  4 │ Diana   │  18  │  10   │  4   │  32  │ ██   56%│  │
│  │  5 │ Eve     │  15  │  12   │  3   │  30  │ ██   50%│  │
│  └────┴─────────┴──────┴───────┴──────┴──────┴────────┘  │
│                                                              │
│  ℹ️ How Rankings Work                                       │
│  Players are ranked primarily by total wins...              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📜 History Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🎮 Tic Tac Toe    [Home] [Leaderboard] [History]          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    📜 Game History                          │
│              Alice's match history                          │
│                                                              │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                   │
│  │  15  │  │  10  │  │   3  │  │   2  │                   │
│  │Total │  │ Wins │  │Losses│  │Draws │                   │
│  └──────┘  └──────┘  └──────┘  └──────┘                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Recent Games (15)                        │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  ┌──┐                                                │  │
│  │  │✓ │  Won vs Bob                    [View Replay]  │  │
│  │  └──┘  Jan 15, 2024 at 2:30 PM                      │  │
│  │                                                        │  │
│  │  ┌──┐                                                │  │
│  │  │✗ │  Lost vs Charlie                [View Replay]  │  │
│  │  └──┘  Jan 15, 2024 at 1:45 PM                      │  │
│  │                                                        │  │
│  │  ┌──┐                                                │  │
│  │  │─ │  Draw vs Diana                  [View Replay]  │  │
│  │  └──┘  Jan 15, 2024 at 1:00 PM                      │  │
│  │                                                        │  │
│  │  ┌──┐                                                │  │
│  │  │✓ │  Won vs Eve                     [View Replay]  │  │
│  │  └──┘  Jan 14, 2024 at 5:20 PM                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎬 Game Replay Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🎮 Tic Tac Toe    [Home] [Leaderboard] [History]          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ← Back to History          Game Replay                     │
│                                                              │
│  ┌──────────────────────────────────┐  ┌────────────────┐  │
│  │                                   │  │ Move History   │  │
│  │  Player 1 (X): Alice              │  │                │  │
│  │  Player 2 (O): Bob                │  │ ▶ 1. Alice X→0 │  │
│  │  Winner: Alice 🎉                 │  │   2. Bob O→1   │  │
│  │                                   │  │   3. Alice X→4 │  │
│  │  ┌──────────────────────────┐   │  │   4. Bob O→5   │  │
│  │  │                           │   │  │   5. Alice X→2 │  │
│  │  │  ┌────┬────┬────┐        │   │  │   6. Bob O→3   │  │
│  │  │  │ X  │ O  │ X  │        │   │  │   7. Alice X→8 │  │
│  │  │  ├────┼────┼────┤        │   │  │                │  │
│  │  │  │ O  │ X  │ O  │        │   │  │ Click any move │  │
│  │  │  ├────┼────┼────┤        │   │  │ to jump to it  │  │
│  │  │  │    │    │ X  │        │   │  │                │  │
│  │  │  └────┴────┴────┘        │   │  └────────────────┘  │
│  │  │                           │   │                      │
│  │  └──────────────────────────┘   │                      │
│  │                                   │                      │
│  │  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐      │                      │
│  │  │↺ │ │◄ │ │▶ │ │► │ │⏩│      │                      │
│  │  └──┘ └──┘ └──┘ └──┘ └──┘      │                      │
│  │                                   │                      │
│  │  ████████████░░░░░░░░░░░░        │                      │
│  │  Move 7 of 7                      │                      │
│  └──────────────────────────────────┘                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Scheme

### Primary Colors
```
Blue (Player X):    #3B82F6  ████
Red (Player O):     #EF4444  ████
Green (Win):        #22C55E  ████
Yellow (Warning):   #EAB308  ████
Gray (Neutral):     #6B7280  ████
Purple (Special):   #A855F7  ████
```

### UI Elements
```
Background:         #F9FAFB  ████
Cards:              #FFFFFF  ████
Borders:            #E5E7EB  ████
Text Primary:       #111827  ████
Text Secondary:     #6B7280  ████
```

---

## 📱 Responsive Breakpoints

### Desktop (1920px)
```
┌─────────────────────────────────────────────────────────┐
│  Full width layout with sidebar                         │
│  3-column grid for features                             │
│  Large game board                                       │
└─────────────────────────────────────────────────────────┘
```

### Tablet (768px)
```
┌───────────────────────────────────┐
│  2-column layout                  │
│  Stacked sidebar                  │
│  Medium game board                │
└───────────────────────────────────┘
```

### Mobile (375px)
```
┌─────────────────┐
│  Single column  │
│  Stacked layout │
│  Small board    │
└─────────────────┘
```

---

## 🎯 Interactive Elements

### Buttons
```
Primary:    ┌──────────────┐
            │ Create Game  │  ← Blue, hover effect
            └──────────────┘

Secondary:  ┌──────────────┐
            │   Refresh    │  ← Gray, hover effect
            └──────────────┘

Success:    ┌──────────────┐
            │  Join Game   │  ← Green, hover effect
            └──────────────┘

Danger:     ┌──────────────┐
            │    Delete    │  ← Red, hover effect
            └──────────────┘
```

### Game Cells
```
Empty:      ┌────┐
            │    │  ← Hover: light blue
            └────┘

Taken:      ┌────┐
            │ X  │  ← No hover, cursor: not-allowed
            └────┘

Winning:    ┌────┐
            │ X  │  ← Green background, pulse animation
            └────┘
```

---

## 🔄 State Indicators

### Game Status
```
Open:       ⏳ Waiting for another player to join...
Active:     ✓ Your turn! (X)
Finished:   🎉 Alice wins!
Draw:       ─ It's a draw!
```

### Loading States
```
Loading:    ⟳ Loading...
Refreshing: ↻ (spinning icon)
Processing: ⋯ Please wait...
```

### Result Badges
```
Win:        ┌──┐
            │✓ │  Green circle with checkmark
            └──┘

Loss:       ┌──┐
            │✗ │  Red circle with X
            └──┘

Draw:       ┌──┐
            │─ │  Gray circle with dash
            └──┘
```

---

## 📊 Data Visualization

### Win Rate Progress Bar
```
75%:  ████████████████░░░░  75%
50%:  ██████████░░░░░░░░░░  50%
25%:  █████░░░░░░░░░░░░░░░  25%
```

### Statistics Cards
```
┌──────────────┐
│   🏆         │
│              │
│     25       │  ← Large number
│              │
│   Wins       │  ← Label
└──────────────┘
```

---

## 🎭 Animations

### Page Transitions
- Fade in: 300ms ease-out
- Slide up: 10px → 0px

### Button Hover
- Scale: 1.0 → 1.05
- Shadow: md → lg

### Cell Hover
- Background: transparent → light blue
- Transition: 200ms

### Winning Cells
- Pulse animation
- 1s ease-in-out infinite

---

## 🖼️ Icons Used

```
Navigation:
🏠 Home
🏆 Leaderboard
📜 History

Actions:
➕ Create
🔄 Refresh
👁️ View
▶️ Play
⏸️ Pause

Status:
✓ Success
✗ Error
⏳ Waiting
🎉 Celebration
```

---

## 📐 Layout Grid

### Home Page Grid
```
┌─────────────────────────────────────┐
│  Header (full width)                │
├─────────────────────────────────────┤
│  Hero Section (centered)            │
├─────────────────────────────────────┤
│  Features (4 columns)               │
├─────────────────────────────────────┤
│  Game Lobby (centered, max-width)   │
├─────────────────────────────────────┤
│  How to Play (2 columns)            │
├─────────────────────────────────────┤
│  Footer (full width)                │
└─────────────────────────────────────┘
```

### Game Board Grid
```
┌─────────────────────────────────────┐
│  Header (full width)                │
├─────────────────────────────────────┤
│  ┌─────────────────┬──────────────┐ │
│  │  Game Board     │   Sidebar    │ │
│  │  (2/3 width)    │  (1/3 width) │ │
│  │                 │              │ │
│  └─────────────────┴──────────────┘ │
├─────────────────────────────────────┤
│  Footer (full width)                │
└─────────────────────────────────────┘
```

---

This visual guide provides a comprehensive overview of the application's user interface and user experience design. Use it as a reference for understanding the layout and visual hierarchy of each page.
