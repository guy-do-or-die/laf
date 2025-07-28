import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function UserThumbActions({
  targetAddress,
  onThumbUp,
  onThumbDown,
  thumbUpPending,
  thumbDownPending,
  canThumbUp,
  canThumbDown,
}) {
  const [lastAction, setLastAction] = useState(null);

  const handleThumbUp = async () => {
    setLastAction('up');
    await onThumbUp();
  };

  const handleThumbDown = async () => {
    setLastAction('down');
    await onThumbDown();
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-600 mr-2">Rate this user:</p>
          
          <Button
            variant={lastAction === 'up' ? 'default' : 'outline'}
            size="sm"
            onClick={handleThumbUp}
            disabled={!canThumbUp || thumbUpPending || thumbDownPending}
            className="flex items-center space-x-1"
          >
            {thumbUpPending && lastAction === 'up' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ThumbsUp className="w-4 h-4" />
            )}
            <span>Up</span>
          </Button>

          <Button
            variant={lastAction === 'down' ? 'destructive' : 'outline'}
            size="sm"
            onClick={handleThumbDown}
            disabled={!canThumbDown || thumbUpPending || thumbDownPending}
            className="flex items-center space-x-1"
          >
            {thumbDownPending && lastAction === 'down' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ThumbsDown className="w-4 h-4" />
            )}
            <span>Down</span>
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          Help the community by rating user behavior
        </p>
      </CardContent>
    </Card>
  );
}
