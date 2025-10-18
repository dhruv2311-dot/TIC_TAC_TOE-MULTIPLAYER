'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { History as HistoryIcon, Trophy, XCircle, Minus, Eye, Calendar } from 'lucide-react';

// This page uses Client-Side Rendering with periodic data fetching
// Simulating ISR behavior on the client side
export default function HistoryPage() {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    // Get player from localStorage
    const savedPlayer = localStorage.getItem('player');
    if (!savedPlayer) {
      router.push('/');
      return;
    }

    const player = JSON.parse(savedPlayer);
    setPlayerId(player._id);
    setPlayerName(player.username);
    
    fetchHistory(player._id);
  }, [router]);

  const fetchHistory = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/history/${id}`);
      const data = await response.json();

      if (data.success) {
        setGames(data.data);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch game history');
    } finally {
      setLoading(false);
    }
  };

  const getGameResult = (game) => {
    if (!game.winner) {
      return { result: 'Draw', icon: Minus, color: 'gray' };
    }
    
    const isWinner = game.winner._id === playerId;
    return {
      result: isWinner ? 'Won' : 'Lost',
      icon: isWinner ? Trophy : XCircle,
      color: isWinner ? 'green' : 'red',
    };
  };

  const getOpponent = (game) => {
    if (game.player1._id === playerId) {
      return game.player2?.username || 'Unknown';
    }
    return game.player1?.username || 'Unknown';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <HistoryIcon className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading history...</p>
        </div>
      </div>
    );
  }

  if (!playerId) {
    return null;
  }

  // Calculate statistics
  const stats = {
    total: games.length,
    wins: games.filter(g => g.winner?._id === playerId).length,
    losses: games.filter(g => g.winner && g.winner._id !== playerId).length,
    draws: games.filter(g => !g.winner).length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <HistoryIcon className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Game History
        </h1>
        <p className="text-gray-600">
          {playerName}&apos;s match history and statistics
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Games"
          value={stats.total}
          color="blue"
        />
        <StatCard
          label="Wins"
          value={stats.wins}
          color="green"
        />
        <StatCard
          label="Losses"
          value={stats.losses}
          color="red"
        />
        <StatCard
          label="Draws"
          value={stats.draws}
          color="gray"
        />
      </div>

      {/* Games List */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-xl font-semibold text-white">
            Recent Games ({games.length})
          </h2>
        </div>

        {games.length === 0 ? (
          <div className="text-center py-12">
            <HistoryIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No games played yet</p>
            <p className="text-sm text-gray-400 mt-2">Start playing to see your game history here!</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Play Now
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {games.map((game) => {
              const { result, icon: Icon, color } = getGameResult(game);
              const opponent = getOpponent(game);

              return (
                <div
                  key={game._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Result Badge */}
                      <div className={`
                        flex items-center justify-center w-16 h-16 rounded-full
                        ${color === 'green' ? 'bg-green-100' : ''}
                        ${color === 'red' ? 'bg-red-100' : ''}
                        ${color === 'gray' ? 'bg-gray-100' : ''}
                      `}>
                        <Icon className={`
                          w-8 h-8
                          ${color === 'green' ? 'text-green-600' : ''}
                          ${color === 'red' ? 'text-red-600' : ''}
                          ${color === 'gray' ? 'text-gray-600' : ''}
                        `} />
                      </div>

                      {/* Game Info */}
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`
                            font-bold text-lg
                            ${color === 'green' ? 'text-green-600' : ''}
                            ${color === 'red' ? 'text-red-600' : ''}
                            ${color === 'gray' ? 'text-gray-600' : ''}
                          `}>
                            {result}
                          </span>
                          <span className="text-gray-400">vs</span>
                          <span className="font-semibold text-gray-900">
                            {opponent}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span>
                            {new Date(game.endedAt).toLocaleDateString()} at{' '}
                            {new Date(game.endedAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* View Game Button */}
                    <button
                      onClick={() => router.push(`/history/${game._id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye size={18} />
                      View Replay
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info Box */}
      {games.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            About Game History
          </h3>
          <p className="text-blue-800 text-sm">
            This page shows all your completed games. Click &quot;View Replay&quot; to see 
            the move-by-move breakdown of any game. Your statistics are updated 
            in real-time as you play more games.
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>
        {value}
      </p>
    </div>
  );
}
