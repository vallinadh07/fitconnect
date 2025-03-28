
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { LogOut, User, Mail, UserCircle } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };
  
  return (
    <PageLayout>
      <div className="container max-w-4xl py-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
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
            <CardFooter>
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your personal information and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Name</div>
                    <div>{user?.name}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div>{user?.email}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <UserCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Account ID</div>
                    <div className="text-sm text-muted-foreground">{user?.id}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your password and account security</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Your password was last changed on May 12, 2023
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
