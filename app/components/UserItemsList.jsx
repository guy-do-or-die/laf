import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Search, MapPin, Clock, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import UserProfileLink from '@/components/UserProfileLink';

export default function UserItemsList({ items = [], type = 'owned' }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="w-12 h-12 mx-auto mb-4 opacity-50">
          {type === 'owned' ? <Package className="w-full h-full" /> : <Search className="w-full h-full" />}
        </div>
        <p className="font-medium">No {type === 'owned' ? 'items owned' : 'items found'}</p>
        <p className="text-sm">
          {type === 'owned' 
            ? 'Register your first item to get started' 
            : 'Help others by finding their lost items'
          }
        </p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'registered':
        return 'bg-blue-100 text-blue-800';
      case 'lost':
        return 'bg-orange-100 text-orange-800';
      case 'found':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    const date = new Date(parseInt(timestamp) * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Card key={item.id || index} className="border border-gray-200 hover:border-gray-300 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getStatusColor(item.status)}>
                    {item.status || 'registered'}
                  </Badge>
                  {item.geoLocation && (
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      Location set
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="font-medium text-sm text-gray-900">
                    Item {formatAddress(item.item || item.hash)}
                  </p>
                  
                  {type === 'found' && item.owner && (
                    <div className="flex items-center">
                      <UserProfileLink 
                        address={item.owner}
                        label="Owner"
                        className="text-xs"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimestamp(item.blockTimestamp || item.lastUpdated)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {item.transactionHash && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => window.open(`https://basescan.org/tx/${item.transactionHash}`, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
            
            {item.comment && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600 italic">
                  "{item.comment}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
