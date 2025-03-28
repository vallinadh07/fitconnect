
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Calendar, Clock, Dumbbell } from 'lucide-react';
import { WorkoutLog } from '@/types/workout';
import { format } from 'date-fns';
import { deleteWorkoutLog } from '@/services/workoutService';
import { toast } from 'sonner';

interface WorkoutLogCardProps {
  workout: WorkoutLog;
  onRefresh: () => void;
}

const WorkoutLogCard: React.FC<WorkoutLogCardProps> = ({ workout, onRefresh }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this workout log?')) {
      deleteWorkoutLog(workout.id);
      toast.success('Workout log deleted');
      onRefresh();
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{workout.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              {format(new Date(workout.date), 'PPP')}
            </CardDescription>
          </div>
          <div className="rounded-full px-2 py-1 text-xs bg-primary/10 text-primary capitalize">
            {workout.type}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
            <Clock className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-sm font-medium">{workout.duration} min</span>
            <span className="text-xs text-muted-foreground">Duration</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
            <Dumbbell className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-sm font-medium">{workout.exercises.length}</span>
            <span className="text-xs text-muted-foreground">Exercises</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
            <span className="text-xs text-muted-foreground mb-1">🔥</span>
            <span className="text-sm font-medium">{workout.calories}</span>
            <span className="text-xs text-muted-foreground">Calories</span>
          </div>
        </div>
        
        {workout.exercises.length > 0 && (
          <div className="space-y-1 mb-2">
            <h4 className="text-sm font-medium mb-2">Exercises:</h4>
            {workout.exercises.slice(0, 3).map((exercise) => (
              <div key={exercise.id} className="text-sm flex justify-between">
                <span>{exercise.name}</span>
                <span className="text-muted-foreground">
                  {exercise.type === 'reps' 
                    ? `${exercise.sets || 0} x ${exercise.reps || 0}` 
                    : `${exercise.duration || 0} min`}
                </span>
              </div>
            ))}
            {workout.exercises.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{workout.exercises.length - 3} more exercises
              </div>
            )}
          </div>
        )}
        
        {workout.notes && (
          <div className="mt-2 text-sm text-muted-foreground">
            <p className="italic">"{workout.notes}"</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost">
          <Edit2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutLogCard;
