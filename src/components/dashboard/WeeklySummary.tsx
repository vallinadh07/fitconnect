
import React from 'react';
import { BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'Mon', calories: 420 },
  { day: 'Tue', calories: 580 },
  { day: 'Wed', calories: 350 },
  { day: 'Thu', calories: 620 },
  { day: 'Fri', calories: 750 },
  { day: 'Sat', calories: 400 },
  { day: 'Sun', calories: 0 },
];

const WeeklySummary = () => {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Weekly Activity</CardTitle>
        <BarChart className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <ReBarChart data={data} barCategoryGap={16}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }} 
                unit=" kcal" 
                width={80}
              />
              <Tooltip
                formatter={(value) => [`${value} kcal`, 'Calories']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                }}
              />
              <Bar 
                dataKey="calories" 
                fill="#0EA5E9" 
                radius={[4, 4, 0, 0]} 
                barSize={32}
              />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklySummary;
