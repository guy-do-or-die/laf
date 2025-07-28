import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Package, CirclePlus, Search} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

/**
 * Navigation component for main app navigation
 */
export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    {
      href: ROUTES.ITEMS,
      label: 'My Items',
      icon: Package,
      active: location === ROUTES.ITEMS,
    },
    {
      href: ROUTES.REGISTER,
      label: 'Register',
      icon: CirclePlus,
      active: location === ROUTES.REGISTER,
    },
    {
      href: ROUTES.HUNT,
      label: 'Hunt',
      icon: Search,
      active: location === ROUTES.HUNT,
    },
  ];

  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.href}
            asChild
            variant={item.active ? 'default' : 'ghost'}
            size="sm"
            className="text-sm px-3 py-2"
          >
            <Link href={item.href}>
              <Icon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
