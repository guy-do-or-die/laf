import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { buildRoute } from '@/constants/routes';

/**
 * Component for displaying a clickable user address that links to their profile
 * @param {Object} props - Component props
 * @param {string} props.address - User wallet address
 * @param {string} props.label - Optional label (defaults to "User")
 * @param {string} props.variant - Button variant (defaults to "ghost")
 * @param {string} props.size - Button size (defaults to "sm")
 * @param {string} props.className - Additional CSS classes
 */
export default function UserProfileLink({ 
  address, 
  label = "User", 
  variant = "ghost", 
  size = "sm", 
  className = "" 
}) {
  if (!address) {
    return null;
  }

  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={`h-auto p-1 font-mono text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors ${className}`}
    >
      <Link href={buildRoute.user(address)}>
        <User className="w-3 h-3 mr-1" />
        <span>{label}: {formatAddress(address)}</span>
      </Link>
    </Button>
  );
}
