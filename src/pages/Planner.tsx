
import React from 'react';
import { Calendar as CalIcon, Plus, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';

const scheduledWorkouts = [
  {
    id: '1',
    title: 'Morning Run',
    time: '6:30 AM',
    duration: 30,
    type: 'Cardio',
  },
  {
    id: '2',
    title: 'Upper Body Strength',
    time: '5:00 PM',
    duration: 45,
    type: 'Strength',
  },
];

const upcomingWorkouts = [
  {
    id: '1',
    title: 'Full Body HIIT',
    date: 'Tomorrow',
    time: '7:00 AM',
    type: 'HIIT',
  },
  {
    id: '2',
    title: 'Leg Day',
    date: 'Thursday',
    time: '6:00 PM',
    type: 'Strength',
  },
  {
    id: '3',
    title: 'Yoga Session',
    date: 'Friday',
    time: '8:00 AM',
    type: 'Yoga',
  },
];

const Planner = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workout Planner</h1>
          <p className="text-muted-foreground">
            Schedule and plan your workouts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Workout
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <CalIcon className="mr-2 h-5 w-5 text-muted-foreground" /> 
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">
              {date?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scheduledWorkouts.length > 0 ? (
              <div className="space-y-4">
                {scheduledWorkouts.map((workout) => (
                  <div 
                    key={workout.id} 
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
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
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{workout.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{workout.time}</span>
                          <span>•</span>
                          <span>{workout.duration} min</span>
                          <span>•</span>
                          <span>{workout.type}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <CalIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No workouts scheduled</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule a workout for this day
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Workout
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {upcomingWorkouts.map((workout) => (
                <div 
                  key={workout.id} 
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div>
                    <h4 className="font-medium">{workout.title}</h4>
                    <div className="flex flex-col text-sm text-muted-foreground">
                      <span>{workout.date} at {workout.time}</span>
                      <span className={`
                        text-xs mt-1 font-medium
                        ${workout.type === 'Cardio' 
                          ? 'text-fitness-green' 
                          : workout.type === 'Strength' 
                          ? 'text-fitness-orange' 
                          : workout.type === 'HIIT'
                          ? 'text-fitness-purple'
                          : 'text-fitness-blue'
                        }
                      `}>
                        {workout.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Planner;
