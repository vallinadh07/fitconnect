
import React from 'react';
import { Clock, Flame } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WorkoutCardProps {
  title: string;
  category: string;
  duration: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  calories: number;
  image: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  category,
  duration,
  level,
  calories,
  image,
}) => {
  const getLevelColor = () => {
    switch (level) {
      case 'Beginner':
        return 'bg-fitness-green/10 text-fitness-green';
      case 'Intermediate':
        return 'bg-fitness-orange/10 text-fitness-orange';
      case 'Advanced':
        return 'bg-fitness-purple/10 text-fitness-purple';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getLevelColor()}`}>
            {level}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground uppercase tracking-wide">
          {category}
        </div>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{calories} kcal</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Start Workout</Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
