
import React from 'react';
import { Calendar, Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ActivityRing from './ActivityRing';

const GoalProgressCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Goal Progress</CardTitle>
        <Medal className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="progress-ring-pulse">
          <ActivityRing progress={65} size={160} color="#8B5CF6">
            <div className="text-center">
              <div className="text-4xl font-bold">65%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </ActivityRing>
        </div>
        
        <div className="mt-2 text-center">
          <h3 className="text-lg font-semibold">Lose 5 lbs</h3>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>23 days left</span>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Current</div>
              <div className="text-lg font-medium">158 lbs</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Target</div>
              <div className="text-lg font-medium">153 lbs</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalProgressCard;
