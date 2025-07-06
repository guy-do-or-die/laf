import { MapPin, User } from "lucide-react";
import { zeroAddress } from "viem";
import { cn } from "@/app/lib/utils";

function InfoItem({ icon: Icon, children, className }) {
  return (
    <div className={cn("flex items-center text-sm text-gray-500 mb-2", className)}>
      <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
      <span className="truncate">{children}</span>
    </div>
  );
}

export function ItemInfo({ itemData, className }) {
  const { geo, finder } = itemData;
  
  return (
    <div className={cn("space-y-2", className)}>
      {geo && (
        <InfoItem icon={MapPin}>
          {geo}
        </InfoItem>
      )}
      
      {finder && finder !== zeroAddress && (
        <InfoItem icon={User}>
          Finder: {finder.slice(0, 6)}...{finder.slice(-4)}
        </InfoItem>
      )}
    </div>
  );
}

export function ItemTitle({ children, isLoading, className }) {
  if (isLoading) {
    return (
      <div className={cn("h-6 bg-gray-200 rounded animate-pulse", className)} />
    );
  }
  
  return (
    <h3 className={cn("font-semibold text-gray-900 mb-3 line-clamp-2", className)}>
      {children || 'No description'}
    </h3>
  );
}