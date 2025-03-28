
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';
import WorkoutCard from '@/components/workouts/WorkoutCard';

const workoutCategories = [
  'All',
  'Strength',
  'Cardio',
  'HIIT',
  'Yoga',
  'Flexibility',
];

const workouts = [
  {
    id: '1',
    title: 'Full Body Strength',
    category: 'Strength',
    duration: 45,
    level: 'Intermediate' as const,
    calories: 320,
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '2',
    title: '30-Minute HIIT',
    category: 'HIIT',
    duration: 30,
    level: 'Advanced' as const,
    calories: 400,
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
  },
  {
    id: '3',
    title: 'Morning Yoga Flow',
    category: 'Yoga',
    duration: 20,
    level: 'Beginner' as const,
    calories: 150,
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '4',
    title: '5K Run Training',
    category: 'Cardio',
    duration: 35,
    level: 'Intermediate' as const,
    calories: 380,
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '5',
    title: 'Upper Body Focus',
    category: 'Strength',
    duration: 40,
    level: 'Intermediate' as const,
    calories: 280,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '6',
    title: 'Deep Stretch Session',
    category: 'Flexibility',
    duration: 25,
    level: 'Beginner' as const,
    calories: 120,
    image: 'https://images.unsplash.com/photo-1616699002805-0741e1e4a9c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
  },
];

const Workouts = () => {
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Workouts</h1>
        <p className="text-muted-foreground">
          Discover and start new workouts
        </p>
      </div>
      
      <Tabs defaultValue="All">
        <div className="border-b mb-6">
          <TabsList className="h-auto p-0 bg-transparent">
            {workoutCategories.map((category) => (
              <TabsTrigger 
                key={category}
                value={category}
                className="py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {workoutCategories.map((category) => (
          <TabsContent key={category} value={category} className="m-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workouts
                .filter((workout) => category === 'All' || workout.category === category)
                .map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    title={workout.title}
                    category={workout.category}
                    duration={workout.duration}
                    level={workout.level}
                    calories={workout.calories}
                    image={workout.image}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </PageLayout>
  );
};

export default Workouts;
