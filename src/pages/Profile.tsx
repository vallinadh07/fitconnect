
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { LogOut, User as UserIcon, Mail, UserCircle, Target, Activity, Utensils, Scale, Ruler } from 'lucide-react';
import { UserGoal, ActivityLevel, DietPreference } from '@/types/user';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import ProfileFitnessGoals from '@/components/profile/ProfileFitnessGoals';
import ProfileSettings from '@/components/profile/ProfileSettings';
import ProfileStats from '@/components/profile/ProfileStats';

const Profile = () => {
  const { user, isAuthenticated, logout, updateProfile, updateFitnessGoals } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <PageLayout>
      <div className="container max-w-6xl py-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and fitness preferences
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-2 border-4 border-background shadow-lg">
                <img 
                  src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg"} 
                  alt={user?.name || "Profile"} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Followers</span>
                  <span className="font-bold">{user?.social?.followers || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Following</span>
                  <span className="font-bold">{user?.social?.following || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Weekly Goal</span>
                  <div className="flex-1 mx-2">
                    <Progress value={(user?.fitness?.weeklyWorkoutTarget ? 2 / user?.fitness?.weeklyWorkoutTarget * 100 : 0)} className="h-2" />
                  </div>
                  <span className="text-xs">2/{user?.fitness?.weeklyWorkoutTarget || 0}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </CardFooter>
          </Card>
          
          <div>
            <Tabs defaultValue="goals" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="goals">Fitness Goals</TabsTrigger>
                <TabsTrigger value="stats">Stats & Progress</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="goals">
                <ProfileFitnessGoals />
              </TabsContent>
              
              <TabsContent value="stats">
                <ProfileStats />
              </TabsContent>
              
              <TabsContent value="settings">
                <ProfileSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
