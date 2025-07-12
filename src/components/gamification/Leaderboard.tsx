import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Trophy, 
  Medal, 
  Award,
  Crown,
  Star,
  Users,
  Calendar,
  MapPin,
  Download,
  Gift
} from "lucide-react";

interface LeaderboardProps {
  currentUser: any;
}

interface LeaderEntry {
  rank: number;
  name: string;
  points: number;
  donations: number;
  city: string;
  avatar?: string;
  isCurrentUser?: boolean;
  badges: string[];
}

export function Leaderboard({ currentUser }: LeaderboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCity, setSelectedCity] = useState(currentUser?.city || 'all');

  const mockLeaderboard: LeaderEntry[] = [
    {
      rank: 1,
      name: 'Sarah Chen',
      points: 2847,
      donations: 127,
      city: 'San Francisco',
      badges: ['Top Donor', 'Community Hero', 'Green Champion']
    },
    {
      rank: 2,
      name: 'Mike Johnson',
      points: 2156,
      donations: 89,
      city: 'San Francisco',
      badges: ['Consistent Giver', 'Quality Items']
    },
    {
      rank: 3,
      name: 'Emma Wilson',
      points: 1943,
      donations: 76,
      city: 'San Francisco',
      badges: ['Fashion Forward', 'Top Donor']
    },
    {
      rank: 4,
      name: 'David Kim',
      points: 1672,
      donations: 68,
      city: 'San Francisco',
      badges: ['Reliable Donor']
    },
    {
      rank: 5,
      name: 'Lisa Park',
      points: 1456,
      donations: 52,
      city: 'San Francisco',
      badges: ['Rising Star']
    },
    {
      rank: 8,
      name: currentUser?.name || 'You',
      points: currentUser?.points || 156,
      donations: 12,
      city: currentUser?.city || 'San Francisco',
      isCurrentUser: true,
      badges: ['New Member']
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</div>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const currentUserEntry = mockLeaderboard.find(entry => entry.isCurrentUser);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Community Leaderboard</h1>
            <p className="text-muted-foreground">
              Celebrating our top donors and their impact on the community
            </p>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-8 shadow-card">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Time Period</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">This Week</SelectItem>
                      <SelectItem value="monthly">This Month</SelectItem>
                      <SelectItem value="yearly">This Year</SelectItem>
                      <SelectItem value="alltime">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">City</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      <SelectItem value="San Francisco">San Francisco</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Certificate
              </Button>
            </div>
          </Card>

          {/* Current User Stats */}
          {currentUserEntry && (
            <Card className="p-6 mb-8 community-gradient text-primary-foreground">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Your Position</h2>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold mb-1">#{currentUserEntry.rank}</div>
                    <div className="text-sm opacity-90">Current Rank</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">{currentUserEntry.points}</div>
                    <div className="text-sm opacity-90">Total Points</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">{currentUserEntry.donations}</div>
                    <div className="text-sm opacity-90">Items Donated</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {mockLeaderboard.slice(0, 3).map((entry) => (
              <Card 
                key={entry.rank} 
                className={`p-6 text-center relative overflow-hidden ${
                  entry.rank === 1 ? 'order-2 md:order-1 transform md:scale-105' : 
                  entry.rank === 2 ? 'order-1 md:order-2' : 'order-3'
                }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${getRankColor(entry.rank)}`} />
                
                <div className="mb-4">
                  {getRankIcon(entry.rank)}
                </div>
                
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="font-semibold text-lg mb-1">{entry.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {entry.city}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="text-2xl font-bold text-primary">{entry.points}</div>
                  <div className="text-sm text-muted-foreground">points</div>
                  <div className="text-sm">
                    <Gift className="h-4 w-4 inline mr-1" />
                    {entry.donations} donations
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 justify-center">
                  {entry.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card className="shadow-card">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Full Rankings
              </h2>
            </div>
            
            <div className="divide-y">
              {mockLeaderboard.map((entry) => (
                <div 
                  key={entry.rank} 
                  className={`p-4 flex items-center justify-between hover:bg-muted/50 transition-smooth ${
                    entry.isCurrentUser ? 'bg-primary/5 border-l-4 border-primary' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(entry.rank)}
                    </div>
                    
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div>
                      <div className="font-medium">
                        {entry.name}
                        {entry.isCurrentUser && (
                          <Badge className="ml-2 text-xs">You</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {entry.city}
                        <span>•</span>
                        <Gift className="h-3 w-3" />
                        {entry.donations} donations
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{entry.points}</div>
                    <div className="text-sm text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="mt-8 p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-reward" />
              Achievement Badges
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'First Donation', description: 'Complete your first donation', earned: true },
                { name: 'Rising Star', description: 'Earn 100 points', earned: true },
                { name: 'Community Helper', description: 'Earn 500 points', earned: false },
                { name: 'Super Donor', description: 'Earn 1000 points', earned: false },
                { name: 'Fashion Forward', description: 'Donate 10 clothing items', earned: false },
                { name: 'Green Champion', description: 'Help save 100kg CO₂', earned: false },
                { name: 'City Leader', description: 'Top 10 in your city', earned: false },
                { name: 'Consistency King', description: 'Donate for 30 days straight', earned: false }
              ].map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border text-center ${
                    achievement.earned 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-muted/30 border-muted opacity-60'
                  }`}
                >
                  <Star className={`h-8 w-8 mx-auto mb-2 ${
                    achievement.earned ? 'text-reward' : 'text-muted-foreground'
                  }`} />
                  <div className="font-medium text-sm mb-1">{achievement.name}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}