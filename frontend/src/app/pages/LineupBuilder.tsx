import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { 
  Crown, 
  Plus, 
  X, 
  Check, 
  TrendingUp, 
  TrendingDown, 
  Flag,
  MapPin,
  Clock,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

// Mock Data
const availableDrivers = [
  { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', price: 30.5, points: 25, trend: 'up', status: 'fit' },
  { id: 2, name: 'Lewis Hamilton', team: 'Ferrari', price: 28.0, points: 18, trend: 'up', status: 'fit' },
  { id: 3, name: 'Charles Leclerc', team: 'Ferrari', price: 26.5, points: 15, trend: 'down', status: 'fit' },
  { id: 4, name: 'Lando Norris', team: 'McLaren', price: 24.0, points: 12, trend: 'up', status: 'fit' },
  { id: 5, name: 'George Russell', team: 'Mercedes', price: 23.5, points: 10, trend: 'neutral', status: 'fit' },
  { id: 6, name: 'Carlos Sainz', team: 'Williams', price: 22.0, points: 8, trend: 'up', status: 'fit' },
  { id: 7, name: 'Oscar Piastri', team: 'McLaren', price: 21.0, points: 6, trend: 'up', status: 'fit' },
  { id: 8, name: 'Fernando Alonso', team: 'Aston Martin', price: 20.5, points: 4, trend: 'down', status: 'injured' },
];

const availableTeams = [
  { id: 1, name: 'Red Bull Racing', price: 25.0, points: 43, trend: 'up', status: 'fit' },
  { id: 2, name: 'Ferrari', price: 23.0, points: 33, trend: 'up', status: 'fit' },
  { id: 3, name: 'McLaren', price: 21.5, points: 28, trend: 'up', status: 'fit' },
  { id: 4, name: 'Mercedes', price: 20.0, points: 18, trend: 'neutral', status: 'fit' },
  { id: 5, name: 'Aston Martin', price: 18.5, points: 12, trend: 'down', status: 'fit' },
];

type Driver = typeof availableDrivers[0];
type Team = typeof availableTeams[0];

export function LineupBuilder() {
  const totalBudget = 100;
  const [selectedDrivers, setSelectedDrivers] = useState<Driver[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [captainId, setCaptainId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'drivers' | 'teams'>('drivers');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const lockTime = new Date('2026-03-20T12:00:00');
    const now = new Date();
    const difference = lockTime.getTime() - now.getTime();

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  const usedBudget = 
    selectedDrivers.reduce((sum, d) => sum + d.price, 0) + 
    (selectedTeam?.price || 0);
  const remainingBudget = totalBudget - usedBudget;

  const canAddDriver = (driver: Driver) => {
    if (selectedDrivers.length >= 2) return false;
    if (selectedDrivers.find(d => d.id === driver.id)) return false;
    return remainingBudget >= driver.price;
  };

  const canAddTeam = (team: Team) => {
    if (selectedTeam) return false;
    return remainingBudget >= team.price;
  };

  const addDriver = (driver: Driver) => {
    if (canAddDriver(driver)) {
      setSelectedDrivers([...selectedDrivers, driver]);
    }
  };

  const removeDriver = (driverId: number) => {
    setSelectedDrivers(selectedDrivers.filter(d => d.id !== driverId));
    if (captainId === driverId) setCaptainId(null);
  };

  const addTeam = (team: Team) => {
    if (canAddTeam(team)) {
      setSelectedTeam(team);
    }
  };

  const removeTeam = () => {
    setSelectedTeam(null);
  };

  const isLineupComplete = selectedDrivers.length === 2 && selectedTeam && captainId;

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
          {/* Race Info Header */}
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 mb-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/50">
                  <Flag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">澳大利亚大奖赛 - {t('lineup.title')}</h1>
                  <div className="flex items-center gap-6 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{t('lineup.location')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span>{t('lineup.date')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="text-right">
                <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider">{t('lineup.lockdown')}</div>
                <div className="flex gap-2">
                  <div className="bg-gray-800 border border-red-600/50 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-gray-500">{t('lineup.hour')}</div>
                  </div>
                  <div className="bg-gray-800 border border-red-600/50 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-gray-500">{t('lineup.minute')}</div>
                  </div>
                  <div className="bg-gray-800 border border-red-600/50 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-gray-500">{t('lineup.second')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left Sidebar - My Lineup */}
            <div className="col-span-4 space-y-6">
              {/* Budget Panel */}
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{t('lineup.budget')}</h3>
                  <div className={`text-3xl font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    ${remainingBudget.toFixed(1)}M
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        usedBudget > totalBudget
                          ? 'bg-red-600'
                          : 'bg-gradient-to-r from-red-600 to-red-500'
                      }`}
                      style={{ width: `${Math.min((usedBudget / totalBudget) * 100, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t('lineup.used')}</span>
                    <span className="text-white font-bold">${usedBudget.toFixed(1)}M / ${totalBudget}M</span>
                  </div>
                </div>

                {remainingBudget < 0 && (
                  <div className="mt-4 bg-red-600/20 border border-red-600/50 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400">{t('lineup.overbudget')}</p>
                  </div>
                )}
              </div>

              {/* My Lineup */}
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6">{t('lineup.myLineup')}</h3>

                {/* Drivers Section */}
                <div className="mb-6">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-6 h-px bg-red-600"></div>
                    {t('lineup.drivers')} ({selectedDrivers.length}/2)
                  </div>

                  <div className="space-y-3">
                    {[0, 1].map((index) => {
                      const driver = selectedDrivers[index];
                      if (!driver) {
                        return (
                          <div
                            key={index}
                            className="border-2 border-dashed border-gray-700 rounded-xl p-4 flex items-center justify-center h-24"
                          >
                            <span className="text-gray-600 text-sm">{t('lineup.selectDriver')} {index + 1}</span>
                          </div>
                        );
                      }

                      return (
                        <SelectedDriverCard
                          key={driver.id}
                          driver={driver}
                          isCaptain={captainId === driver.id}
                          onRemove={() => removeDriver(driver.id)}
                          onSetCaptain={() => setCaptainId(driver.id)}
                          t={t}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Team Section */}
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-6 h-px bg-red-600"></div>
                    {t('lineup.team')} ({selectedTeam ? 1 : 0}/1)
                  </div>

                  {selectedTeam ? (
                    <SelectedTeamCard team={selectedTeam} onRemove={removeTeam} />
                  ) : (
                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-4 flex items-center justify-center h-24">
                      <span className="text-gray-600 text-sm">{t('lineup.selectTeam')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={!isLineupComplete || remainingBudget < 0}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${
                  isLineupComplete && remainingBudget >= 0
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/50 hover:scale-105'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                }`}
              >
                <Check className="w-6 h-6" />
                {t('lineup.submit')}
              </button>
            </div>

            {/* Right Content - Available Options */}
            <div className="col-span-8">
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-2xl">
                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setActiveTab('drivers')}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                      activeTab === 'drivers'
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {t('lineup.availableDrivers')}
                  </button>
                  <button
                    onClick={() => setActiveTab('teams')}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                      activeTab === 'teams'
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {t('lineup.availableTeams')}
                  </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-800/50 rounded-lg mb-3 text-xs text-gray-400 uppercase tracking-wider">
                  <div className="col-span-4">{t('lineup.name')}</div>
                  <div className="col-span-3">{activeTab === 'drivers' ? t('lineup.teamName') : t('lineup.weekPoints')}</div>
                  <div className="col-span-2">{t('lineup.price')}</div>
                  <div className="col-span-2">{t('lineup.trend')}</div>
                  <div className="col-span-1 text-center">{t('lineup.action')}</div>
                </div>

                {/* List */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {activeTab === 'drivers' &&
                    availableDrivers.map((driver) => (
                      <DriverListItem
                        key={driver.id}
                        driver={driver}
                        isSelected={!!selectedDrivers.find(d => d.id === driver.id)}
                        canAdd={canAddDriver(driver)}
                        onAdd={() => addDriver(driver)}
                      />
                    ))}

                  {activeTab === 'teams' &&
                    availableTeams.map((team) => (
                      <TeamListItem
                        key={team.id}
                        team={team}
                        isSelected={selectedTeam?.id === team.id}
                        canAdd={canAddTeam(team)}
                        onAdd={() => addTeam(team)}
                      />
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

function SelectedDriverCard({
  driver,
  isCaptain,
  onRemove,
  onSetCaptain,
  t,
}: {
  driver: Driver;
  isCaptain: boolean;
  onRemove: () => void;
  onSetCaptain: () => void;
  t: (key: string) => string;
}) {
  return (
    <div className={`bg-gray-800/50 border rounded-xl p-3 ${isCaptain ? 'border-yellow-500 shadow-lg shadow-yellow-500/30' : 'border-gray-700/50'}`}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-sm font-bold text-white">
            {driver.name.split(' ').map(n => n[0]).join('')}
          </div>
          {isCaptain && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
              <Crown className="w-3 h-3 text-black" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-sm truncate">{driver.name}</h4>
          <p className="text-xs text-gray-400">{driver.team}</p>
        </div>

        <div className="text-right flex items-center gap-2">
          <div>
            <div className="text-sm font-bold text-red-500">${driver.price}M</div>
          </div>
          
          <button
            onClick={onSetCaptain}
            className={`p-1.5 rounded ${
              isCaptain ? 'bg-yellow-500/20' : 'bg-gray-700 hover:bg-yellow-500/20'
            }`}
            title="设为队长"
          >
            <Crown className={`w-4 h-4 ${isCaptain ? 'text-yellow-500' : 'text-gray-400'}`} />
          </button>

          <button
            onClick={onRemove}
            className="p-1.5 bg-red-600/20 hover:bg-red-600/40 rounded"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SelectedTeamCard({ team, onRemove }: { team: Team; onRemove: () => void }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764014105988-24a912266a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmMSUyMHJhY2luZyUyMGNhciUyMHNwZWVkJTIwbW90aW9ufGVufDF8fHx8MTc3MzQwMTU5MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt={team.name}
            className="w-full h-full object-cover rounded-lg opacity-80"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-sm truncate">{team.name}</h4>
          <p className="text-xs text-gray-400">车队</p>
        </div>

        <div className="text-right flex items-center gap-2">
          <div className="text-sm font-bold text-red-500">${team.price}M</div>
          
          <button
            onClick={onRemove}
            className="p-1.5 bg-red-600/20 hover:bg-red-600/40 rounded"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DriverListItem({
  driver,
  isSelected,
  canAdd,
  onAdd,
}: {
  driver: Driver;
  isSelected: boolean;
  canAdd: boolean;
  onAdd: () => void;
}) {
  const getTrendIcon = () => {
    if (driver.trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (driver.trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4"></div>;
  };

  return (
    <div className={`grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg transition-all ${
      isSelected 
        ? 'bg-green-600/20 border border-green-600/50' 
        : 'bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/30 hover:border-gray-700'
    }`}>
      <div className="col-span-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-xs font-bold text-white">
          {driver.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">{driver.name}</h4>
          {driver.status === 'injured' && (
            <span className="text-xs text-orange-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              伤病
            </span>
          )}
        </div>
      </div>

      <div className="col-span-3 text-sm text-gray-400">{driver.team}</div>
      
      <div className="col-span-2 text-sm font-bold text-red-500">${driver.price}M</div>
      
      <div className="col-span-2 flex items-center gap-2">
        {getTrendIcon()}
        <span className="text-sm text-gray-400">{driver.points} pts</span>
      </div>

      <div className="col-span-1 flex justify-center">
        {isSelected ? (
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
        ) : (
          <button
            onClick={onAdd}
            disabled={!canAdd}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              canAdd
                ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/50'
                : 'bg-gray-700 cursor-not-allowed'
            }`}
          >
            <Plus className={`w-5 h-5 ${canAdd ? 'text-white' : 'text-gray-500'}`} />
          </button>
        )}
      </div>
    </div>
  );
}

function TeamListItem({
  team,
  isSelected,
  canAdd,
  onAdd,
}: {
  team: Team;
  isSelected: boolean;
  canAdd: boolean;
  onAdd: () => void;
}) {
  const getTrendIcon = () => {
    if (team.trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (team.trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4"></div>;
  };

  return (
    <div className={`grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg transition-all ${
      isSelected 
        ? 'bg-green-600/20 border border-green-600/50' 
        : 'bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/30 hover:border-gray-700'
    }`}>
      <div className="col-span-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764014105988-24a912266a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmMSUyMHJhY2luZyUyMGNhciUyMHNwZWVkJTIwbW90aW9ufGVufDF8fHx8MTc3MzQwMTU5MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt={team.name}
            className="w-full h-full object-cover rounded-lg opacity-80"
          />
        </div>
        <h4 className="font-bold text-white text-sm">{team.name}</h4>
      </div>

      <div className="col-span-3 text-sm text-gray-400">{team.points} 积分</div>
      
      <div className="col-span-2 text-sm font-bold text-red-500">${team.price}M</div>
      
      <div className="col-span-2 flex items-center gap-2">
        {getTrendIcon()}
      </div>

      <div className="col-span-1 flex justify-center">
        {isSelected ? (
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
        ) : (
          <button
            onClick={onAdd}
            disabled={!canAdd}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              canAdd
                ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/50'
                : 'bg-gray-700 cursor-not-allowed'
            }`}
          >
            <Plus className={`w-5 h-5 ${canAdd ? 'text-white' : 'text-gray-500'}`} />
          </button>
        )}
      </div>
    </div>
  );
}