
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserGoal, ActivityLevel, DietPreference } from '@/types/user';
import { Target, Activity, Utensils, Scale, Ruler } from 'lucide-react';
import { toast } from 'sonner';

const ProfileFitnessGoals = () => {
  const { user, updateFitnessGoals } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    weight: user?.fitness?.weight || '',
    height: user?.fitness?.height || '',
    goal: user?.fitness?.goal || 'general_fitness',
    activityLevel: user?.fitness?.activityLevel || 'intermediate',
    dietPreference: user?.fitness?.dietPreference || 'no_preference',
    targetCalories: user?.fitness?.targetCalories || '',
    weeklyWorkoutTarget: user?.fitness?.weeklyWorkoutTarget || 3,
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const numberFields = {
      weight: formData.weight !== '' ? Number(formData.weight) : undefined,
      height: formData.height !== '' ? Number(formData.height) : undefined,
      targetCalories: formData.targetCalories !== '' ? Number(formData.targetCalories) : undefined,
      weeklyWorkoutTarget: Number(formData.weeklyWorkoutTarget),
    };

    updateFitnessGoals({
      ...numberFields,
      goal: formData.goal as UserGoal,
      activityLevel: formData.activityLevel as ActivityLevel, 
      dietPreference: formData.dietPreference as DietPreference,
    });
    
    setIsEditing(false);
    toast.success("Fitness goals updated successfully");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Fitness Goals & Preferences</CardTitle>
            <CardDescription>Update your fitness profile and personal targets</CardDescription>
          </div>
          <Button 
            variant={isEditing ? "default" : "outline"} 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Goals"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEditing ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Primary Goal</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {user?.fitness?.goal?.replace('_', ' ') || 'Not set'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Activity Level</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {user?.fitness?.activityLevel || 'Not set'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Utensils className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Diet Preference</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {user?.fitness?.dietPreference?.replace('_', ' ') || 'No preference'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Current Weight</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.fitness?.weight ? `${user.fitness.weight} lbs` : 'Not set'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Ruler className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Height</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.fitness?.height ? `${user.fitness.height} cm` : 'Not set'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Weekly Workout Target</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.fitness?.weeklyWorkoutTarget ? `${user.fitness.weeklyWorkoutTarget} workouts per week` : 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="goal">Primary Goal</Label>
              <Select 
                value={formData.goal} 
                onValueChange={(value) => handleChange('goal', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight_loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="general_fitness">General Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select 
                value={formData.activityLevel} 
                onValueChange={(value) => handleChange('activityLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dietPreference">Diet Preference</Label>
              <Select 
                value={formData.dietPreference} 
                onValueChange={(value) => handleChange('dietPreference', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select diet preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no_preference">No Preference</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="paleo">Paleo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Current Weight (lbs)</Label>
              <Input 
                id="weight" 
                type="number" 
                placeholder="Enter your weight"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input 
                id="height" 
                type="number" 
                placeholder="Enter your height"
                value={formData.height}
                onChange={(e) => handleChange('height', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weeklyWorkoutTarget">Weekly Workout Target</Label>
              <Select 
                value={String(formData.weeklyWorkoutTarget)} 
                onValueChange={(value) => handleChange('weeklyWorkoutTarget', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 workout per week</SelectItem>
                  <SelectItem value="2">2 workouts per week</SelectItem>
                  <SelectItem value="3">3 workouts per week</SelectItem>
                  <SelectItem value="4">4 workouts per week</SelectItem>
                  <SelectItem value="5">5 workouts per week</SelectItem>
                  <SelectItem value="6">6 workouts per week</SelectItem>
                  <SelectItem value="7">7 workouts per week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
      {isEditing && (
        <CardFooter>
          <Button onClick={handleSave} className="ml-auto">Save Changes</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfileFitnessGoals;
