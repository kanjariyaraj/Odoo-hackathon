import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  MapPin, 
  User,
  Star,
  Clock,
  Ruler,
  Heart,
  MessageSquare,
  Share,
  Flag,
  Calendar,
  Award
} from "lucide-react";

interface ItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string | null;
  onRequest: (itemId: string) => void;
  currentUser: any;
}

export function ItemDetailsModal({ isOpen, onClose, itemId, onRequest, currentUser }: ItemDetailsModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  // Mock item data - in real app would fetch based on itemId
  const mockItem = {
    id: itemId || '1',
    title: 'Vintage Denim Jacket',
    category: 'Jacket',
    size: 'M',
    gender: 'Unisex',
    condition: 'Good',
    description: 'This beautiful vintage denim jacket has been a favorite of mine for years. It\'s in excellent condition with minimal wear. The classic blue color goes with everything and the fit is perfect for layering. I\'m moving to a warmer climate and want this to find a new loving home.',
    image: '/placeholder.svg?height=400&width=400',
    images: ['/placeholder.svg?height=400&width=400'], // Additional images
    location: 'Downtown',
    distance: 1.2,
    donorName: 'Sarah Chen',
    donorRating: 4.8,
    donorJoinDate: '2023-06-15',
    donorDonations: 23,
    uploadedAt: '2024-01-15T10:30:00Z',
    points: 10,
    requestsCount: 3,
    isFeatured: true,
    pickupInstructions: 'Available for pickup Mon-Fri after 6pm and weekends. Please message me to coordinate a time.',
    tags: ['Vintage', 'Classic', 'Versatile', 'Timeless']
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'bg-primary text-primary-foreground';
      case 'Good': return 'bg-reward text-reward-foreground';
      case 'Worn': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const canRequest = currentUser?.role === 'receiver' || currentUser?.role === 'both';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Item Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image and Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                <img 
                  src={mockItem.image} 
                  alt={mockItem.title}
                  className="w-full h-full object-cover"
                />
                {mockItem.isFeatured && (
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{mockItem.title}</h1>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{mockItem.category}</Badge>
                  <Badge className={getConditionColor(mockItem.condition)}>
                    {mockItem.condition}
                  </Badge>
                </div>
              </div>

              {/* Item Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <span>Size {mockItem.size} • {mockItem.gender}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{mockItem.location} • {mockItem.distance}km away</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Posted {formatTimeAgo(mockItem.uploadedAt)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-reward" />
                  <span className="font-semibold">{mockItem.points} reward points</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {mockItem.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{mockItem.description}</p>
          </Card>

          {/* Pickup Instructions */}
          <Card className="p-4 bg-secondary/30">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Pickup Instructions
            </h3>
            <p className="text-sm text-muted-foreground">{mockItem.pickupInstructions}</p>
          </Card>

          {/* Donor Info */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">About the Donor</h3>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{mockItem.donorName}</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{mockItem.donorRating.toFixed(1)} rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    <span>{mockItem.donorDonations} donations</span>
                  </div>
                  <div>
                    Member since {new Date(mockItem.donorJoinDate).getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Interest */}
          {mockItem.requestsCount > 0 && (
            <Card className="p-3 bg-accent/5 border-accent/20">
              <div className="text-sm text-center">
                <MessageSquare className="h-4 w-4 inline mr-1" />
                {mockItem.requestsCount} people have requested this item
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {canRequest ? (
              <Button 
                variant="community" 
                className="flex-1"
                onClick={() => {
                  onRequest(mockItem.id);
                  onClose();
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Request This Item
              </Button>
            ) : (
              <Button variant="outline" className="flex-1" disabled>
                Sign in to Request
              </Button>
            )}
            
            <Button variant="outline" size="icon">
              <Share className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}