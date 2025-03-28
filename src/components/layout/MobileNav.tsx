
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Dumbbell, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Dumbbell, label: 'Workouts', href: '/workouts' },
  { icon: BarChart2, label: 'Progress', href: '/progress' },
  { icon: Users, label: 'Community', href: '/community' },
  { icon: Calendar, label: 'Planner', href: '/planner' },
];

const MobileNav = () => {
  const location = useLocation();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <nav className="flex justify-between px-4 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-md",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNav;
