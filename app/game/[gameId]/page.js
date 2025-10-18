'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import GameBoard from '@/components/GameBoard';
import { RefreshCw, Home, Clock, Users } from 'lucide-react';

// This page uses Client-Side Rendering (CSR)
export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId;

  const [game, setGame] = useState(null);
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [playerId, setPlayerId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Get player from localStorage
    const savedPlayer = localStorage.getItem('player');
    if (savedPlayer) {
      const player = JSON.parse(savedPlayer);
      setPlayerId(player._id);
    }

    fetchGameData();
    
    // Auto-refresh every 3 seconds for real-time updates
    const interval = setInterval(() => {
      fetchGameData(true);
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  const fetchGameData = async (silent = false) => {
    if (!silent) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const response = await fetch(`/api/games/${gameId}`);
      const data = await response.json();

      if (data.success) {
        setGame(data.data.game);
        setMoves(data.data.moves);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch game data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleMove = async (position) => {
    if (!playerId) {
      setError('Please log in to make a move');
      return;
    }

    try {
      const response = await fetch(`/api/games/${gameId}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, position }),
      });

      const data = await response.json();

      if (data.success) {
        setGame(data.data);
        setError('');
        // Fetch moves again to update the list
        fetchGameData(true);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to make move');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  if (error && !game) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isPlayerTurn = game?.currentTurn?._id === playerId;
  const playerSymbol = game?.player1?._id === playerId ? 'X' : 'O';
  const isPlayerInGame = 
    game?.player1?._id === playerId || game?.player2?._id === playerId;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Game Board</h1>
        <div className="flex gap-3">
          <button
            onClick={() => fetchGameData()}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home size={18} />
            Home
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Game Board */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* Game Status */}
            <div className="mb-6">
              {game.status === 'open' && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-medium">
                    Waiting for another player to join...
                  </p>
                </div>
              )}
              
              {game.status === 'active' && (
                <div className={`p-4 rounded-lg ${
                  isPlayerTurn 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-blue-50 border border-blue-200'
                }`}>
                  <p className={`font-medium ${
                    isPlayerTurn ? 'text-green-800' : 'text-blue-800'
                  }`}>
                    {isPlayerTurn 
                      ? `Your turn! (${playerSymbol})` 
                      : `${game.currentTurn?.username}'s turn`
                    }
                  </p>
                </div>
              )}
              
              {game.status === 'finished' && (
                <div className={`p-4 rounded-lg ${
                  game.winner 
                    ? 'bg-purple-50 border border-purple-200' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <p className={`font-medium ${
                    game.winner ? 'text-purple-800' : 'text-gray-800'
                  }`}>
                    {game.winner 
                      ? `${game.winner.username} wins! 🎉` 
                      : "It's a draw!"
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Board */}
            <GameBoard
              board={game.board}
              onCellClick={handleMove}
              disabled={
                !isPlayerInGame ||
                game.status !== 'active' || 
                !isPlayerTurn
              }
            />

            {/* Players Info */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Player 1 (X)</p>
                <p className="font-semibold text-gray-900">
                  {game.player1?.username}
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Player 2 (O)</p>
                <p className="font-semibold text-gray-900">
                  {game.player2?.username || 'Waiting...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Game Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Game Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Clock size={18} />
                <div>
                  <p className="text-xs text-gray-500">Started</p>
                  <p className="text-sm font-medium">
                    {new Date(game.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {game.endedAt && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Ended</p>
                    <p className="text-sm font-medium">
                      {new Date(game.endedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-600">
                <Users size={18} />
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-medium capitalize">
                    {game.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Move History */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Move History ({moves.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {moves.length === 0 ? (
                <p className="text-gray-500 text-sm">No moves yet</p>
              ) : (
                moves.map((move, index) => (
                  <div
                    key={move._id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                  >
                    <span className="font-medium text-gray-700">
                      {index + 1}. {move.playerId.username}
                    </span>
                    <span className="text-gray-600">
                      {move.symbol} at position {move.position}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
