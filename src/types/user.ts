
export type UserGoal = 'weight_loss' | 'muscle_gain' | 'endurance' | 'flexibility' | 'general_fitness';
export type ActivityLevel = 'beginner' | 'intermediate' | 'advanced';
export type DietPreference = 'no_preference' | 'vegetarian' | 'vegan' | 'keto' | 'paleo';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  fitness?: {
    weight?: number;
    height?: number;
    goal?: UserGoal;
    activityLevel?: ActivityLevel;
    dietPreference?: DietPreference;
    targetCalories?: number;
    weeklyWorkoutTarget?: number;
  };
  social?: {
    following: number;
    followers: number;
  };
}
