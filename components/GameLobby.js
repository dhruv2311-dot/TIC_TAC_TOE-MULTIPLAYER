'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, LogIn, RefreshCw, Users, Swords, UserPlus, Zap } from 'lucide-react';

export default function GameLobby() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [playerId, setPlayerId] = useState(null);
  const [openGames, setOpenGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load player from localStorage
    const savedPlayer = localStorage.getItem('player');
    if (savedPlayer) {
      const player = JSON.parse(savedPlayer);
      setPlayerId(player._id);
      setUsername(player.username);
    }
    
    fetchOpenGames();
  }, []);

  const fetchOpenGames = async () => {
    try {
      const response = await fetch('/api/games/open');
      const data = await response.json();
      if (data.success) {
        setOpenGames(data.data);
      }
    } catch (err) {
      console.error('Error fetching open games:', err);
    }
  };

  const handleCreatePlayer = async (e) => {
    e.preventDefault();
    if (!username.trim() || username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();
      
      if (data.success) {
        setPlayerId(data.data._id);
        localStorage.setItem('player', JSON.stringify(data.data));
        setError('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to create player. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGame = async () => {
    if (!playerId) {
      setError('Please create a player first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId }),
      });

      const data = await response.json();
      
      if (data.success) {
        router.push(`/game/${data.data._id}`);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to create game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async (gameId) => {
    if (!playerId) {
      setError('Please create a player first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/games/${gameId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId }),
      });

      const data = await response.json();
      
      if (data.success) {
        router.push(`/game/${gameId}`);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to join game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gaming-card p-8 hover-lift">
      <div className="flex items-center justify-center mb-8">
        <Swords className="w-8 h-8 text-cyan-400 icon-glow mr-3 animate-pulse" />
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase tracking-wider">Battle Lobby</h2>
      </div>

      {error && (
        <div className="mb-4 p-4 gaming-card border-red-500/50 text-red-400 animate-fadeIn">
          <div className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            {error}
          </div>
        </div>
      )}

      {!playerId ? (
        <form onSubmit={handleCreatePlayer} className="mb-8">
          <label className="block text-sm font-bold text-cyan-400 mb-3 uppercase tracking-wider">
            <UserPlus className="w-4 h-4 inline mr-2" />
            Register Warrior Name
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter warrior name (min 3 characters)"
              className="flex-1 px-4 py-3 gaming-card border-cyan-500/30 text-cyan-100 placeholder-cyan-400/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="neon-button relative z-10"
            >
              {loading ? 'REGISTERING...' : 'REGISTER'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8">
          <div className="status-badge flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-cyan-400/60 uppercase tracking-wide">Active Warrior</p>
              <p className="text-xl font-black text-cyan-400">{username}</p>
            </div>
            <button
              onClick={() => {
                setPlayerId(null);
                setUsername('');
                localStorage.removeItem('player');
              }}
              className="px-4 py-2 text-sm text-cyan-400/60 hover:text-cyan-400 transition-colors uppercase tracking-wider font-bold"
            >
              Switch
            </button>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleCreateGame}
              disabled={loading}
              className="flex-1 neon-button flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Create Arena
            </button>
            <button
              onClick={fetchOpenGames}
              disabled={loading}
              className="px-6 py-4 gaming-card border-cyan-500/30 text-cyan-400 hover:border-cyan-400 transition-all"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      )}

      {/* Open Games List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-cyan-400 uppercase tracking-wider">
            <Swords className="w-5 h-5 inline mr-2" />
            Open Arenas ({openGames.length})
          </h3>
        </div>

        {openGames.length === 0 ? (
          <div className="text-center py-12 gaming-card border-cyan-500/20">
            <Users className="w-16 h-16 text-cyan-400/40 mx-auto mb-4 icon-glow" />
            <p className="text-cyan-300/60 font-bold">No Active Arenas</p>
            <p className="text-sm text-cyan-400/40 mt-2 uppercase tracking-wide">
              Create a new arena to begin!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {openGames.map((game) => (
              <div
                key={game._id}
                className="gaming-card p-4 border-cyan-500/30 hover:border-cyan-400/60 transition-all hover-lift flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-cyan-300 uppercase tracking-wide">
                    <Swords className="w-4 h-4 inline mr-2" />
                    {game.player1.username}'s Arena
                  </p>
                  <p className="text-sm text-cyan-400/60 mt-1">
                    Created {new Date(game.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleJoinGame(game._id)}
                  disabled={loading || game.player1._id === playerId}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-400/50 text-green-400 rounded-lg hover:border-green-400 hover:bg-green-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold uppercase text-sm"
                >
                  <LogIn size={18} />
                  Enter
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
