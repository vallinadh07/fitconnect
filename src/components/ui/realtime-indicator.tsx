
import * as React from 'react';
import { cn } from '@/lib/utils';

interface RealtimeIndicatorProps {
  className?: string;
}

export function RealtimeIndicator({ className }: RealtimeIndicatorProps) {
  const [active, setActive] = React.useState(true);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => !prev);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={cn("flex items-center text-xs", className)}>
      <div className="relative mr-1.5">
        <div className={cn(
          "h-2 w-2 rounded-full",
          active ? "bg-green-500" : "bg-green-300"
        )} />
        <div className={cn(
          "absolute -inset-0.5 rounded-full animate-ping",
          active ? "bg-green-500/30" : "bg-transparent"
        )} />
      </div>
      <span>Real-time</span>
    </div>
  );
}
