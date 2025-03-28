
import { NutritionLog } from '@/types/workout';

// Helper to generate a unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get all nutrition logs for the current user
export const getNutritionLogs = (): NutritionLog[] => {
  const storedLogs = localStorage.getItem('activeCircleNutrition');
  if (!storedLogs) return [];
  
  try {
    return JSON.parse(storedLogs);
  } catch (error) {
    console.error('Failed to parse nutrition logs', error);
    return [];
  }
};

// Add a new nutrition log
export const addNutritionLog = (log: Omit<NutritionLog, 'id'>): NutritionLog => {
  const logs = getNutritionLogs();
  
  const newLog: NutritionLog = {
    ...log,
    id: generateId(),
  };
  
  const updatedLogs = [newLog, ...logs];
  localStorage.setItem('activeCircleNutrition', JSON.stringify(updatedLogs));
  
  return newLog;
};

// Update an existing nutrition log
export const updateNutritionLog = (log: NutritionLog): NutritionLog => {
  const logs = getNutritionLogs();
  
  const updatedLogs = logs.map(existingLog => 
    existingLog.id === log.id ? log : existingLog
  );
  
  localStorage.setItem('activeCircleNutrition', JSON.stringify(updatedLogs));
  
  return log;
};

// Delete a nutrition log
export const deleteNutritionLog = (id: string): boolean => {
  const logs = getNutritionLogs();
  
  const updatedLogs = logs.filter(log => log.id !== id);
  
  if (updatedLogs.length === logs.length) {
    return false; // Nothing was deleted
  }
  
  localStorage.setItem('activeCircleNutrition', JSON.stringify(updatedLogs));
  
  return true;
};

// Get recent nutrition logs
export const getRecentNutritionLogs = (limit: number = 5): NutritionLog[] => {
  const logs = getNutritionLogs();
  
  return logs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Get nutrition logs by date range
export const getNutritionLogsByDateRange = (startDate: Date, endDate: Date): NutritionLog[] => {
  const logs = getNutritionLogs();
  
  return logs.filter(log => {
    const logDate = new Date(log.date);
    return logDate >= startDate && logDate <= endDate;
  });
};

// Get today's nutrition log
export const getTodaysNutritionLog = (): NutritionLog | null => {
  const logs = getNutritionLogs();
  const today = new Date().toISOString().split('T')[0];
  
  return logs.find(log => log.date.startsWith(today)) || null;
};

// Initialize with sample data if none exists
export const initializeNutritionLogs = (): void => {
  const existingLogs = getNutritionLogs();
  
  if (existingLogs.length === 0) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const sampleLogs: NutritionLog[] = [
      {
        id: 'sample1',
        date: today.toISOString().split('T')[0],
        meals: [
          {
            id: 'meal1',
            name: 'Breakfast',
            calories: 450,
            protein: 25,
            carbs: 40,
            fat: 15,
            time: '08:00',
          },
          {
            id: 'meal2',
            name: 'Lunch',
            calories: 650,
            protein: 35,
            carbs: 55,
            fat: 22,
            time: '13:00',
          },
          {
            id: 'meal3',
            name: 'Dinner',
            calories: 750,
            protein: 40,
            carbs: 60,
            fat: 25,
            time: '19:00',
          },
        ],
        totalCalories: 1850,
        totalProtein: 100,
        totalCarbs: 155,
        totalFat: 62,
        water: 64,
      },
      {
        id: 'sample2',
        date: yesterday.toISOString().split('T')[0],
        meals: [
          {
            id: 'meal4',
            name: 'Breakfast',
            calories: 400,
            protein: 20,
            carbs: 45,
            fat: 12,
            time: '07:30',
          },
          {
            id: 'meal5',
            name: 'Lunch',
            calories: 600,
            protein: 30,
            carbs: 50,
            fat: 25,
            time: '12:30',
          },
          {
            id: 'meal6',
            name: 'Dinner',
            calories: 700,
            protein: 35,
            carbs: 65,
            fat: 20,
            time: '18:30',
          },
        ],
        totalCalories: 1700,
        totalProtein: 85,
        totalCarbs: 160,
        totalFat: 57,
        water: 72,
      },
    ];
    
    localStorage.setItem('activeCircleNutrition', JSON.stringify(sampleLogs));
  }
};
