
import * as React from 'react';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useWeightData, useWorkoutData, useMetricsData } from '@/hooks/useProgressData';
import MetricsCards from '@/components/progress/MetricsCards';
import WeightChart from '@/components/progress/WeightChart';
import ActivityChart from '@/components/progress/ActivityChart';
import MeasurementsTab from '@/components/progress/MeasurementsTab';
import StrengthTab from '@/components/progress/StrengthTab';

const Progress = () => {
  const { error: weightError } = useWeightData();
  const { error: workoutError } = useWorkoutData();
  const { error: metricsError } = useMetricsData();
  const { toast } = useToast();

  // Show toast when data updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      toast({
        title: "Data refreshed",
        description: "Progress data has been updated in real-time",
        duration: 2000,
      });
    }, 30000); // Show a toast every 30 seconds

    return () => clearInterval(intervalId);
  }, [toast]);

  if (weightError || workoutError || metricsError) {
    return (
      <PageLayout>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load progress data. Please try again later.
          </AlertDescription>
        </Alert>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Progress</h1>
        <p className="text-muted-foreground">
          Track your fitness journey over time
          <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Real-time
          </span>
        </p>
      </div>
      
      <MetricsCards />
      
      <Tabs defaultValue="weight">
        <TabsList className="mb-6">
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="strength">Strength</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weight" className="m-0">
          <WeightChart />
        </TabsContent>
        
        <TabsContent value="measurements" className="m-0">
          <MeasurementsTab />
        </TabsContent>
        
        <TabsContent value="activity" className="m-0">
          <ActivityChart />
        </TabsContent>
        
        <TabsContent value="strength" className="m-0">
          <StrengthTab />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Progress;
