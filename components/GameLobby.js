'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, LogIn, RefreshCw, Users } from 'lucide-react';

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
    <div className="gaming-card p-8">
      <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Game Lobby</h2>

      {error && (
        <div className="mb-4 p-4 bg-[var(--danger)]/10 border border-[var(--danger)]/30 rounded-lg text-[var(--danger)]">
          {error}
        </div>
      )}

      {!playerId ? (
        <form onSubmit={handleCreatePlayer} className="mb-8">
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Enter your username to get started
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (min 3 characters)"
              className="flex-1 px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:border-[var(--primary)] focus:outline-none transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="neon-button"
            >
              {loading ? 'Creating...' : 'Create Player'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8">
          <div className="status-badge flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Logged in as</p>
              <p className="text-lg font-semibold text-[var(--text-primary)]">{username}</p>
            </div>
            <button
              onClick={() => {
                setPlayerId(null);
                setUsername('');
                localStorage.removeItem('player');
              }}
              className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Switch Player
            </button>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleCreateGame}
              disabled={loading}
              className="flex-1 neon-button flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Create New Game
            </button>
            <button
              onClick={fetchOpenGames}
              disabled={loading}
              className="px-6 py-3 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text-primary)] transition-all"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      )}

      {/* Open Games List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">
            Open Games ({openGames.length})
          </h3>
        </div>

        {openGames.length === 0 ? (
          <div className="text-center py-12 gaming-card">
            <Users className="w-16 h-16 text-[var(--text-secondary)]/40 mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">No open games available</p>
            <p className="text-sm text-[var(--text-secondary)]/60 mt-2">
              Create a new game to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {openGames.map((game) => (
              <div
                key={game._id}
                className="gaming-card p-4 hover-lift flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    {game.player1.username}&apos;s Game
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Created {new Date(game.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleJoinGame(game._id)}
                  disabled={loading || game.player1._id === playerId}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--success)] text-white rounded-lg hover:bg-[var(--success)]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium"
                >
                  <LogIn size={18} />
                  Join Game
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
