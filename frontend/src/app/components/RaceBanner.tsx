import { ChevronRight, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export function RaceBanner() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const raceDate = new Date('2026-03-20T14:00:00');
    const now = new Date();
    const difference = raceDate.getTime() - now.getTime();

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-600/30 shadow-2xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760456014988-c3b33cd832f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtdWxhJTIwMSUyMHJhY2UlMjB0cmFjayUyMGFlcmlhbHxlbnwxfHx8fDE3NzM0MDE1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Race Track"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        
        {/* Speed Lines Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-8 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="px-3 py-1 bg-red-600 rounded-full text-xs text-white font-bold uppercase tracking-wider shadow-lg shadow-red-600/50">
              下一场比赛
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            澳大利亚大奖赛
          </h2>

          <div className="flex items-center gap-6 text-gray-300 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="text-sm">墨尔本阿尔伯特公园赛道</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-500" />
              <span className="text-sm">2026年3月20日 14:00</span>
            </div>
          </div>

          <Link
            to="/lineup"
            className="inline-flex px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold items-center gap-2 transition-all shadow-lg shadow-red-600/50 hover:shadow-red-600/70 hover:scale-105"
          >
            立即调整阵容
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Countdown Timer */}
        <div className="flex gap-4">
          <CountdownUnit value={timeLeft.days} label="天" />
          <CountdownUnit value={timeLeft.hours} label="时" />
          <CountdownUnit value={timeLeft.minutes} label="分" />
          <CountdownUnit value={timeLeft.seconds} label="秒" />
        </div>
      </div>
    </div>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black border-2 border-red-600/50 rounded-xl flex items-center justify-center shadow-xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-red-600/10 blur-xl"></div>
        <span className="text-3xl font-bold text-white relative z-10">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs text-gray-400 mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );
}