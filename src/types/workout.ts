
export type WorkoutType = 'strength' | 'cardio' | 'hiit' | 'yoga' | 'flexibility';
export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'full_body';
export type ExerciseType = 'reps' | 'time' | 'distance';

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  muscleGroup?: MuscleGroup;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number; // in minutes
  distance?: number; // in miles/km
  calories?: number;
  notes?: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  title: string;
  type: WorkoutType;
  duration: number; // in minutes
  exercises: Exercise[];
  calories: number;
  completed: boolean;
  notes?: string;
}

export interface NutritionLog {
  id: string;
  date: string;
  meals: {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    time: string;
  }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  water: number; // in oz
  notes?: string;
}
