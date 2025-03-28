
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserGoal, ActivityLevel, DietPreference } from '@/types/user';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => void;
  updateFitnessGoals: (fitnessData: Partial<User['fitness']>) => void;
};

const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  updateProfile: () => {},
  updateFitnessGoals: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('activeCircleUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('activeCircleUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would validate against a backend
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple validation
    if (!email || !password) return false;
    
    // In a real app, this would be an API call
    if (password.length < 6) return false;
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      fitness: {
        goal: 'general_fitness',
        activityLevel: 'intermediate',
        dietPreference: 'no_preference',
        weeklyWorkoutTarget: 3,
      },
      social: {
        following: 12,
        followers: 8,
      }
    };
    
    // Store user in localStorage
    localStorage.setItem('activeCircleUser', JSON.stringify(mockUser));
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('activeCircleUser');
    setUser(null);
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('activeCircleUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updateFitnessGoals = (fitnessData: Partial<User['fitness']>) => {
    if (!user) return;
    
    const updatedUser = { 
      ...user, 
      fitness: { 
        ...user.fitness, 
        ...fitnessData 
      }
    };
    
    localStorage.setItem('activeCircleUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateProfile,
        updateFitnessGoals,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
