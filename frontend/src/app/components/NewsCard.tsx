import { ChevronRight, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const news = [
  {
    id: 1,
    title: '阿隆索确认缺席澳大利亚大奖赛',
    description: '由于伤病原因，Fernando Alonso 将缺席赛季开幕战，车队正在寻找替补车手。',
    image: 'https://images.unsplash.com/photo-1683198412799-029b463d195d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtdWxhJTIwb25lJTIwY29ja3BpdCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzM0MDE1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    time: '2小时前',
    tag: '重要新闻',
  },
  {
    id: 2,
    title: '墨尔本赛道天气预报：周日可能下雨',
    description: '气象部门预测周日比赛日可能有降雨，这将为比赛增加更多不确定性。',
    image: 'https://images.unsplash.com/photo-1771384555260-86cccbaad5dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjaXJjdWl0JTIwbmlnaHQlMjBsaWdodHN8ZW58MXx8fHwxNzczMzYxNDYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    time: '5小时前',
    tag: '赛事动态',
  },
];

export function NewsCard() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-red-600/30 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/50">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">最新资讯</h3>
            <p className="text-xs text-gray-400">赛事动态与公告</p>
          </div>
        </div>
        <button className="text-sm text-red-500 hover:text-red-400 flex items-center gap-1">
          查看全部
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {news.map((item) => (
          <NewsItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

function NewsItem({
  title,
  description,
  image,
  time,
  tag,
}: {
  title: string;
  description: string;
  image: string;
  time: string;
  tag: string;
}) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden hover:border-red-600/50 transition-all group cursor-pointer">
      <div className="relative h-40 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-red-600 rounded text-xs text-white font-bold">
            {tag}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
          {title}
        </h4>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{time}</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
