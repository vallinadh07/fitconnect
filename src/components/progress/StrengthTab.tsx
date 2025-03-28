
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StrengthTab = () => {
  return (
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
  );
};

export default StrengthTab;
