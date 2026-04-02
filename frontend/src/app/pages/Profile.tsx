import { Navbar } from '../components/Navbar';
import { User, Trophy, TrendingUp, Award, Calendar, Target, Zap, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Profile() {
  const { t } = useLanguage();
  const achievements = [
    { id: 1, name: '首次登顶', description: '第一次进入前100名', icon: Trophy, earned: true },
    { id: 2, name: '连胜王', description: '连续3周积分增长', icon: TrendingUp, earned: true },
    { id: 3, name: '策略大师', description: '成功预测5次冠军', icon: Target, earned: true },
    { id: 4, name: '完美阵容', description: '单周积分超过150', icon: Star, earned: false },
    { id: 5, name: '赛季老将', description: '完成整个赛季', icon: Award, earned: false },
    { id: 6, name: '全球精英', description: '进入全球前1000名', icon: Zap, earned: false },
  ];

  const weeklyHistory = [
    { week: 1, race: '巴林 GP', points: 78, rank: 3245 },
    { week: 2, race: '沙特 GP', points: 85, rank: 2987 },
    { week: 3, race: '澳大利亚 GP', points: 89, rank: 2845 },
  ];

  const favoriteDrivers = [
    { name: 'M. Verstappen', team: 'Red Bull', picks: 3, avgPoints: 28.5 },
    { name: 'C. Leclerc', team: 'Ferrari', picks: 3, avgPoints: 24.3 },
    { name: 'L. Hamilton', team: 'Mercedes', picks: 2, avgPoints: 22.0 },
  ];

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
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-8 shadow-2xl mb-8">
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/50">
                <User className="w-16 h-16 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">RacingPro_2026</h1>
                <p className="text-gray-400 mb-4">加入于 2026年1月</p>
                <div className="flex gap-6">
                  <div>
                    <div className="text-sm text-gray-400">全球排名</div>
                    <div className="text-2xl font-bold text-white">#2,845</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">总积分</div>
                    <div className="text-2xl font-bold text-white">1,247</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">参赛周数</div>
                    <div className="text-2xl font-bold text-white">3</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">成就</div>
                    <div className="text-2xl font-bold text-white">3 / 6</div>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-600/50">
                编辑资料
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-2 space-y-8">
              {/* Weekly History */}
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-red-500" />
                  周积分历史
                </h2>
                <div className="space-y-3">
                  {weeklyHistory.map((week) => (
                    <div
                      key={week.week}
                      className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800"
                    >
                      <div className="text-center w-16">
                        <div className="text-2xl font-bold text-red-500">W{week.week}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{week.race}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-white">{week.points} pts</div>
                        <div className="text-sm text-gray-400">排名 #{week.rank}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorite Drivers */}
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-red-500" />
                  常用车手
                </h2>
                <div className="space-y-3">
                  {favoriteDrivers.map((driver) => (
                    <div
                      key={driver.name}
                      className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-white">{driver.name}</div>
                        <div className="text-sm text-gray-400">{driver.team}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">选择次数</div>
                        <div className="text-xl font-bold text-white">{driver.picks}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">平均积分</div>
                        <div className="text-xl font-bold text-red-500">{driver.avgPoints}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Achievements */}
            <div>
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-red-500" />
                  成就
                </h2>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border transition-all ${
                        achievement.earned
                          ? 'bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-600/50'
                          : 'bg-gray-900/30 border-gray-800 opacity-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            achievement.earned
                              ? 'bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg shadow-yellow-600/50'
                              : 'bg-gray-800'
                          }`}
                        >
                          <achievement.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-white mb-1">{achievement.name}</div>
                          <div className="text-sm text-gray-400">{achievement.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}