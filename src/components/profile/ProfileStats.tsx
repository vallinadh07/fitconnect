
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const weightData = [
  { date: 'May 1', weight: 175 },
  { date: 'May 8', weight: 174 },
  { date: 'May 15', weight: 173 },
  { date: 'May 22', weight: 172 },
  { date: 'May 29', weight: 171 },
  { date: 'Jun 5', weight: 170 },
  { date: 'Jun 12', weight: 169 },
];

const caloriesData = [
  { date: 'Jun 6', calories: 2100 },
  { date: 'Jun 7', calories: 1950 },
  { date: 'Jun 8', calories: 2200 },
  { date: 'Jun 9', calories: 2050 },
  { date: 'Jun 10', calories: 1900 },
  { date: 'Jun 11', calories: 2300 },
  { date: 'Jun 12', calories: 2000 },
];

const workoutData = [
  { date: 'Jun 6', duration: 45 },
  { date: 'Jun 7', duration: 0 },
  { date: 'Jun 8', duration: 60 },
  { date: 'Jun 9', duration: 30 },
  { date: 'Jun 10', duration: 0 },
  { date: 'Jun 11', duration: 75 },
  { date: 'Jun 12', duration: 45 },
];

const achievementsList = [
  { title: "First Workout", date: "May 15, 2023", description: "Completed your first workout" },
  { title: "5 Workouts", date: "May 29, 2023", description: "Completed 5 workouts total" },
  { title: "Consistency", date: "Jun 5, 2023", description: "Worked out 3 times in one week" },
  { title: "Weight Loss", date: "Jun 12, 2023", description: "Lost 5 lbs from your starting weight" },
];

const ProfileStats = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weight Progress</CardTitle>
          <CardDescription>Track your weight changes over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  formatter={(value) => [`${value} lbs`, 'Weight']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                  }}
                />
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#0EA5E9" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorWeight)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calorie Intake</CardTitle>
            <CardDescription>Last 7 days of calorie tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={caloriesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <defs>
                    <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#22C55E" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorCalories)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workout Duration</CardTitle>
            <CardDescription>Last 7 days of workouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <defs>
                    <linearGradient id="colorWorkout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="duration" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorWorkout)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Milestones you've reached in your fitness journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievementsList.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-md bg-muted/50">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileStats;
