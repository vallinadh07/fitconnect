
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-primary p-1">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 8a2 2 0 0 0-2-2h-1a3 3 0 0 0-3 3v1H9a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h3"></path>
                <path d="M7 17a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3v-1h3a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-3"></path>
              </svg>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">ActiveCircle</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative rounded-md hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-8 h-9 bg-background py-2 text-sm ring-offset-background rounded-md border border-input w-64"
            />
          </div>
          
          <Button size="icon" variant="ghost" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
