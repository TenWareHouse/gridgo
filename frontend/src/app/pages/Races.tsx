import { Navbar } from '../components/Navbar';
import { Calendar, MapPin, Trophy, Clock, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Races() {
  const { t } = useLanguage();
  const races = [
    {
      round: 1,
      name: '巴林大奖赛',
      location: '萨基尔',
      country: '🇧🇭 巴林',
      date: '2026-03-02',
      status: 'completed',
      winner: 'M. Verstappen',
      pole: 'C. Leclerc',
      fastestLap: 'L. Hamilton',
    },
    {
      round: 2,
      name: '沙特阿拉伯大奖赛',
      location: '吉达',
      country: '🇸🇦 沙特',
      date: '2026-03-09',
      status: 'completed',
      winner: 'S. Perez',
      pole: 'M. Verstappen',
      fastestLap: 'C. Leclerc',
    },
    {
      round: 3,
      name: '澳大利亚大奖赛',
      location: '墨尔本',
      country: '🇦🇺 澳大利亚',
      date: '2026-03-16',
      status: 'completed',
      winner: 'C. Leclerc',
      pole: 'M. Verstappen',
      fastestLap: 'C. Leclerc',
    },
    {
      round: 4,
      name: '日本大奖赛',
      location: '铃鹿',
      country: '🇯🇵 日本',
      date: '2026-03-23',
      status: 'upcoming',
      circuit: '铃鹿国际赛车场',
      laps: 53,
      distance: '307.471 km',
    },
    {
      round: 5,
      name: '中国大奖赛',
      location: '上海',
      country: '🇨🇳 中国',
      date: '2026-03-30',
      status: 'upcoming',
      circuit: '上海国际赛车场',
      laps: 56,
      distance: '305.066 km',
    },
    {
      round: 6,
      name: '迈阿密大奖赛',
      location: '迈阿密',
      country: '🇺🇸 美国',
      date: '2026-04-06',
      status: 'upcoming',
      circuit: '迈阿密国际赛道',
      laps: 57,
      distance: '308.326 km',
    },
  ];

  const upcomingRaces = races.filter((race) => race.status === 'upcoming');
  const completedRaces = races.filter((race) => race.status === 'completed');

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
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">{t('races.title')}</h1>
                <p className="text-gray-400 mt-1">{t('races.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* Season Overview */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl border border-red-600/30 p-6 shadow-xl">
              <div className="text-sm text-gray-400 mb-2">赛季进度</div>
              <div className="text-3xl font-bold text-white mb-2">3 / 23</div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-500 h-full" style={{ width: '13%' }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl border border-red-600/30 p-6 shadow-xl">
              <div className="text-sm text-gray-400 mb-2">下场比赛</div>
              <div className="text-2xl font-bold text-white">日本 GP</div>
              <div className="text-sm text-gray-500 mt-1">3月23日</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl border border-red-600/30 p-6 shadow-xl">
              <div className="text-sm text-gray-400 mb-2">积分领先者</div>
              <div className="text-2xl font-bold text-white">M. Verstappen</div>
              <div className="text-sm text-gray-500 mt-1">75 pts</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl border border-red-600/30 p-6 shadow-xl">
              <div className="text-sm text-gray-400 mb-2">车队冠军</div>
              <div className="text-2xl font-bold text-white">Red Bull</div>
              <div className="text-sm text-gray-500 mt-1">123 pts</div>
            </div>
          </div>

          {/* Upcoming Races */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-red-500" />
              {t('races.upcoming')}
            </h2>
            <div className="space-y-4">
              {upcomingRaces.map((race) => (
                <UpcomingRaceCard key={race.round} race={race} />
              ))}
            </div>
          </div>

          {/* Completed Races */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-red-500" />
              {t('races.completed')}
            </h2>
            <div className="space-y-4">
              {completedRaces.map((race) => (
                <CompletedRaceCard key={race.round} race={race} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function UpcomingRaceCard({ race }: { race: any }) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-xl hover:border-red-600/50 transition-all group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-500 mb-1">R{race.round}</div>
            <div className="text-xs text-gray-500 uppercase">回合</div>
          </div>
          <div className="h-16 w-px bg-gray-800"></div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{race.name}</h3>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{race.country}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(race.date)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <div className="text-sm text-gray-400">赛道</div>
            <div className="text-white font-medium">{race.circuit}</div>
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-gray-400">圈数: </span>
              <span className="text-white font-medium">{race.laps}</span>
            </div>
            <div>
              <span className="text-gray-400">距离: </span>
              <span className="text-white font-medium">{race.distance}</span>
            </div>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" />
      </div>
    </div>
  );
}

function CompletedRaceCard({ race }: { race: any }) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-gray-800 p-6 shadow-xl opacity-80 hover:opacity-100 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600 mb-1">R{race.round}</div>
            <div className="text-xs text-gray-600 uppercase">已完成</div>
          </div>
          <div className="h-16 w-px bg-gray-800"></div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{race.name}</h3>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{race.country}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(race.date)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          <div>
            <div className="text-xs text-gray-500 mb-1">冠军</div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-white font-medium">{race.winner}</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">杆位</div>
            <div className="text-white font-medium">{race.pole}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">最快圈速</div>
            <div className="text-white font-medium">{race.fastestLap}</div>
          </div>
        </div>
      </div>
    </div>
  );
}