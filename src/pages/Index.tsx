
import React from 'react';
import { Footprints, Flame, Clock, Dumbbell } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import ActivityCard from '@/components/dashboard/ActivityCard';
import RecentWorkouts from '@/components/dashboard/RecentWorkouts';
import WeeklySummary from '@/components/dashboard/WeeklySummary';
import GoalProgressCard from '@/components/dashboard/GoalProgressCard';

const Dashboard = () => {
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your fitness progress and activity
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <ActivityCard
          title="Steps"
          value={8432}
          target={10000}
          icon={<Footprints className="h-4 w-4 text-white" />}
          color="#0EA5E9"
          metric="steps"
        />
        
        <ActivityCard
          title="Calories"
          value={1850}
          target={2200}
          icon={<Flame className="h-4 w-4 text-white" />}
          color="#22C55E"
          metric="kcal"
        />
        
        <ActivityCard
          title="Active Time"
          value={95}
          target={120}
          icon={<Clock className="h-4 w-4 text-white" />}
          color="#F97316"
          metric="min"
        />
        
        <ActivityCard
          title="Workouts"
          value={3}
          target={5}
          icon={<Dumbbell className="h-4 w-4 text-white" />}
          color="#8B5CF6"
          metric="sessions"
        />
        
        <RecentWorkouts />
        
        <GoalProgressCard />
        
        <WeeklySummary />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
