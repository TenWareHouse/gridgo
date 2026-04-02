import { Crown, X, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Driver, Team } from '../../pages/LineupBuilder';

interface MyLineupProps {
  selectedDrivers: Driver[];
  selectedTeam: Team | null;
  captainId: number | null;
  remainingBudget: number;
  totalBudget: number;
  usedBudget: number;
  onRemoveDriver: (driverId: number) => void;
  onRemoveTeam: () => void;
  onSetCaptain: (driverId: number) => void;
  isLineupComplete: boolean;
}

export function MyLineup({
  selectedDrivers,
  selectedTeam,
  captainId,
  remainingBudget,
  totalBudget,
  usedBudget,
  onRemoveDriver,
  onRemoveTeam,
  onSetCaptain,
  isLineupComplete,
}: MyLineupProps) {
  return (
    <div className="sticky top-20">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-1">我的阵容</h2>
          <p className="text-sm text-gray-400">选择你的梦之队</p>
        </div>

        {/* Budget Display */}
        <div className="p-6 border-b border-gray-800 bg-black/40">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">剩余预算</div>
              <div className={`text-4xl font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-green-500'}`}>
                ${remainingBudget.toFixed(1)}M
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-1">已用 / 总预算</div>
              <div className="text-sm text-white">
                ${usedBudget.toFixed(1)}M / ${totalBudget}M
              </div>
            </div>
          </div>

          {/* Budget Bar */}
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative">
            <div
              className={`h-full rounded-full shadow-lg transition-all ${
                remainingBudget < 0
                  ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-red-600/50'
                  : 'bg-gradient-to-r from-green-600 to-green-500 shadow-green-600/50'
              }`}
              style={{ width: `${Math.min((usedBudget / totalBudget) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Team Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-px bg-red-600"></div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">车队选择</span>
          </div>

          {selectedTeam ? (
            <SelectedTeamCard team={selectedTeam} onRemove={onRemoveTeam} />
          ) : (
            <EmptySlot type="车队" />
          )}
        </div>

        {/* Drivers Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-px bg-red-600"></div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">车手阵容</span>
          </div>

          <div className="space-y-3">
            {selectedDrivers[0] ? (
              <SelectedDriverCard
                driver={selectedDrivers[0]}
                isCaptain={captainId === selectedDrivers[0].id}
                onRemove={() => onRemoveDriver(selectedDrivers[0].id)}
                onSetCaptain={() => onSetCaptain(selectedDrivers[0].id)}
              />
            ) : (
              <EmptySlot type="车手 1" />
            )}

            {selectedDrivers[1] ? (
              <SelectedDriverCard
                driver={selectedDrivers[1]}
                isCaptain={captainId === selectedDrivers[1].id}
                onRemove={() => onRemoveDriver(selectedDrivers[1].id)}
                onSetCaptain={() => onSetCaptain(selectedDrivers[1].id)}
              />
            ) : (
              <EmptySlot type="车手 2" />
            )}
          </div>
        </div>

        {/* Captain Reminder */}
        {selectedDrivers.length === 2 && !captainId && (
          <div className="p-4 m-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-yellow-500 mb-1">请设置队长</div>
              <div className="text-xs text-gray-400">队长将获得双倍积分</div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="p-6">
          <button
            disabled={!isLineupComplete || remainingBudget < 0}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isLineupComplete && remainingBudget >= 0
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/50 hover:shadow-red-600/70 hover:scale-105'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isLineupComplete && remainingBudget >= 0 ? '确认阵容' : '完成选择以提交'}
          </button>

          {isLineupComplete && remainingBudget >= 0 && (
            <div className="mt-3 text-center text-xs text-green-500 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              阵容已完成，可以提交
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SelectedDriverCard({
  driver,
  isCaptain,
  onRemove,
  onSetCaptain,
}: {
  driver: Driver;
  isCaptain: boolean;
  onRemove: () => void;
  onSetCaptain: () => void;
}) {
  return (
    <div className={`bg-gray-800/50 border rounded-xl p-3 transition-all group ${
      isCaptain ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' : 'border-gray-700/50'
    }`}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-lg font-bold text-white border-2 border-gray-600">
            {driver.name.split(' ').map(n => n[0]).join('')}
          </div>
          {isCaptain && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
              <Crown className="w-3 h-3 text-black" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-sm truncate">{driver.name}</h4>
          <p className="text-xs text-gray-400 truncate">{driver.team}</p>
          <p className="text-xs text-red-500 font-bold">${driver.price}M</p>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={onSetCaptain}
            className={`p-1.5 rounded transition-all ${
              isCaptain
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 text-gray-400 hover:bg-yellow-500 hover:text-black'
            }`}
            title="设为队长"
          >
            <Crown className="w-4 h-4" />
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 bg-gray-700 hover:bg-red-600 text-gray-400 hover:text-white rounded transition-all"
            title="移除"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SelectedTeamCard({ team, onRemove }: { team: Team; onRemove: () => void }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-3 hover:border-red-600/50 transition-all group">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-xs"
          style={{ backgroundColor: team.color }}
        >
          {team.name.substring(0, 3).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-sm truncate">{team.name}</h4>
          <p className="text-xs text-gray-400">车队</p>
          <p className="text-xs text-red-500 font-bold">${team.price}M</p>
        </div>

        <button
          onClick={onRemove}
          className="p-1.5 bg-gray-700 hover:bg-red-600 text-gray-400 hover:text-white rounded transition-all"
          title="移除"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function EmptySlot({ type }: { type: string }) {
  return (
    <div className="border-2 border-dashed border-gray-700 rounded-xl p-4 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-gray-800 rounded-lg mx-auto mb-2 flex items-center justify-center">
          <span className="text-2xl text-gray-600">?</span>
        </div>
        <p className="text-xs text-gray-500">选择{type}</p>
      </div>
    </div>
  );
}
