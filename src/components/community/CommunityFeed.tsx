
import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Award } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  achievement?: {
    title: string;
    icon: React.ReactNode;
  };
  image?: string;
  likes: number;
  comments: number;
  time: string;
}

const posts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: '',
      username: 'sarah_fit',
    },
    content: 'Just completed a 10K run in under 50 minutes! New personal best 🏃‍♀️',
    achievement: {
      title: '10K Personal Record',
      icon: <Award className="h-4 w-4" />,
    },
    likes: 24,
    comments: 5,
    time: '2 hours ago',
  },
  {
    id: '2',
    user: {
      name: 'Mike Torres',
      avatar: '',
      username: 'mike_lifts',
    },
    content: 'Hit a new deadlift PR today - 315 lbs! Been working on this for months. The grind never stops 💪',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80',
    likes: 47,
    comments: 12,
    time: '5 hours ago',
  },
  {
    id: '3',
    user: {
      name: 'Emily Chen',
      avatar: '',
      username: 'emily_yoga',
    },
    content: 'Morning yoga session with the sunrise. Starting the day with gratitude and mindfulness. Who else loves morning workouts?',
    likes: 18,
    comments: 3,
    time: '1 day ago',
  },
];

const CommunityFeed = () => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="p-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.user.name}</div>
                  <div className="text-sm text-muted-foreground">@{post.user.username} • {post.time}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="mb-4">{post.content}</p>
            
            {post.achievement && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-fitness-purple/10 p-3 text-fitness-purple">
                {post.achievement.icon}
                <span className="text-sm font-medium">{post.achievement.title}</span>
              </div>
            )}
            
            {post.image && (
              <div className="mt-3 mb-3 rounded-lg overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-64 object-cover" 
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Heart className="mr-1 h-4 w-4" /> {post.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MessageCircle className="mr-1 h-4 w-4" /> {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Share2 className="mr-1 h-4 w-4" /> Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CommunityFeed;
