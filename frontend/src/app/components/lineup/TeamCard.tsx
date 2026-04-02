import { Plus, TrendingUp, TrendingDown, Minus, CheckCircle2 } from 'lucide-react';
import type { Team } from '../../pages/LineupBuilder';

interface TeamCardProps {
  team: Team;
  onSelect: (team: Team) => void;
  canAfford: boolean;
}

export function TeamCard({ team, onSelect, canAfford }: TeamCardProps) {
  const isSelected = team.status === 'selected';
  
  const avgForm = team.form.reduce((a, b) => a + b, 0) / team.form.length;
  const lastForm = team.form[team.form.length - 1];
  const formTrend = lastForm > avgForm ? 'up' : lastForm < avgForm ? 'down' : 'stable';

  return (
    <div className={`bg-gray-800/50 border rounded-xl p-4 transition-all ${
      isSelected
        ? 'border-red-600 shadow-lg shadow-red-600/20'
        : 'border-gray-700/50 hover:border-red-600/50'
    }`}>
      <div className="flex items-center gap-4">
        {/* Team Logo */}
        <div className="relative">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-white text-sm border-2 border-gray-600"
            style={{ backgroundColor: team.color }}
          >
            {team.name.substring(0, 3).toUpperCase()}
          </div>
          {isSelected && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Team Info */}
        <div className="flex-1">
          <h3 className="font-bold text-white mb-1 text-lg">{team.name}</h3>
          <p className="text-sm text-gray-400 mb-2">构造车队</p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">总积分:</span>
              <span className="text-white font-bold">{team.points}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">状态:</span>
              {formTrend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
              {formTrend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
              {formTrend === 'stable' && <Minus className="w-4 h-4 text-gray-500" />}
            </div>
          </div>
        </div>

        {/* Form Chart */}
        <div className="flex items-end gap-1 h-12">
          {team.form.map((points, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className="w-3 bg-gradient-to-t rounded-t"
                style={{
                  height: `${(points / 50) * 48}px`,
                  background: `linear-gradient(to top, ${team.color}, ${team.color}CC)`,
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Price & Action */}
        <div className="text-right">
          <div className="text-2xl font-bold text-red-500 mb-2">${team.price}M</div>
          
          {isSelected ? (
            <div className="px-4 py-2 bg-red-600/20 border border-red-600 text-red-500 rounded-lg text-sm font-bold">
              已选择
            </div>
          ) : (
            <button
              onClick={() => onSelect(team)}
              disabled={!canAfford}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                canAfford
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/50 hover:shadow-red-600/70'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
              {canAfford ? '选择' : '预算不足'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
