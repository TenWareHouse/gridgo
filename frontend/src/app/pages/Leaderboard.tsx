import { Navbar } from '../components/Navbar';
import { Trophy, Medal, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'global' | 'friends' | 'country'>('global');
  const { t } = useLanguage();

  const globalLeaderboard = [
    { rank: 1, name: 'SpeedKing_2026', country: '🇬🇧', points: 1520, change: 0 },
    { rank: 2, name: 'RaceMaster', country: '🇺🇸', points: 1498, change: 2 },
    { rank: 3, name: 'F1Champion', country: '🇩🇪', points: 1476, change: -1 },
    { rank: 4, name: 'TurboCharge', country: '🇮🇹', points: 1455, change: 3 },
    { rank: 5, name: 'PolePosition', country: '🇫🇷', points: 1432, change: -2 },
    { rank: 6, name: 'ApexHunter', country: '🇪🇸', points: 1410, change: 1 },
    { rank: 7, name: 'PitStopPro', country: '🇧🇷', points: 1389, change: 0 },
    { rank: 8, name: 'DRS_Master', country: '🇳🇱', points: 1367, change: 4 },
    { rank: 9, name: 'GridKing', country: '🇯🇵', points: 1345, change: -1 },
    { rank: 10, name: 'RedZone88', country: '🇨🇳', points: 1323, change: 2 },
    { rank: 11, name: 'FastLap', country: '🇦🇺', points: 1301, change: -3 },
    { rank: 12, name: 'SlipstreamKing', country: '🇨🇦', points: 1280, change: 1 },
    { rank: 13, name: 'Overtaker99', country: '🇲🇽', points: 1258, change: 0 },
    { rank: 14, name: 'ChequeredFlag', country: '🇸🇬', points: 1236, change: 5 },
    { rank: 15, name: 'TyreWhisperer', country: '🇹🇭', points: 1215, change: -1 },
  ];

  const friendsLeaderboard = [
    { rank: 1, name: 'RaceMaster', country: '🇺🇸', points: 1498, change: 0 },
    { rank: 2, name: 'F1Champion', country: '🇩🇪', points: 1476, change: 1 },
    { rank: 3, name: t('home.you'), country: '🇨🇳', points: 1247, change: -1, highlight: true },
    { rank: 4, name: 'FastFriend', country: '🇨🇳', points: 1189, change: 2 },
    { rank: 5, name: 'BuddyRacer', country: '🇯🇵', points: 1156, change: -1 },
  ];

  const countryLeaderboard = [
    { rank: 1, name: 'RedZone88', country: '🇨🇳', points: 1323, change: 0 },
    { rank: 2, name: t('home.you'), country: '🇨🇳', points: 1247, change: 1, highlight: true },
    { rank: 3, name: 'ChinaSpeed', country: '🇨🇳', points: 1210, change: -1 },
    { rank: 4, name: 'DragonRacer', country: '🇨🇳', points: 1189, change: 2 },
    { rank: 5, name: 'ShanghaiDrift', country: '🇨🇳', points: 1167, change: -1 },
  ];

  const currentLeaderboard =
    activeTab === 'global'
      ? globalLeaderboard
      : activeTab === 'friends'
      ? friendsLeaderboard
      : countryLeaderboard;

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-red-950/20 via-black to-black"></div>
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-800/20 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-[1440px] mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/50">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">{t('leaderboard.title')}</h1>
                <p className="text-gray-400 mt-1">{t('leaderboard.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Trophy}
              label={t('leaderboard.globalRank')}
              value="#2,845"
              subtext={`${t('leaderboard.top')} 15%`}
              color="red"
            />
            <StatCard
              icon={Users}
              label={t('leaderboard.totalPlayers')}
              value="2.4M"
              subtext={t('leaderboard.activePlayers')}
              color="blue"
            />
            <StatCard
              icon={TrendingUp}
              label={t('leaderboard.weeklyGain')}
              value="+127"
              subtext={t('leaderboard.rankUp')}
              color="green"
            />
            <StatCard
              icon={Medal}
              label={t('leaderboard.bestRank')}
              value="#1,523"
              subtext={t('leaderboard.week')}
              color="yellow"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <TabButton
              active={activeTab === 'global'}
              onClick={() => setActiveTab('global')}
              label={t('leaderboard.global')}
            />
            <TabButton
              active={activeTab === 'friends'}
              onClick={() => setActiveTab('friends')}
              label={t('leaderboard.friends')}
            />
            <TabButton
              active={activeTab === 'country'}
              onClick={() => setActiveTab('country')}
              label={t('leaderboard.country')}
            />
          </div>

          {/* Leaderboard Table */}
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 shadow-2xl overflow-hidden">
            {/* Top 3 Podium */}
            <div className="bg-gradient-to-r from-red-950/40 via-red-900/20 to-red-950/40 p-8 border-b border-red-600/30">
              <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* 2nd Place */}
                <PodiumCard
                  rank={2}
                  name={currentLeaderboard[1].name}
                  country={currentLeaderboard[1].country}
                  points={currentLeaderboard[1].points}
                  height="h-32"
                />
                {/* 1st Place */}
                <PodiumCard
                  rank={1}
                  name={currentLeaderboard[0].name}
                  country={currentLeaderboard[0].country}
                  points={currentLeaderboard[0].points}
                  height="h-40"
                  winner
                />
                {/* 3rd Place */}
                <PodiumCard
                  rank={3}
                  name={currentLeaderboard[2].name}
                  country={currentLeaderboard[2].country}
                  points={currentLeaderboard[2].points}
                  height="h-24"
                />
              </div>
            </div>

            {/* Leaderboard List */}
            <div className="p-6">
              <div className="space-y-2">
                {currentLeaderboard.slice(3).map((player) => (
                  <LeaderboardRow key={player.rank} {...player} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  subtext: string;
  color: string;
}) {
  const colorClasses = {
    red: 'from-red-600 to-red-800 shadow-red-600/50',
    blue: 'from-blue-600 to-blue-800 shadow-blue-600/50',
    green: 'from-green-600 to-green-800 shadow-green-600/50',
    yellow: 'from-yellow-600 to-yellow-800 shadow-yellow-600/50',
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl border border-red-600/30 p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-500">{subtext}</div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        active
          ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
          : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
      }`}
    >
      {label}
    </button>
  );
}

function PodiumCard({
  rank,
  name,
  country,
  points,
  height,
  winner,
}: {
  rank: number;
  name: string;
  country: string;
  points: number;
  height: string;
  winner?: boolean;
}) {
  const getRankColor = () => {
    if (rank === 1) return 'from-yellow-500 to-yellow-700';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-orange-600 to-orange-800';
    return 'from-gray-600 to-gray-800';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${getRankColor()} rounded-full flex items-center justify-center shadow-xl ${
            winner ? 'ring-4 ring-yellow-400/50' : ''
          }`}
        >
          <span className="text-2xl font-bold text-white">#{rank}</span>
        </div>
      </div>
      <div className={`${height} w-full bg-gradient-to-t ${getRankColor()} rounded-t-xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        {winner && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2">
            <Trophy className="w-6 h-6 text-yellow-200 animate-bounce" />
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-xl">{country}</span>
          <span className="font-bold text-white">{name}</span>
        </div>
        <div className="text-sm text-gray-400">{points} pts</div>
      </div>
    </div>
  );
}

function LeaderboardRow({
  rank,
  name,
  country,
  points,
  change,
  highlight,
}: {
  rank: number;
  name: string;
  country: string;
  points: number;
  change: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
        highlight
          ? 'bg-gradient-to-r from-red-600/20 via-red-600/10 to-red-600/20 border border-red-600/50 shadow-lg'
          : 'bg-gray-900/50 hover:bg-gray-900 border border-gray-800/50'
      }`}
    >
      <div className="w-12 text-center">
        <span className="text-lg font-bold text-gray-400">#{rank}</span>
      </div>
      <div className="flex items-center gap-3 flex-1">
        <span className="text-2xl">{country}</span>
        <span className="font-medium text-white">{name}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-bold text-white">{points} pts</div>
        </div>
        <div className="w-16 text-right">
          {change > 0 && (
            <span className="text-green-500 text-sm flex items-center justify-end gap-1">
              <TrendingUp className="w-4 h-4" />+{change}
            </span>
          )}
          {change < 0 && (
            <span className="text-red-500 text-sm flex items-center justify-end gap-1">
              <TrendingUp className="w-4 h-4 rotate-180" />
              {change}
            </span>
          )}
          {change === 0 && <span className="text-gray-500 text-sm">-</span>}
        </div>
      </div>
    </div>
  );
}