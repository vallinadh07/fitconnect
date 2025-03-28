
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';
import WorkoutCard from '@/components/workouts/WorkoutCard';
import WorkoutLogCard from '@/components/workouts/WorkoutLogCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { WorkoutType } from '@/types/workout';
import { getWorkoutLogs, initializeWorkoutLogs } from '@/services/workoutService';
import { WorkoutDialog } from '@/components/workouts/WorkoutDialog';

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
  const [selectedTab, setSelectedTab] = useState("All");
  const [showDialog, setShowDialog] = useState(false);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [activeSection, setActiveSection] = useState<'discover' | 'logs'>('discover');

  useEffect(() => {
    initializeWorkoutLogs();
    refreshWorkoutLogs();
  }, []);

  const refreshWorkoutLogs = () => {
    setWorkoutLogs(getWorkoutLogs());
  };

  const handleLogSaved = () => {
    refreshWorkoutLogs();
    setShowDialog(false);
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Workouts</h1>
          <Button onClick={() => setShowDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Log Workout
          </Button>
        </div>
        <p className="text-muted-foreground">
          Discover workouts and track your progress
        </p>
      </div>
      
      <div className="mb-6">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-4 py-2 ${activeSection === 'discover' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
              onClick={() => setActiveSection('discover')}
            >
              Discover Workouts
            </button>
            <button
              className={`px-4 py-2 ${activeSection === 'logs' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
              onClick={() => setActiveSection('logs')}
            >
              My Workout Logs
            </button>
          </div>
        </div>
      </div>
      
      {activeSection === 'discover' ? (
        <Tabs defaultValue="All" value={selectedTab} onValueChange={setSelectedTab}>
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
      ) : (
        <div className="space-y-6">
          <Tabs defaultValue="All">
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Strength">Strength</TabsTrigger>
              <TabsTrigger value="Cardio">Cardio</TabsTrigger>
              <TabsTrigger value="HIIT">HIIT</TabsTrigger>
              <TabsTrigger value="Yoga">Yoga</TabsTrigger>
              <TabsTrigger value="Flexibility">Flexibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="All" className="mt-6">
              <div className="grid grid-cols-1 gap-4">
                {workoutLogs.length > 0 ? (
                  workoutLogs.map((log) => (
                    <WorkoutLogCard 
                      key={log.id} 
                      workout={log} 
                      onRefresh={refreshWorkoutLogs}
                    />
                  ))
                ) : (
                  <div className="text-center p-8 border rounded-lg">
                    <p className="text-muted-foreground">You haven't logged any workouts yet.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setShowDialog(true)}
                    >
                      Log Your First Workout
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {['Strength', 'Cardio', 'HIIT', 'Yoga', 'Flexibility'].map((type) => (
              <TabsContent key={type} value={type} className="mt-6">
                <div className="grid grid-cols-1 gap-4">
                  {workoutLogs.filter(log => log.type.toLowerCase() === type.toLowerCase()).length > 0 ? (
                    workoutLogs
                      .filter(log => log.type.toLowerCase() === type.toLowerCase())
                      .map((log) => (
                        <WorkoutLogCard 
                          key={log.id} 
                          workout={log} 
                          onRefresh={refreshWorkoutLogs}
                        />
                      ))
                  ) : (
                    <div className="text-center p-8 border rounded-lg">
                      <p className="text-muted-foreground">No {type} workouts logged yet.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setShowDialog(true)}
                      >
                        Log a {type} Workout
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
      
      <WorkoutDialog 
        open={showDialog} 
        onOpenChange={setShowDialog}
        onSave={handleLogSaved}
      />
    </PageLayout>
  );
};

export default Workouts;
