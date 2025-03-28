
import React from 'react';
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

const weightData = [
  { date: 'Apr 1', weight: 166 },
  { date: 'Apr 8', weight: 165 },
  { date: 'Apr 15', weight: 163.5 },
  { date: 'Apr 22', weight: 162 },
  { date: 'Apr 29', weight: 161 },
  { date: 'May 6', weight: 159.5 },
  { date: 'May 13', weight: 158 },
];

const workoutData = [
  { date: 'Apr 1', minutes: 30 },
  { date: 'Apr 8', minutes: 45 },
  { date: 'Apr 15', minutes: 60 },
  { date: 'Apr 22', minutes: 45 },
  { date: 'Apr 29', minutes: 75 },
  { date: 'May 6', minutes: 90 },
  { date: 'May 13', minutes: 60 },
];

const metrics = [
  {
    title: 'Weight',
    currentValue: '158 lbs',
    change: '-8 lbs',
    positive: true,
    period: 'Since Apr 1',
    icon: <Weight className="h-5 w-5" />,
  },
  {
    title: 'Body Fat',
    currentValue: '18.2%',
    change: '-2.4%',
    positive: true,
    period: 'Since Apr 1',
    icon: <Ruler className="h-5 w-5" />,
  },
  {
    title: 'Weekly Activity',
    currentValue: '205 mins',
    change: '+45 mins',
    positive: true,
    period: 'vs. last week',
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: 'Streak',
    currentValue: '15 days',
    change: '+15 days',
    positive: true,
    period: 'Current',
    icon: <TrendingUp className="h-5 w-5" />,
  },
];

const Progress = () => {
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Progress</h1>
        <p className="text-muted-foreground">
          Track your fitness journey over time
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className="rounded-full p-1 bg-muted">
                {metric.icon}
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
              <div className="h-[350px]">
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
              <div className="h-[350px]">
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
