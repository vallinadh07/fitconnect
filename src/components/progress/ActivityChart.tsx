
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWorkoutData } from '@/hooks/useProgressData';

const ActivityChart = () => {
  const { data: workoutData, isLoading: isWorkoutLoading } = useWorkoutData();

  return (
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
  );
};

export default ActivityChart;
