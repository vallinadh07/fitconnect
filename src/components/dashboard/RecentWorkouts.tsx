
import React from 'react';
import { ArrowRight, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface Workout {
  id: string;
  title: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  date: Date;
}

const workouts: Workout[] = [
  {
    id: '1',
    title: 'Morning Run',
    type: 'Cardio',
    duration: 30,
    caloriesBurned: 320,
    date: new Date(Date.now() - 86400000), // yesterday
  },
  {
    id: '2',
    title: 'Upper Body Strength',
    type: 'Strength',
    duration: 45,
    caloriesBurned: 280,
    date: new Date(Date.now() - 86400000 * 2), // 2 days ago
  },
  {
    id: '3',
    title: 'HIIT Workout',
    type: 'HIIT',
    duration: 25,
    caloriesBurned: 350,
    date: new Date(Date.now() - 86400000 * 3), // 3 days ago
  },
];

const RecentWorkouts = () => {
  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Workouts</CardTitle>
        <Dumbbell className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="flex items-center justify-between px-6 py-2 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`
                  rounded-full p-2 
                  ${workout.type === 'Cardio' 
                    ? 'bg-fitness-green/10 text-fitness-green' 
                    : workout.type === 'Strength' 
                    ? 'bg-fitness-orange/10 text-fitness-orange' 
                    : 'bg-fitness-purple/10 text-fitness-purple'
                  }
                `}>
                  <Dumbbell className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{workout.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(workout.date, { addSuffix: true })} • {workout.duration} min
                  </p>
                </div>
              </div>
              <div className="text-sm">{workout.caloriesBurned} kcal</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" asChild>
          <a href="/workouts">
            View All Workouts <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentWorkouts;
