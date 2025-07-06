import { Badge } from "./badge";
import { cn } from "@/app/lib/utils";

const statusConfig = {
  0: {
    label: 'Registered',
    variant: 'secondary',
    className: 'retro-badge'
  },
  1: {
    label: 'Lost',
    variant: 'destructive',
    className: 'retro-badge lost'
  },
  2: {
    label: 'Found',
    variant: 'default',
    className: 'retro-badge found'
  },
  3: {
    label: 'Returned',
    variant: 'default',
    className: 'retro-badge returned'
  }
};

export function StatusBadge({ status, className, ...props }) {
  const config = statusConfig[status] || statusConfig[0];
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
      {...props}
    >
      {config.label}
    </Badge>
  );
}

export function RewardBadge({ reward, className, ...props }) {
  if (!reward || reward <= 0) return null;
  
  return (
    <Badge 
      variant="outline"
      className={cn("retro-badge", className)}
      {...props}
    >
      💰 {parseFloat(reward).toFixed(3)} ETH
    </Badge>
  );
}