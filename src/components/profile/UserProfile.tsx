import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar,
  Edit,
  Trophy,
  Star,
  Gift,
  Heart,
  Users,
  Settings,
  Bell,
  Shield,
  Download
} from "lucide-react";

interface UserProfileProps {
  currentUser: any;
}

export function UserProfile({ currentUser }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    city: currentUser?.city || '',
    bio: 'Passionate about sustainable fashion and community building.'
  });

  const stats = [
    { label: 'Total Points', value: currentUser?.points || 156, icon: Star, color: 'text-reward' },
    { label: 'Items Donated', value: 12, icon: Gift, color: 'text-primary' },
    { label: 'Items Received', value: 3, icon: Heart, color: 'text-accent' },
    { label: 'Community Rank', value: '#8', icon: Trophy, color: 'text-reward' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'donation',
      title: 'Donated Vintage Denim Jacket',
      points: 10,
      date: '2 days ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'request',
      title: 'Requested Nike Running Shoes',
      date: '5 days ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'donation',
      title: 'Donated Black Formal Pants',
      points: 7,
      date: '1 week ago',
      status: 'completed'
    }
  ];

  const achievements = [
    { name: 'First Donation', icon: Gift, earned: true, date: '1 week ago' },
    { name: 'Rising Star', icon: Star, earned: true, date: '3 days ago' },
    { name: 'Community Helper', icon: Users, earned: false },
    { name: 'Super Donor', icon: Trophy, earned: false }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile data
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="p-6 mb-8 shadow-card">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="community" onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {currentUser?.role === 'both' ? 'Donor + Receiver' : 
                         currentUser?.role?.charAt(0).toUpperCase() + currentUser?.role?.slice(1)}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{profileData.bio}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {currentUser?.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {currentUser?.city}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {new Date(currentUser?.joinedAt || '2024-01-01').toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 text-center hover-lift shadow-card">
                  <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card className="shadow-card">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                </div>
                <div className="divide-y">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'donation' ? 'bg-primary/10' : 'bg-accent/10'
                        }`}>
                          {activity.type === 'donation' ? 
                            <Gift className="h-5 w-5 text-primary" /> : 
                            <Heart className="h-5 w-5 text-accent" />
                          }
                        </div>
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">{activity.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.points && (
                          <div className="text-reward font-semibold">+{activity.points} pts</div>
                        )}
                        <Badge variant={activity.status === 'completed' ? 'default' : 'outline'}>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-semibold mb-6">Your Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border flex items-center gap-4 ${
                          achievement.earned 
                            ? 'bg-primary/5 border-primary/20' 
                            : 'bg-muted/30 border-muted opacity-60'
                        }`}
                      >
                        <Icon className={`h-8 w-8 ${
                          achievement.earned ? 'text-reward' : 'text-muted-foreground'
                        }`} />
                        <div className="flex-1">
                          <div className="font-medium">{achievement.name}</div>
                          {achievement.earned && achievement.date && (
                            <div className="text-sm text-muted-foreground">Earned {achievement.date}</div>
                          )}
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-reward text-reward-foreground">
                            Earned
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-6">
                <Card className="p-6 shadow-card">
                  <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Email notifications for new requests', enabled: true },
                      { label: 'Push notifications for messages', enabled: true },
                      { label: 'Weekly digest emails', enabled: false },
                      { label: 'Achievement notifications', enabled: true }
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span>{setting.label}</span>
                        </div>
                        <Button variant={setting.enabled ? "community" : "outline"} size="sm">
                          {setting.enabled ? 'Enabled' : 'Disabled'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 shadow-card">
                  <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>Make profile public</span>
                      </div>
                      <Button variant="community" size="sm">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Show location to other users</span>
                      </div>
                      <Button variant="community" size="sm">Enabled</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="certificates">
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-semibold mb-4">Download Certificates</h2>
                <p className="text-muted-foreground mb-6">
                  Download official certificates for your contributions to the community.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Community Impact Certificate</div>
                      <div className="text-sm text-muted-foreground">
                        12 items donated • 156 points earned
                      </div>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                    <div>
                      <div className="font-medium">Top Donor Certificate</div>
                      <div className="text-sm text-muted-foreground">
                        Reach top 3 in your city to unlock
                      </div>
                    </div>
                    <Button variant="outline" disabled>
                      Locked
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}