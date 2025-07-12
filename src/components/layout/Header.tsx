import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shirt, 
  Menu, 
  X, 
  Heart, 
  Trophy, 
  MapPin,
  User,
  PlusCircle,
  Search
} from "lucide-react";

interface HeaderProps {
  currentUser?: {
    name: string;
    role: 'donor' | 'receiver' | 'both';
    points: number;
    city: string;
  };
  onAuthClick: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ currentUser, onAuthClick, onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'browse', label: 'Browse Items', icon: Search },
    { id: 'add-item', label: 'Donate Item', icon: PlusCircle },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="bg-card border-b border-border shadow-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer hover-scale" 
          onClick={() => onNavigate('home')}
        >
          <div className="p-2 community-gradient rounded-lg">
            <Shirt className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">ReWear</h1>
            <p className="text-xs text-muted-foreground">Community Exchange</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "community" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="hidden sm:flex items-center gap-3">
              <Card className="px-3 py-1 bg-secondary/50">
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4 text-reward" />
                  <span className="font-semibold">{currentUser.points}</span>
                  <span className="text-muted-foreground">pts</span>
                </div>
              </Card>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{currentUser.city}</span>
              </div>
              <Badge variant={currentUser.role === 'donor' ? 'default' : currentUser.role === 'receiver' ? 'secondary' : 'outline'}>
                {currentUser.role === 'both' ? 'Donor + Receiver' : currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
              </Badge>
            </div>
          ) : (
            <Button variant="community" onClick={onAuthClick}>
              Join Community
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {currentUser && (
              <div className="mb-4 p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{currentUser.name}</span>
                  <Badge variant="outline">{currentUser.role}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-reward" />
                    <span>{currentUser.points} pts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{currentUser.city}</span>
                  </div>
                </div>
              </div>
            )}
            
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "community" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
            
            {!currentUser && (
              <Button 
                variant="community" 
                className="w-full mt-4"
                onClick={() => {
                  onAuthClick();
                  setMobileMenuOpen(false);
                }}
              >
                Join Community
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}