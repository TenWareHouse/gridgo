import { Users, Calendar, Trophy, Settings } from 'lucide-react';
import { Link } from 'react-router';

export function QuickActions() {
  const actions = [
    { icon: Users, label: '调整阵容', description: '选择你的车队和车手', color: 'red', to: '/lineup' },
    { icon: Calendar, label: '查看赛程', description: '浏览完整赛季日历', color: 'blue', to: '/races' },
    { icon: Trophy, label: '查看排行榜', description: '与全球玩家竞争', color: 'yellow', to: '/leaderboard' },
    { icon: Settings, label: '策略设置', description: '调整你的比赛策略', color: 'gray', to: '/profile' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <ActionButton key={index} {...action} />
      ))}
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  description,
  color,
  to,
}: {
  icon: any;
  label: string;
  description: string;
  color: string;
  to: string;
}) {
  const colorClasses = {
    red: 'from-red-600/20 to-red-800/20 border-red-600/50 hover:border-red-600 hover:shadow-red-600/50',
    blue: 'from-blue-600/20 to-blue-800/20 border-blue-600/50 hover:border-blue-600 hover:shadow-blue-600/50',
    yellow: 'from-yellow-600/20 to-yellow-800/20 border-yellow-600/50 hover:border-yellow-600 hover:shadow-yellow-600/50',
    gray: 'from-gray-600/20 to-gray-800/20 border-gray-600/50 hover:border-gray-600 hover:shadow-gray-600/50',
  }[color];

  return (
    <Link to={to} className={`bg-gradient-to-br ${colorClasses} border rounded-xl p-6 text-left transition-all hover:scale-105 hover:shadow-xl group block`}>
      <Icon className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
      <h4 className="font-bold text-white mb-1">{label}</h4>
      <p className="text-xs text-gray-400">{description}</p>
    </Link>
  );
}