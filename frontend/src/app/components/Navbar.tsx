import { Trophy, Home, Users, Calendar, User, Languages } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import f1Logo from '../../assets/9da56f48e89f48151aabf4f9ed370e465539cc00.png';
import { useLanguage } from '../contexts/LanguageContext';

export function Navbar() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-red-600/30 sticky top-0 z-50">
      <div className="mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={f1Logo} alt="F1 Logo" className="h-10 w-auto" />
          <div className="h-8 w-px bg-red-600/50"></div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">FANTASY</h1>
            <p className="text-[10px] text-red-500 uppercase tracking-wider">Manager Pro</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          <NavLink icon={Home} label={t('nav.home')} to="/" active={location.pathname === '/'} />
          <NavLink icon={Users} label={t('nav.lineup')} to="/lineup" active={location.pathname === '/lineup'} />
          <NavLink icon={Trophy} label={t('nav.leaderboard')} to="/leaderboard" active={location.pathname === '/leaderboard'} />
          <NavLink icon={Calendar} label={t('nav.races')} to="/races" active={location.pathname === '/races'} />
          <NavLink icon={User} label={t('nav.profile')} to="/profile" active={location.pathname === '/profile'} />
          
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="ml-2 px-3 py-2 rounded-lg flex items-center gap-2 transition-all bg-gray-800/50 hover:bg-red-600/20 text-gray-400 hover:text-white border border-gray-700/50 hover:border-red-600/50"
            title={language === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'zh' ? 'EN' : '中文'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ icon: Icon, label, to, active }: { icon: any; label: string; to: string; active?: boolean }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
        active
          ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}