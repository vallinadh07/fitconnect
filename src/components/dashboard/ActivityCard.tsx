
import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ActivityCardProps {
  title: string;
  value: number;
  target: number;
  icon?: React.ReactNode;
  color: string;
  metric: string;
}

const ActivityCard = ({ 
  title, 
  value, 
  target,
  icon, 
  color, 
  metric 
}: ActivityCardProps) => {
  const percentage = Math.min(Math.round((value / target) * 100), 100);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`rounded-full p-1`} style={{ backgroundColor: color }}>
          {icon || <Activity className="h-4 w-4 text-white" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value.toLocaleString()} <span className="text-sm text-muted-foreground">{metric}</span>
        </div>
        <div className="flex items-center justify-between mt-3 mb-1">
          <span className="text-xs text-muted-foreground">
            {percentage}% of daily goal
          </span>
          <span className="text-xs text-muted-foreground">
            {target.toLocaleString()} {metric}
          </span>
        </div>
        <Progress value={percentage} className="h-2" />
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
