
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WorkoutType, Exercise, WorkoutLog } from '@/types/workout';
import { X, Plus } from 'lucide-react';
import { addWorkoutLog } from '@/services/workoutService';
import { toast } from 'sonner';

interface WorkoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
}

export const WorkoutDialog: React.FC<WorkoutDialogProps> = ({ open, onOpenChange, onSave }) => {
  const [formData, setFormData] = useState<Omit<WorkoutLog, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    title: '',
    type: 'strength',
    duration: 0,
    exercises: [],
    calories: 0,
    completed: true,
    notes: '',
  });

  const [currentExercise, setCurrentExercise] = useState<Partial<Exercise>>({
    name: '',
    type: 'reps',
    sets: 3,
    reps: 10,
    weight: 0,
    duration: 0,
    calories: 0,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExerciseChange = (field: string, value: any) => {
    setCurrentExercise(prev => ({ ...prev, [field]: value }));
  };

  const addExercise = () => {
    if (!currentExercise.name) {
      toast.error('Exercise name is required');
      return;
    }

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: currentExercise.name || '',
      type: currentExercise.type as 'reps' | 'time' | 'distance',
      ...(currentExercise.type === 'reps' && {
        sets: currentExercise.sets,
        reps: currentExercise.reps,
        weight: currentExercise.weight,
      }),
      ...(currentExercise.type === 'time' && {
        duration: currentExercise.duration,
      }),
      ...(currentExercise.type === 'distance' && {
        distance: currentExercise.distance,
      }),
      calories: currentExercise.calories,
    };

    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
      calories: prev.calories + (newExercise.calories || 0),
    }));

    setCurrentExercise({
      name: '',
      type: 'reps',
      sets: 3,
      reps: 10,
      weight: 0,
      duration: 0,
      calories: 0,
    });
  };

  const removeExercise = (id: string) => {
    const exercise = formData.exercises.find(ex => ex.id === id);
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== id),
      calories: prev.calories - (exercise?.calories || 0),
    }));
  };

  const handleSubmit = () => {
    if (!formData.title) {
      toast.error('Workout title is required');
      return;
    }

    if (formData.exercises.length === 0) {
      toast.error('At least one exercise is required');
      return;
    }

    addWorkoutLog(formData);
    toast.success('Workout logged successfully');
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      type: 'strength',
      duration: 0,
      exercises: [],
      calories: 0,
      completed: true,
      notes: '',
    });
    
    if (onSave) onSave();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Log Workout</DialogTitle>
          <DialogDescription>Record details about your workout session</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={formData.date.split('T')[0]} 
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Workout Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleChange('type', value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Workout Title</Label>
            <Input 
              id="title" 
              placeholder="e.g., Morning Strength Training" 
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input 
              id="duration" 
              type="number" 
              placeholder="e.g., 45" 
              value={formData.duration || ''}
              onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Exercises</Label>
            </div>
            
            <div className="border rounded-md p-4 space-y-4">
              {formData.exercises.length > 0 ? (
                <div className="space-y-2">
                  {formData.exercises.map((exercise) => (
                    <div key={exercise.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {exercise.type === 'reps' 
                            ? `${exercise.sets} sets × ${exercise.reps} reps ${exercise.weight ? `@ ${exercise.weight} lbs` : ''}`
                            : exercise.type === 'time'
                              ? `${exercise.duration} minutes`
                              : `${exercise.distance} distance`}
                          {exercise.calories ? ` • ${exercise.calories} calories` : ''}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeExercise(exercise.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  No exercises added yet
                </div>
              )}
              
              <div className="space-y-4 pt-4 border-t">
                <h4 className="text-sm font-medium">Add Exercise</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exerciseName">Exercise Name</Label>
                    <Input 
                      id="exerciseName" 
                      placeholder="e.g., Bench Press" 
                      value={currentExercise.name}
                      onChange={(e) => handleExerciseChange('name', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="exerciseType">Exercise Type</Label>
                    <Select 
                      value={currentExercise.type} 
                      onValueChange={(value) => handleExerciseChange('type', value)}
                    >
                      <SelectTrigger id="exerciseType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reps">Reps & Sets</SelectItem>
                        <SelectItem value="time">Time-based</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {currentExercise.type === 'reps' && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sets">Sets</Label>
                      <Input 
                        id="sets" 
                        type="number" 
                        value={currentExercise.sets || ''}
                        onChange={(e) => handleExerciseChange('sets', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reps">Reps</Label>
                      <Input 
                        id="reps" 
                        type="number" 
                        value={currentExercise.reps || ''}
                        onChange={(e) => handleExerciseChange('reps', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (lbs)</Label>
                      <Input 
                        id="weight" 
                        type="number" 
                        value={currentExercise.weight || ''}
                        onChange={(e) => handleExerciseChange('weight', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                )}
                
                {currentExercise.type === 'time' && (
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      value={currentExercise.duration || ''}
                      onChange={(e) => handleExerciseChange('duration', parseInt(e.target.value) || 0)}
                    />
                  </div>
                )}
                
                {currentExercise.type === 'distance' && (
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance (miles)</Label>
                    <Input 
                      id="distance" 
                      type="number" 
                      step="0.1"
                      value={currentExercise.distance || ''}
                      onChange={(e) => handleExerciseChange('distance', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="exerciseCalories">Calories Burned</Label>
                  <Input 
                    id="exerciseCalories" 
                    type="number" 
                    value={currentExercise.calories || ''}
                    onChange={(e) => handleExerciseChange('calories', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <Button type="button" onClick={addExercise} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exercise
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Additional notes about your workout..."
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save Workout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
