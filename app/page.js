import GameLobby from '@/components/GameLobby';
import { Gamepad2, Users, Trophy, Clock, Zap } from 'lucide-react';

// This page uses Static Site Generation (SSG)
export const metadata = {
  title: 'Home | Tic Tac Toe Multiplayer',
  description: 'Play Tic Tac Toe online with friends. Modern multiplayer gaming experience.',
};

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fadeIn">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--primary)] rounded-2xl mb-6">
          <Gamepad2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[var(--text-primary)]">
          Tic Tac Toe Multiplayer
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
          Challenge your friends in the classic game of strategy and skill
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <FeatureCard
          icon={<Gamepad2 className="w-8 h-8 text-[var(--primary)]" />}
          title="Easy to Play"
          description="Simple and intuitive gameplay for everyone"
        />
        <FeatureCard
          icon={<Users className="w-8 h-8 text-[var(--accent)]" />}
          title="Multiplayer"
          description="Play with friends in real-time"
        />
        <FeatureCard
          icon={<Trophy className="w-8 h-8 text-[var(--warning)]" />}
          title="Leaderboard"
          description="Track your wins and compete globally"
        />
        <FeatureCard
          icon={<Clock className="w-8 h-8 text-[var(--success)]" />}
          title="Game History"
          description="Review your past games anytime"
        />
      </div>

      {/* Game Lobby */}
      <GameLobby />

      {/* How to Play Section */}
      <div className="mt-16 gaming-card p-8">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">How to Play</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
              Game Rules
            </h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">•</span>
                The game is played on a 3x3 grid
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">•</span>
                Players take turns placing X or O on the board
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">•</span>
                First player to get 3 in a row wins
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">•</span>
                If all 9 squares are filled, it&apos;s a draw
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
              Getting Started
            </h3>
            <ol className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start">
                <span className="text-[var(--primary)] font-semibold mr-2">1.</span>
                Enter your username to create a player profile
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] font-semibold mr-2">2.</span>
                Create a new game or join an existing one
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] font-semibold mr-2">3.</span>
                Wait for another player to join
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] font-semibold mr-2">4.</span>
                Take turns placing your symbol on the board
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="mt-12 gaming-card p-8">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 text-center">
          Built with Modern Technologies
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <TechBadge>Next.js 14</TechBadge>
          <TechBadge>MongoDB Atlas</TechBadge>
          <TechBadge>Mongoose</TechBadge>
          <TechBadge>Tailwind CSS</TechBadge>
          <TechBadge>App Router</TechBadge>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="gaming-card p-6 hover-lift">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--text-secondary)] text-sm">
        {description}
      </p>
    </div>
  );
}

function TechBadge({ children }) {
  return (
    <span className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg text-sm font-medium border border-[var(--border)] hover:border-[var(--primary)] transition-all">
      {children}
    </span>
  );
}
