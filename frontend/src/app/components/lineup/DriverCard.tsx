import { Plus, TrendingUp, TrendingDown, Minus, Ban, CheckCircle2 } from 'lucide-react';
import type { Driver } from '../../pages/LineupBuilder';

interface DriverCardProps {
  driver: Driver;
  onSelect: (driver: Driver) => void;
  canAfford: boolean;
}

export function DriverCard({ driver, onSelect, canAfford }: DriverCardProps) {
  const isSelected = driver.status === 'selected';
  const isUnavailable = driver.status === 'unavailable';
  
  const avgForm = driver.form.reduce((a, b) => a + b, 0) / driver.form.length;
  const lastForm = driver.form[driver.form.length - 1];
  const formTrend = lastForm > avgForm ? 'up' : lastForm < avgForm ? 'down' : 'stable';

  return (
    <div className={`bg-gray-800/50 border rounded-xl p-4 transition-all ${
      isSelected
        ? 'border-red-600 shadow-lg shadow-red-600/20'
        : isUnavailable
        ? 'border-gray-700/30 opacity-50'
        : 'border-gray-700/50 hover:border-red-600/50'
    }`}>
      <div className="flex items-center gap-4">
        {/* Driver Avatar */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-2xl font-bold text-white border-2 border-gray-600">
            {driver.name.split(' ').map(n => n[0]).join('')}
          </div>
          {isUnavailable && (
            <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
              <Ban className="w-6 h-6 text-red-500" />
            </div>
          )}
          {isSelected && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Driver Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white">{driver.name}</h3>
            <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300 font-mono">
              {driver.nationality}
            </span>
            {isUnavailable && (
              <span className="px-2 py-0.5 bg-red-600/20 text-red-500 rounded text-xs font-bold">
                不可用
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mb-2">{driver.team}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">总积分:</span>
              <span className="text-white font-bold">{driver.points}</span>
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
          {driver.form.map((points, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className="w-3 bg-gradient-to-t from-red-600 to-red-500 rounded-t"
                style={{ height: `${(points / 25) * 48}px` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Price & Action */}
        <div className="text-right">
          <div className="text-2xl font-bold text-red-500 mb-2">${driver.price}M</div>
          
          {isSelected ? (
            <div className="px-4 py-2 bg-red-600/20 border border-red-600 text-red-500 rounded-lg text-sm font-bold">
              已选择
            </div>
          ) : isUnavailable ? (
            <div className="px-4 py-2 bg-gray-700 text-gray-500 rounded-lg text-sm font-bold cursor-not-allowed">
              不可选
            </div>
          ) : (
            <button
              onClick={() => onSelect(driver)}
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
