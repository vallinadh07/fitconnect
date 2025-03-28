
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Weight, Ruler, CalendarDays, TrendingUp } from 'lucide-react';
import { useMetricsData } from '@/hooks/useProgressData';

const MetricsCards = () => {
  const { data: metricsData, isLoading: isMetricsLoading } = useMetricsData();

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

  return (
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
  );
};

export default MetricsCards;
