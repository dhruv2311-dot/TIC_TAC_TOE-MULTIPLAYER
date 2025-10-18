'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, RotateCcw, FastForward } from 'lucide-react';
import GameBoard from '@/components/GameBoard';

export default function GameReplayPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId;

  const [game, setGame] = useState(null);
  const [moves, setMoves] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGameData();
  }, [gameId]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentMoveIndex < moves.length - 1) {
      interval = setInterval(() => {
        setCurrentMoveIndex(prev => {
          if (prev >= moves.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentMoveIndex, moves.length]);

  const fetchGameData = async () => {
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
    }
  };

  const getBoardAtMove = (moveIndex) => {
    const board = ['', '', '', '', '', '', '', '', ''];
    for (let i = 0; i <= moveIndex; i++) {
      if (moves[i]) {
        board[moves[i].position] = moves[i].symbol;
      }
    }
    return board;
  };

  const handleReset = () => {
    setCurrentMoveIndex(-1);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (currentMoveIndex >= moves.length - 1) {
      setCurrentMoveIndex(-1);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentMoveIndex < moves.length - 1) {
      setCurrentMoveIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMoveIndex >= 0) {
      setCurrentMoveIndex(prev => prev - 1);
    }
  };

  const handleSkipToEnd = () => {
    setCurrentMoveIndex(moves.length - 1);
    setIsPlaying(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Play className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading replay...</p>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 mb-4">{error || 'Game not found'}</p>
          <button
            onClick={() => router.push('/history')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to History
          </button>
        </div>
      </div>
    );
  }

  const currentBoard = currentMoveIndex >= 0 
    ? getBoardAtMove(currentMoveIndex) 
    : ['', '', '', '', '', '', '', '', ''];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => router.push('/history')}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to History
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Game Replay</h1>
        <div className="w-32" /> {/* Spacer for centering */}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Game Board */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* Game Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Player 1 (X)</p>
                  <p className="font-semibold text-gray-900">
                    {game.player1?.username}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Player 2 (O)</p>
                  <p className="font-semibold text-gray-900">
                    {game.player2?.username}
                  </p>
                </div>
              </div>
              <div className="text-center">
                {game.winner ? (
                  <p className="text-lg font-bold text-purple-600">
                    Winner: {game.winner.username} 🎉
                  </p>
                ) : (
                  <p className="text-lg font-bold text-gray-600">
                    Draw Game
                  </p>
                )}
              </div>
            </div>

            {/* Board */}
            <GameBoard
              board={currentBoard}
              onCellClick={() => {}}
              disabled={true}
            />

            {/* Playback Controls */}
            <div className="mt-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <button
                  onClick={handleReset}
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Reset"
                >
                  <RotateCcw size={20} />
                </button>
                <button
                  onClick={handlePrevious}
                  disabled={currentMoveIndex < 0}
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Previous"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentMoveIndex >= moves.length - 1}
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Next"
                >
                  <ArrowLeft size={20} className="rotate-180" />
                </button>
                <button
                  onClick={handleSkipToEnd}
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Skip to End"
                >
                  <FastForward size={20} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${moves.length > 0 ? ((currentMoveIndex + 1) / moves.length) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                Move {currentMoveIndex + 1} of {moves.length}
              </p>
            </div>
          </div>
        </div>

        {/* Move List */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Move History
          </h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {moves.map((move, index) => (
              <button
                key={move._id}
                onClick={() => {
                  setCurrentMoveIndex(index);
                  setIsPlaying(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  index === currentMoveIndex
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {index + 1}. {move.playerId.username}
                  </span>
                  <span className={`font-bold ${
                    move.symbol === 'X' ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {move.symbol}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Position {move.position} • {new Date(move.timestamp).toLocaleTimeString()}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
