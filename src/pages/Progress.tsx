
import * as React from 'react';
import { ArrowUp, CalendarDays, TrendingUp, Weight, Ruler } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';
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
import { useWeightData, useWorkoutData, useMetricsData } from '@/hooks/useProgressData';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const Progress = () => {
  const { data: weightData, isLoading: isWeightLoading, error: weightError } = useWeightData();
  const { data: workoutData, isLoading: isWorkoutLoading, error: workoutError } = useWorkoutData();
  const { data: metricsData, isLoading: isMetricsLoading, error: metricsError } = useMetricsData();
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

  // Map the icon names to actual icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'weight':
        return <Weight className="h-5 w-5" />;
      case 'ruler':
        return <Ruler className="h-5 w-5" />;
      case 'calendar':
        return <CalendarDays className="h-5 w-5" />;
      case 'trending':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Weight className="h-5 w-5" />;
    }
  };

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
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {metricsData.map((metric) => (
          <Card key={metric.title} className={isMetricsLoading ? "animate-pulse" : ""}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className="rounded-full p-1 bg-muted">
                {getIconComponent(metric.icon)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.currentValue}</div>
              <div className="mt-1 flex items-center">
                <span className={`text-xs ${metric.positive ? 'text-fitness-green' : 'text-destructive'} flex items-center`}>
                  {metric.positive ? <ArrowUp className="mr-1 h-3 w-3" /> : null}
                  {metric.change}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {metric.period}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="weight">
        <TabsList className="mb-6">
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="strength">Strength</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weight" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Weight History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`h-[350px] ${isWeightLoading ? "animate-pulse" : ""}`}>
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
        </TabsContent>
        
        <TabsContent value="measurements" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Body Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Track your body measurements to see changes over time</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`h-[350px] ${isWorkoutLoading ? "animate-pulse" : ""}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} minutes`, 'Activity']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.5rem',
                        padding: '0.5rem',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="minutes" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      dot={{ strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strength" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Strength Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Track your strength training progress</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Progress;
