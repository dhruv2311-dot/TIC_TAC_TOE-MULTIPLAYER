import connectDB from '@/lib/mongodb';
import Player from '@/lib/models/Player';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

// This page uses Server-Side Rendering (SSR)
// Data is fetched on every request for real-time rankings
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Leaderboard | Tic Tac Toe Multiplayer',
  description: 'View the top players and their rankings in Tic Tac Toe multiplayer game.',
};

async function getLeaderboardData() {
  try {
    await connectDB();
    
    const players = await Player.find({})
      .sort({ wins: -1, losses: 1, createdAt: 1 })
      .limit(100)
      .lean();

    // Convert MongoDB documents to plain objects and format dates
    return players.map(player => ({
      ...player,
      _id: player._id.toString(),
      createdAt: player.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export default async function LeaderboardPage() {
  const players = await getLeaderboardData();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Leaderboard
        </h1>
        <p className="text-gray-600">
          Top players ranked by wins and performance
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Trophy className="w-8 h-8 text-yellow-500" />}
          label="Total Players"
          value={players.length}
        />
        <StatCard
          icon={<Award className="w-8 h-8 text-blue-500" />}
          label="Total Games"
          value={players.reduce((sum, p) => sum + p.wins + p.losses + p.draws, 0)}
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8 text-green-500" />}
          label="Top Win Rate"
          value={
            players.length > 0
              ? `${Math.max(...players.map(p => {
                  const total = p.wins + p.losses + p.draws;
                  return total > 0 ? (p.wins / total * 100) : 0;
                })).toFixed(1)}%`
              : '0%'
          }
        />
        <StatCard
          icon={<Medal className="w-8 h-8 text-purple-500" />}
          label="Most Wins"
          value={players.length > 0 ? Math.max(...players.map(p => p.wins)) : 0}
        />
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Player</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Wins</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Losses</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Draws</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Total Games</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {players.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No players yet. Be the first to play!
                  </td>
                </tr>
              ) : (
                players.map((player, index) => {
                  const totalGames = player.wins + player.losses + player.draws;
                  const winRate = totalGames > 0 
                    ? ((player.wins / totalGames) * 100).toFixed(1) 
                    : '0.0';
                  
                  return (
                    <tr
                      key={player._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index < 3 ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                          {index === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                          {index === 2 && <Medal className="w-5 h-5 text-orange-600" />}
                          <span className="font-semibold text-gray-900">
                            #{index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">
                          {player.username}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {player.wins}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          {player.losses}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          {player.draws}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-medium text-gray-900">
                          {totalGames}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${winRate}%` }}
                            />
                          </div>
                          <span className="font-semibold text-gray-900 min-w-[3rem]">
                            {winRate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">
          How Rankings Work
        </h3>
        <p className="text-blue-800 text-sm">
          Players are ranked primarily by total wins. In case of a tie, 
          players with fewer losses rank higher. Win rate is calculated 
          as (Wins / Total Games) × 100.
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}
