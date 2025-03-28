
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

// Mock data for weight tracking
const initialWeightData = [
  { date: 'Apr 1', weight: 166 },
  { date: 'Apr 8', weight: 165 },
  { date: 'Apr 15', weight: 163.5 },
  { date: 'Apr 22', weight: 162 },
  { date: 'Apr 29', weight: 161 },
  { date: 'May 6', weight: 159.5 },
  { date: 'May 13', weight: 158 },
];

// Mock data for workout activity
const initialWorkoutData = [
  { date: 'Apr 1', minutes: 30 },
  { date: 'Apr 8', minutes: 45 },
  { date: 'Apr 15', minutes: 60 },
  { date: 'Apr 22', minutes: 45 },
  { date: 'Apr 29', minutes: 75 },
  { date: 'May 6', minutes: 90 },
  { date: 'May 13', minutes: 60 },
];

// Initial metrics data
const initialMetrics = [
  {
    title: 'Weight',
    currentValue: '158 lbs',
    change: '-8 lbs',
    positive: true,
    period: 'Since Apr 1',
    icon: 'weight',
  },
  {
    title: 'Body Fat',
    currentValue: '18.2%',
    change: '-2.4%',
    positive: true,
    period: 'Since Apr 1',
    icon: 'ruler',
  },
  {
    title: 'Weekly Activity',
    currentValue: '205 mins',
    change: '+45 mins',
    positive: true,
    period: 'vs. last week',
    icon: 'calendar',
  },
  {
    title: 'Streak',
    currentValue: '15 days',
    change: '+15 days',
    positive: true,
    period: 'Current',
    icon: 'trending',
  },
];

// Function to simulate a real API fetch with random small changes
const fetchWeightData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Clone the data to avoid mutations
  const data = [...initialWeightData];
  
  // Add some small random variations to the most recent data points
  const recentEntries = data.slice(-2);
  recentEntries.forEach(entry => {
    const variation = (Math.random() * 0.4) - 0.2; // Random value between -0.2 and 0.2
    entry.weight = parseFloat((entry.weight + variation).toFixed(1));
  });
  
  return data;
};

const fetchWorkoutData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Clone the data to avoid mutations
  const data = [...initialWorkoutData];
  
  // Add some small random variations to the most recent data points
  const lastEntry = data[data.length - 1];
  const variation = Math.floor(Math.random() * 10) - 5; // Random value between -5 and 5
  lastEntry.minutes = Math.max(30, lastEntry.minutes + variation);
  
  return data;
};

const fetchMetricsData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Clone the data to avoid mutations
  const data = JSON.parse(JSON.stringify(initialMetrics));
  
  // Update the Weekly Activity metric with a random variation
  const activityMetric = data.find(m => m.title === 'Weekly Activity');
  if (activityMetric) {
    const currentValue = parseInt(activityMetric.currentValue);
    const variation = Math.floor(Math.random() * 10) - 5; // Random value between -5 and 5
    const newValue = Math.max(180, currentValue + variation);
    activityMetric.currentValue = `${newValue} mins`;
    
    // Update the change based on the new value
    const change = newValue - 160; // Assuming base value was 160
    activityMetric.change = `${change >= 0 ? '+' : ''}${change} mins`;
    activityMetric.positive = change >= 0;
  }
  
  return data;
};

export function useWeightData(enabled = true) {
  return useQuery({
    queryKey: ['weightData'],
    queryFn: fetchWeightData,
    refetchInterval: 10000, // Refetch every 10 seconds
    enabled,
    initialData: initialWeightData,
  });
}

export function useWorkoutData(enabled = true) {
  return useQuery({
    queryKey: ['workoutData'],
    queryFn: fetchWorkoutData,
    refetchInterval: 15000, // Refetch every 15 seconds
    enabled,
    initialData: initialWorkoutData,
  });
}

export function useMetricsData(enabled = true) {
  return useQuery({
    queryKey: ['metricsData'],
    queryFn: fetchMetricsData,
    refetchInterval: 8000, // Refetch every 8 seconds
    enabled,
    initialData: initialMetrics,
  });
}
