
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MeasurementsTab = () => {
  return (
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
  );
};

export default MeasurementsTab;
