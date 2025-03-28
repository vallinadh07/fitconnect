
import { WorkoutLog, Exercise, WorkoutType } from '@/types/workout';

// Helper to generate a unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get all workout logs for the current user
export const getWorkoutLogs = (): WorkoutLog[] => {
  const storedLogs = localStorage.getItem('activeCircleWorkouts');
  if (!storedLogs) return [];
  
  try {
    return JSON.parse(storedLogs);
  } catch (error) {
    console.error('Failed to parse workout logs', error);
    return [];
  }
};

// Add a new workout log
export const addWorkoutLog = (workout: Omit<WorkoutLog, 'id'>): WorkoutLog => {
  const logs = getWorkoutLogs();
  
  const newWorkout: WorkoutLog = {
    ...workout,
    id: generateId(),
  };
  
  const updatedLogs = [newWorkout, ...logs];
  localStorage.setItem('activeCircleWorkouts', JSON.stringify(updatedLogs));
  
  return newWorkout;
};

// Update an existing workout log
export const updateWorkoutLog = (workout: WorkoutLog): WorkoutLog => {
  const logs = getWorkoutLogs();
  
  const updatedLogs = logs.map(log => 
    log.id === workout.id ? workout : log
  );
  
  localStorage.setItem('activeCircleWorkouts', JSON.stringify(updatedLogs));
  
  return workout;
};

// Delete a workout log
export const deleteWorkoutLog = (id: string): boolean => {
  const logs = getWorkoutLogs();
  
  const updatedLogs = logs.filter(log => log.id !== id);
  
  if (updatedLogs.length === logs.length) {
    return false; // Nothing was deleted
  }
  
  localStorage.setItem('activeCircleWorkouts', JSON.stringify(updatedLogs));
  
  return true;
};

// Get recent workout logs
export const getRecentWorkoutLogs = (limit: number = 5): WorkoutLog[] => {
  const logs = getWorkoutLogs();
  
  return logs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Get workout logs by date range
export const getWorkoutLogsByDateRange = (startDate: Date, endDate: Date): WorkoutLog[] => {
  const logs = getWorkoutLogs();
  
  return logs.filter(log => {
    const logDate = new Date(log.date);
    return logDate >= startDate && logDate <= endDate;
  });
};

// Get workout logs by type
export const getWorkoutLogsByType = (type: WorkoutType): WorkoutLog[] => {
  const logs = getWorkoutLogs();
  
  return logs.filter(log => log.type === type);
};

// Calculate total calories burned in a date range
export const getTotalCaloriesBurned = (startDate: Date, endDate: Date): number => {
  const logs = getWorkoutLogsByDateRange(startDate, endDate);
  
  return logs.reduce((total, log) => total + log.calories, 0);
};

// Calculate total workout duration in a date range
export const getTotalWorkoutDuration = (startDate: Date, endDate: Date): number => {
  const logs = getWorkoutLogsByDateRange(startDate, endDate);
  
  return logs.reduce((total, log) => total + log.duration, 0);
};

// Initialize with sample data if none exists
export const initializeWorkoutLogs = (): void => {
  const existingLogs = getWorkoutLogs();
  
  if (existingLogs.length === 0) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const sampleLogs: WorkoutLog[] = [
      {
        id: 'sample1',
        date: today.toISOString(),
        title: 'Morning Strength Training',
        type: 'strength',
        duration: 45,
        calories: 320,
        completed: true,
        exercises: [
          {
            id: 'ex1',
            name: 'Bench Press',
            type: 'reps',
            muscleGroup: 'chest',
            sets: 3,
            reps: 10,
            weight: 135,
          },
          {
            id: 'ex2',
            name: 'Squats',
            type: 'reps',
            muscleGroup: 'legs',
            sets: 3,
            reps: 12,
            weight: 185,
          },
          {
            id: 'ex3',
            name: 'Pull Ups',
            type: 'reps',
            muscleGroup: 'back',
            sets: 3,
            reps: 8,
          },
        ],
      },
      {
        id: 'sample2',
        date: yesterday.toISOString(),
        title: 'Cardio Session',
        type: 'cardio',
        duration: 30,
        calories: 250,
        completed: true,
        exercises: [
          {
            id: 'ex4',
            name: 'Treadmill',
            type: 'time',
            duration: 20,
            distance: 2.5,
            calories: 180,
          },
          {
            id: 'ex5',
            name: 'Jump Rope',
            type: 'time',
            duration: 10,
            calories: 70,
          },
        ],
      },
      {
        id: 'sample3',
        date: twoDaysAgo.toISOString(),
        title: 'Yoga and Stretching',
        type: 'yoga',
        duration: 40,
        calories: 180,
        completed: true,
        exercises: [
          {
            id: 'ex6',
            name: 'Sun Salutation',
            type: 'time',
            duration: 15,
            calories: 60,
          },
          {
            id: 'ex7',
            name: 'Deep Stretching',
            type: 'time',
            duration: 25,
            calories: 120,
          },
        ],
      },
    ];
    
    localStorage.setItem('activeCircleWorkouts', JSON.stringify(sampleLogs));
  }
};
