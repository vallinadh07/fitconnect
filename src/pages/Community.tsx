
import React from 'react';
import { PlusCircle, Trophy, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PageLayout from '@/components/layout/PageLayout';
import CommunityFeed from '@/components/community/CommunityFeed';

const trendingChallenges = [
  {
    id: '1',
    title: '30-Day Plank Challenge',
    participants: 1245,
    days: 5,
  },
  {
    id: '2',
    title: '10K Steps Daily',
    participants: 876,
    days: 10,
  },
  {
    id: '3',
    title: 'Yoga for Beginners',
    participants: 532,
    days: 21,
  },
];

const topUsers = [
  {
    id: '1',
    name: 'Jessica Kim',
    username: 'jess_fitness',
    avatar: '',
    points: 1280,
  },
  {
    id: '2',
    name: 'David Chen',
    username: 'david_runs',
    avatar: '',
    points: 1150,
  },
  {
    id: '3',
    name: 'Emma Williams',
    username: 'emma_lifts',
    avatar: '',
    points: 980,
  },
];

const Community = () => {
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">
            Connect and share with other fitness enthusiasts
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Post
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="feed">
            <TabsList className="mb-6">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed" className="m-0">
              <CommunityFeed />
            </TabsContent>
            
            <TabsContent value="following" className="m-0">
              <div className="flex items-center justify-center h-64 border rounded-lg">
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Follow users to see their posts</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Start following other users to see their activity here
                  </p>
                  <Button className="mt-4">Find Users</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="m-0">
              <CommunityFeed />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Trophy className="mr-2 h-5 w-5 text-fitness-orange" /> 
                Trending Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingChallenges.map((challenge) => (
                  <div key={challenge.id} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {challenge.participants.toLocaleString()} participants • {challenge.days} days
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Join</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="mr-2 h-5 w-5 text-fitness-purple" /> 
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-muted-foreground">
                        {index + 1}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                    <div className="font-medium">
                      {user.points.toLocaleString()} pts
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Community;
