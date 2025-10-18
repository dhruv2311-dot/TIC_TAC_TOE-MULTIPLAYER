import GameLobby from '@/components/GameLobby';
import { Swords, Users, Trophy, Zap, Target, Shield } from 'lucide-react';

// This page uses Static Site Generation (SSG)
export const metadata = {
  title: 'Arena | Tic Tac Toe Pro Gaming',
  description: 'Enter the arena. Compete in professional Tic Tac Toe battles. Dominate the leaderboard!',
};

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Epic Hero Section */}
      <div className="text-center mb-16 animate-fadeIn relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>
        <div className="relative z-10">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-1 h-12 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
              <Swords className="w-16 h-16 text-cyan-400 icon-glow animate-pulse" />
              <div className="w-1 h-12 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 neon-text tracking-tight">
            ENTER THE ARENA
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-cyan-300/80 mb-4 tracking-wide">
            PROFESSIONAL TIC TAC TOE BATTLES
          </p>
          <p className="text-lg text-cyan-400/60 max-w-2xl mx-auto">
            Compete against elite players • Climb the rankings • Prove your dominance
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-slideIn">
        <FeatureCard
          icon={<Zap className="w-10 h-10 text-cyan-400" />}
          title="INSTANT BATTLES"
          description="Lightning-fast matchmaking and gameplay"
        />
        <FeatureCard
          icon={<Users className="w-10 h-10 text-purple-400" />}
          title="MULTIPLAYER"
          description="Challenge players worldwide in real-time"
        />
        <FeatureCard
          icon={<Trophy className="w-10 h-10 text-yellow-400" />}
          title="RANKINGS"
          description="Climb the leaderboard and earn glory"
        />
        <FeatureCard
          icon={<Target className="w-10 h-10 text-pink-400" />}
          title="BATTLE HISTORY"
          description="Analyze your victories and defeats"
        />
      </div>

      {/* Game Lobby */}
      <GameLobby />

      {/* How to Play Section */}
      <div className="mt-16 gaming-card p-8 hover-lift">
        <div className="flex items-center justify-center mb-8">
          <Shield className="w-8 h-8 text-cyan-400 icon-glow mr-3" />
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase tracking-wider">
            Battle Guide
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="gaming-card p-6 border-cyan-500/30">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 uppercase tracking-wide flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Combat Rules
            </h3>
            <ul className="space-y-3 text-cyan-100/80">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold">▸</span>
                Battle on a 3x3 tactical grid
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold">▸</span>
                Alternate turns placing X or O markers
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold">▸</span>
                First to align 3 markers wins the battle
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold">▸</span>
                Full grid with no winner results in a draw
              </li>
            </ul>
          </div>
          <div className="gaming-card p-6 border-purple-500/30">
            <h3 className="text-xl font-bold text-purple-400 mb-4 uppercase tracking-wide flex items-center">
              <Swords className="w-5 h-5 mr-2" />
              Quick Start
            </h3>
            <ol className="space-y-3 text-cyan-100/80">
              <li className="flex items-start">
                <span className="text-purple-400 font-black mr-3">1.</span>
                Register your warrior name (username)
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 font-black mr-3">2.</span>
                Create arena or join existing battle
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 font-black mr-3">3.</span>
                Wait for opponent to enter the arena
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 font-black mr-3">4.</span>
                Engage in tactical combat!
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="mt-12 gaming-card p-8">
        <h2 className="text-2xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 uppercase tracking-wider">
          Powered By Elite Technology
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
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
    <div className="gaming-card p-6 hover-lift group">
      <div className="mb-4 flex justify-center">
        <div className="relative">
          {icon}
          <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
      <h3 className="text-lg font-black text-cyan-300 mb-2 uppercase tracking-wider text-center">
        {title}
      </h3>
      <p className="text-cyan-100/60 text-sm text-center">
        {description}
      </p>
    </div>
  );
}

function TechBadge({ children }) {
  return (
    <span className="px-6 py-2 gaming-card text-sm font-bold text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/60 transition-all hover-lift cursor-default uppercase tracking-wider">
      {children}
    </span>
  );
}
