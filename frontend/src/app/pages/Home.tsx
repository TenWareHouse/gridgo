import { Navbar } from '../components/Navbar';
import { RaceBanner } from '../components/RaceBanner';
import { StatsPanel } from '../components/StatsPanel';
import { TeamLineup } from '../components/TeamLineup';
import { QuickActions } from '../components/QuickActions';
import { NewsCard } from '../components/NewsCard';
import { useLanguage } from '../contexts/LanguageContext';

export function Home() {
  const { t } = useLanguage();

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

        <main className="max-w-[1440px] mx-auto px-8 py-8 space-y-8">
          {/* Race Banner */}
          <RaceBanner />

          {/* Stats Panel */}
          <StatsPanel />

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Team Lineup - Takes 2 columns */}
            <div className="col-span-2">
              <TeamLineup />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Stats Card */}
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">{t('home.quickStats')}</h3>
                <div className="space-y-4">
                  <StatRow label={t('home.stat.weeks')} value="3 / 23" />
                  <StatRow label={t('home.stat.avgPoints')} value="415.7" />
                  <StatRow label={t('home.stat.highestWeek')} value="89" />
                  <StatRow label={t('home.stat.globalPlayers')} value="2.4M" />
                </div>
              </div>

              {/* Leaderboard Preview */}
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">{t('home.leaderboardPreview')}</h3>
                <div className="space-y-3">
                  <LeaderboardRow rank={1} name="SpeedKing_2026" points={1520} />
                  <LeaderboardRow rank={2} name="RaceMaster" points={1498} />
                  <LeaderboardRow rank={3} name="F1Champion" points={1476} highlight />
                  <div className="h-px bg-gray-700 my-2"></div>
                  <LeaderboardRow rank={2845} name={t('home.you')} points={1247} highlight />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* News Section */}
          <NewsCard />
        </main>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}

function LeaderboardRow({
  rank,
  name,
  points,
  highlight,
}: {
  rank: number;
  name: string;
  points: number;
  highlight?: boolean;
}) {
  const getRankColor = () => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-600';
    return 'text-gray-500';
  };

  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg ${
        highlight ? 'bg-red-600/20 border border-red-600/50' : ''
      }`}
    >
      <div className={`w-8 text-center font-bold ${getRankColor()}`}>#{rank}</div>
      <div className="flex-1 text-sm text-white font-medium">{name}</div>
      <div className="text-sm text-gray-400">{points} pts</div>
    </div>
  );
}