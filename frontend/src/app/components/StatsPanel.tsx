import { Trophy, TrendingUp, Award } from 'lucide-react';

export function StatsPanel() {
  const stats = [
    {
      label: '本周积分',
      value: '63',
      change: '+12',
      icon: Trophy,
      color: 'red',
    },
    {
      label: '赛季总积分',
      value: '1,247',
      change: '+63',
      icon: Award,
      color: 'yellow',
    },
    {
      label: '当前排名',
      value: '#2,845',
      change: '↑ 128',
      icon: TrendingUp,
      color: 'green',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  change,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}) {
  const colorClasses = {
    red: 'from-red-600 to-red-800 shadow-red-600/50',
    yellow: 'from-yellow-600 to-yellow-800 shadow-yellow-600/50',
    green: 'from-green-600 to-green-800 shadow-green-600/50',
  }[color];

  const changeColor = change.includes('↑') || change.includes('+') ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 relative overflow-hidden group hover:border-red-600/60 transition-all shadow-xl">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`px-3 py-1 bg-black/50 rounded-full text-xs font-bold ${changeColor}`}>
            {change}
          </div>
        </div>

        <div className="text-4xl font-bold text-white mb-2">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  );
}
