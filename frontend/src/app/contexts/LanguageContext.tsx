import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  zh: {
    // Navbar
    'nav.home': '首页',
    'nav.lineup': '我的车队',
    'nav.leaderboard': '排行榜',
    'nav.races': '赛事中心',
    'nav.profile': '个人中心',
    
    // Home Page
    'home.quickStats': '快速统计',
    'home.stat.weeks': '参赛周数',
    'home.stat.avgPoints': '平均积分',
    'home.stat.highestWeek': '最高周积分',
    'home.stat.globalPlayers': '全球玩家',
    'home.leaderboardPreview': '排行榜预览',
    'home.you': '你',
    
    // Race Banner
    'race.nextRace': '下一场比赛',
    'race.round': '第',
    'race.round.suffix': '站',
    'race.lockIn': '阵容锁定',
    'race.daysLeft': '天后',
    
    // Stats Panel
    'stats.totalPoints': '总积分',
    'stats.globalRank': '全球排名',
    'stats.weekPoints': '本周积分',
    'stats.transfers': '转会次数',
    
    // Team Lineup
    'lineup.currentLineup': '当前阵容',
    'lineup.drivers': '车手',
    'lineup.team': '车队',
    'lineup.captain': '队长',
    'lineup.points': '积分',
    'lineup.edit': '编辑阵容',
    
    // Quick Actions
    'actions.title': '快速操作',
    'actions.viewSchedule': '查看赛程',
    'actions.viewSchedule.desc': '浏览完整的2026赛季赛程表',
    'actions.transferMarket': '转会市场',
    'actions.transferMarket.desc': '查看车手和车队的价格变动',
    'actions.rules': '规则说明',
    'actions.rules.desc': '了解游戏规则和积分计算方式',
    
    // News Card
    'news.latestNews': '最新资讯',
    'news.verstappen': '维斯塔潘创造澳大利亚站最快单圈记录',
    'news.verstappen.desc': '红牛车手在自由练习赛中展现惊人速度,提前锁定杆位热门。',
    'news.ferrari': '法拉利升级包表现强劲',
    'news.ferrari.desc': '新的空气动力学套件为汉密尔顿和勒克莱尔带来显著提升。',
    'news.mclaren': '麦克拉伦车队形势大好',
    'news.mclaren.desc': '诺里斯和皮亚斯特里在测试中展现出色的一致性和速度。',
    'news.readMore': '查看更多',
    
    // Lineup Builder
    'lineup.title': '阵容选择',
    'lineup.location': '墨尔本阿尔伯特公园赛道',
    'lineup.date': '2026年3月20日 14:00',
    'lineup.lockdown': '阵容锁定倒计时',
    'lineup.hour': '时',
    'lineup.minute': '分',
    'lineup.second': '秒',
    'lineup.budget': '预算管理',
    'lineup.remaining': '剩余',
    'lineup.used': '已使用',
    'lineup.overbudget': '预算超支！请调整阵容。',
    'lineup.myLineup': '我的阵容',
    'lineup.selectDriver': '选择车手',
    'lineup.selectTeam': '选择车队',
    'lineup.submit': '提交阵容',
    'lineup.availableDrivers': '可选车手',
    'lineup.availableTeams': '可选车队',
    'lineup.name': '名称',
    'lineup.teamName': '所属车队',
    'lineup.weekPoints': '上周积分',
    'lineup.price': '价格',
    'lineup.trend': '趋势',
    'lineup.action': '操作',
    'lineup.injured': '伤病',
    'lineup.setCaptain': '设为队长',
    
    // Leaderboard
    'leaderboard.title': '排行榜',
    'leaderboard.subtitle': '查看全球车队经理排名',
    'leaderboard.globalRank': '全球排名',
    'leaderboard.top': '前',
    'leaderboard.totalPlayers': '总玩家数',
    'leaderboard.activePlayers': '活跃玩家',
    'leaderboard.weeklyGain': '本周涨幅',
    'leaderboard.rankUp': '排名提升',
    'leaderboard.bestRank': '最高排名',
    'leaderboard.week': '第 2 周',
    'leaderboard.global': '全球排行',
    'leaderboard.friends': '好友排行',
    'leaderboard.country': '国内排行',
    
    // Races
    'races.title': '赛事中心',
    'races.subtitle': '2026赛季完整赛程',
    'races.upcoming': '即将开始',
    'races.completed': '已完成',
    'races.round.prefix': '第',
    'races.round.suffix': '站',
    'races.grandPrix': '大奖赛',
    
    // Profile
    'profile.title': '个人中心',
    'profile.subtitle': '管理你的车队和个人资料',
    'profile.overview': '数据总览',
    'profile.seasonPoints': '赛季总积分',
    'profile.totalPoints': '总积分',
    'profile.avgWeeklyPoints': '周均积分',
    'profile.avgPoints.value': '平均',
    'profile.bestWeek': '最佳单周',
    'profile.bestWeek.value': '第 2 周',
    'profile.transfersMade': '转会次数',
    'profile.transfers.value': '次',
    'profile.achievements': '成就',
    'profile.seasonHistory': '赛季历史',
    'profile.settings': '设置',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.lineup': 'My Team',
    'nav.leaderboard': 'Leaderboard',
    'nav.races': 'Races',
    'nav.profile': 'Profile',
    
    // Home Page
    'home.quickStats': 'Quick Stats',
    'home.stat.weeks': 'Weeks Played',
    'home.stat.avgPoints': 'Avg Points',
    'home.stat.highestWeek': 'Best Week',
    'home.stat.globalPlayers': 'Global Players',
    'home.leaderboardPreview': 'Leaderboard Preview',
    'home.you': 'You',
    
    // Race Banner
    'race.nextRace': 'Next Race',
    'race.round': 'Round ',
    'race.round.suffix': '',
    'race.lockIn': 'Lock In',
    'race.daysLeft': 'Days Left',
    
    // Stats Panel
    'stats.totalPoints': 'Total Points',
    'stats.globalRank': 'Global Rank',
    'stats.weekPoints': 'Week Points',
    'stats.transfers': 'Transfers',
    
    // Team Lineup
    'lineup.currentLineup': 'Current Lineup',
    'lineup.drivers': 'Drivers',
    'lineup.team': 'Team',
    'lineup.captain': 'Captain',
    'lineup.points': 'Points',
    'lineup.edit': 'Edit Lineup',
    
    // Quick Actions
    'actions.title': 'Quick Actions',
    'actions.viewSchedule': 'View Schedule',
    'actions.viewSchedule.desc': 'Browse the complete 2026 season calendar',
    'actions.transferMarket': 'Transfer Market',
    'actions.transferMarket.desc': 'Check driver and team price changes',
    'actions.rules': 'Rules & Scoring',
    'actions.rules.desc': 'Learn game rules and scoring system',
    
    // News Card
    'news.latestNews': 'Latest News',
    'news.verstappen': 'Verstappen Sets Fastest Lap in Australia',
    'news.verstappen.desc': 'Red Bull driver shows incredible pace in practice, locks in pole position favorite.',
    'news.ferrari': 'Ferrari Upgrade Package Performs Strong',
    'news.ferrari.desc': 'New aerodynamic package brings significant improvements for Hamilton and Leclerc.',
    'news.mclaren': 'McLaren Team Looking Strong',
    'news.mclaren.desc': 'Norris and Piastri show excellent consistency and pace in testing.',
    'news.readMore': 'Read More',
    
    // Lineup Builder
    'lineup.title': 'Lineup Builder',
    'lineup.location': 'Albert Park Circuit, Melbourne',
    'lineup.date': 'March 20, 2026 14:00',
    'lineup.lockdown': 'Lineup Lockdown Countdown',
    'lineup.hour': 'Hrs',
    'lineup.minute': 'Min',
    'lineup.second': 'Sec',
    'lineup.budget': 'Budget Management',
    'lineup.remaining': 'Remaining',
    'lineup.used': 'Used',
    'lineup.overbudget': 'Over budget! Please adjust your lineup.',
    'lineup.myLineup': 'My Lineup',
    'lineup.selectDriver': 'Select Driver',
    'lineup.selectTeam': 'Select Team',
    'lineup.submit': 'Submit Lineup',
    'lineup.availableDrivers': 'Available Drivers',
    'lineup.availableTeams': 'Available Teams',
    'lineup.name': 'Name',
    'lineup.teamName': 'Team',
    'lineup.weekPoints': 'Last Week',
    'lineup.price': 'Price',
    'lineup.trend': 'Trend',
    'lineup.action': 'Action',
    'lineup.injured': 'Injured',
    'lineup.setCaptain': 'Set as Captain',
    
    // Leaderboard
    'leaderboard.title': 'Leaderboard',
    'leaderboard.subtitle': 'View global team manager rankings',
    'leaderboard.globalRank': 'Global Rank',
    'leaderboard.top': 'Top',
    'leaderboard.totalPlayers': 'Total Players',
    'leaderboard.activePlayers': 'Active Players',
    'leaderboard.weeklyGain': 'Weekly Gain',
    'leaderboard.rankUp': 'Rank Up',
    'leaderboard.bestRank': 'Best Rank',
    'leaderboard.week': 'Week 2',
    'leaderboard.global': 'Global',
    'leaderboard.friends': 'Friends',
    'leaderboard.country': 'Country',
    
    // Races
    'races.title': 'Race Center',
    'races.subtitle': '2026 Season Complete Schedule',
    'races.upcoming': 'Upcoming',
    'races.completed': 'Completed',
    'races.round.prefix': 'Round ',
    'races.round.suffix': '',
    'races.grandPrix': 'Grand Prix',
    
    // Profile
    'profile.title': 'Profile',
    'profile.subtitle': 'Manage your team and profile',
    'profile.overview': 'Overview',
    'profile.seasonPoints': 'Season Total',
    'profile.totalPoints': 'Total Points',
    'profile.avgWeeklyPoints': 'Avg Weekly',
    'profile.avgPoints.value': 'Average',
    'profile.bestWeek': 'Best Week',
    'profile.bestWeek.value': 'Week 2',
    'profile.transfersMade': 'Transfers Made',
    'profile.transfers.value': 'times',
    'profile.achievements': 'Achievements',
    'profile.seasonHistory': 'Season History',
    'profile.settings': 'Settings',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.zh] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
