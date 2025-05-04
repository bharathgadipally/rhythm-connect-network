
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { currentUser } from "@/data/mockData";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
                RhythmConnect
              </span>
            </Link>
          </div>
          
          {!isMobile && (
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link to="/" className="hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/dashboard" className="hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/listings" className="hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                  Listings
                </Link>
                <Link to="/matches" className="hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                  Matches
                </Link>
              </div>
            </div>
          )}
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/listings" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Listings
            </Link>
            <Link 
              to="/matches" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Matches
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium">{currentUser.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</div>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link 
                to="/settings" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
