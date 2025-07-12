import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shirt, 
  Heart, 
  Users, 
  MapPin, 
  Recycle,
  TrendingUp,
  Star,
  ArrowRight
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onBrowse: () => void;
}

export function HeroSection({ onGetStarted, onBrowse }: HeroSectionProps) {
  const stats = [
    { label: "Items Donated", value: "12,847", icon: Heart, color: "text-primary" },
    { label: "Active Members", value: "3,421", icon: Users, color: "text-accent" },
    { label: "Cities Connected", value: "156", icon: MapPin, color: "text-reward" },
    { label: "CO₂ Saved", value: "2.3T", icon: Recycle, color: "text-primary-glow" },
  ];

  const features = [
    {
      title: "Hyperlocal Exchange",
      description: "Find clothing donations in your neighborhood",
      icon: MapPin,
      gradient: "from-primary to-primary-glow"
    },
    {
      title: "Earn Rewards",
      description: "Get points for donations and climb the leaderboard",
      icon: TrendingUp,
      gradient: "from-reward to-accent"
    },
    {
      title: "Community Impact",
      description: "Join thousands making sustainable fashion choices",
      icon: Users,
      gradient: "from-accent to-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/5">
      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">
            <Star className="h-4 w-4 mr-2" />
            Community-Driven Clothing Exchange
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Rewear</span> Your Community's{" "}
            <span className="gradient-text">Closet</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform unused clothing into community treasures. Donate locally, 
            earn rewards, and build a sustainable fashion future together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onGetStarted}
              className="group"
            >
              Join the Movement
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              onClick={onBrowse}
              className="hover-lift"
            >
              Browse Items
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center hover-lift bg-card/70 backdrop-blur-sm">
                <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 text-center hover-lift bg-card/70 backdrop-blur-sm relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5`} />
                <div className="relative">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${feature.gradient} mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="p-8 md:p-12 hero-gradient text-primary-foreground shadow-community max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Every donation counts. Every connection matters. 
              Join thousands building a more sustainable community.
            </p>
            <Button 
              variant="secondary" 
              size="xl" 
              onClick={onGetStarted}
              className="hover-scale"
            >
              Start Donating Today
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}