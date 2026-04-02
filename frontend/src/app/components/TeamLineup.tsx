import { Crown, Star, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const drivers = [
  { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', points: 25, price: 30.5, isCaptain: true, trend: 'up' },
  { id: 2, name: 'Lewis Hamilton', team: 'Ferrari', points: 18, price: 28.0, isCaptain: false, trend: 'up' },
];

const team = { name: 'Red Bull Racing', points: 20, price: 25.0 };

export function TeamLineup() {
  const totalBudget = 100;
  const usedBudget = drivers.reduce((sum, d) => sum + d.price, 0) + team.price;
  const remainingBudget = totalBudget - usedBudget;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">我的阵容</h3>
          <p className="text-sm text-gray-400">本周竞技阵容</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400 mb-1">剩余预算</div>
          <div className="text-3xl font-bold text-red-500">${remainingBudget.toFixed(1)}M</div>
        </div>
      </div>

      {/* Budget Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-lg shadow-red-600/50 transition-all"
            style={{ width: `${(usedBudget / totalBudget) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>已使用 ${usedBudget.toFixed(1)}M</span>
          <span>总预算 ${totalBudget}M</span>
        </div>
      </div>

      {/* Drivers */}
      <div className="space-y-3 mb-6">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
          <div className="w-8 h-px bg-red-600"></div>
          车手阵容
        </div>
        {drivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>

      {/* Team */}
      <div className="space-y-3">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
          <div className="w-8 h-px bg-red-600"></div>
          车队选择
        </div>
        <TeamCard team={team} />
      </div>
    </div>
  );
}

function DriverCard({ driver }: { driver: typeof drivers[0] }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-red-600/50 transition-all group">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold text-white border-2 border-gray-600">
            {driver.name.split(' ').map(n => n[0]).join('')}
          </div>
          {driver.isCaptain && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
              <Crown className="w-3 h-3 text-black" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-white">{driver.name}</h4>
            {driver.isCaptain && (
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded text-xs font-bold">
                队长
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400">{driver.team}</p>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-bold text-white">{driver.points} pts</span>
            {driver.trend === 'up' && (
              <TrendingUp className="w-4 h-4 text-green-500" />
            )}
          </div>
          <div className="text-sm text-red-500 font-bold">${driver.price}M</div>
        </div>
      </div>
    </div>
  );
}

function TeamCard({ team }: { team: typeof team }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-red-600/50 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764014105988-24a912266a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmMSUyMHJhY2luZyUyMGNhciUyMHNwZWVkJTIwbW90aW9ufGVufDF8fHx8MTc3MzQwMTU5MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Team"
            className="w-full h-full object-cover rounded-lg opacity-80"
          />
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-white mb-1">{team.name}</h4>
          <p className="text-sm text-gray-400">车队</p>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-bold text-white">{team.points} pts</span>
          </div>
          <div className="text-sm text-red-500 font-bold">${team.price}M</div>
        </div>
      </div>
    </div>
  );
}
