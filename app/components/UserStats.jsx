import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Search, Gift, RotateCcw, TrendingUp, MapPin, DollarSign } from 'lucide-react';
import { formatUnits } from 'viem';

export default function UserStats({ 
  userItems = [], 
  foundItems = [], 
  userBalance, 
  supportRewards, 
  supportRewardsCount 
}) {
  // Calculate statistics from the data
  const stats = {
    totalOwned: userItems.length,
    totalFound: foundItems.length,
    totalLost: userItems.filter(item => item.status === 'lost').length,
    totalReturned: userItems.filter(item => item.status === 'returned').length,
    balance: userBalance ? Number(userBalance) : 0,
    supportAmount: supportRewards ? formatUnits(supportRewards, 6) : '0', // Assuming USDC (6 decimals)
    supportCount: supportRewardsCount ? Number(supportRewardsCount) : 0,
  };

  const statCards = [
    {
      title: 'Items Owned',
      value: stats.totalOwned,
      icon: Package,
      description: 'Total items registered',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Items Found',
      value: stats.totalFound,
      icon: Search,
      description: 'Items discovered for others',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Items Lost',
      value: stats.totalLost,
      icon: MapPin,
      description: 'Currently missing items',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Items Returned',
      value: stats.totalReturned,
      icon: RotateCcw,
      description: 'Successfully recovered',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'NFT Balance',
      value: stats.balance,
      icon: Gift,
      description: 'LAF tokens owned',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Support Given',
      value: `$${stats.supportAmount}`,
      icon: DollarSign,
      description: `${stats.supportCount} contributions`,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`${stat.bgColor} border-0 shadow-sm hover:shadow-md transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {typeof stat.value === 'number' && stat.value > 0 ? '+' : ''}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-xs text-gray-500">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
