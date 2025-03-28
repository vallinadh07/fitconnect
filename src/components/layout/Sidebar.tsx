
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Dumbbell, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Dumbbell, label: 'Workouts', href: '/workouts' },
  { icon: BarChart2, label: 'Progress', href: '/progress' },
  { icon: Users, label: 'Community', href: '/community' },
  { icon: Calendar, label: 'Planner', href: '/planner' },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="hidden md:flex flex-col gap-6 border-r p-4 pt-6 h-[calc(100vh-4rem)] sticky top-16 w-64">
      <nav className="grid gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto rounded-lg border bg-card p-4">
        <div className="mb-3 font-medium">Ready for a challenge?</div>
        <p className="text-sm text-muted-foreground mb-3">Join the monthly challenge and compete with friends!</p>
        <Link 
          to="/challenges" 
          className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm text-primary-foreground"
        >
          Join Challenge
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
