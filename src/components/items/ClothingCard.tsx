import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Star, 
  Heart,
  MessageSquare,
  User,
  Calendar,
  Ruler,
  Zap
} from "lucide-react";

export interface ClothingItem {
  id: string;
  title: string;
  category: 'T-Shirt' | 'Pant' | 'Jacket' | 'Shoes';
  size: string;
  gender: 'Male' | 'Female' | 'Unisex';
  condition: 'New' | 'Good' | 'Worn';
  image: string;
  location: string;
  distance: number;
  donorName: string;
  donorRating: number;
  uploadedAt: string;
  description?: string;
  isFeatured?: boolean;
  points: number;
  requestsCount: number;
}

interface ClothingCardProps {
  item: ClothingItem;
  onRequest: (itemId: string) => void;
  onViewDetails: (itemId: string) => void;
  currentUser?: {
    id: string;
    role: 'donor' | 'receiver' | 'both';
  };
}

export function ClothingCard({ item, onRequest, onViewDetails, currentUser }: ClothingCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'bg-primary text-primary-foreground';
      case 'Good': return 'bg-reward text-reward-foreground';
      case 'Worn': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    // For MVP, we'll use a simple text indicator
    return category;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const canRequest = currentUser?.role === 'receiver' || currentUser?.role === 'both';

  return (
    <Card className="overflow-hidden hover-lift group relative">
      {/* Featured Badge */}
      {item.isFeatured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-accent text-accent-foreground border-accent/20">
            <Zap className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      {/* Like Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
      >
        <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
      </Button>

      {/* Image */}
      <div 
        className="aspect-square bg-muted cursor-pointer overflow-hidden"
        onClick={() => onViewDetails(item.id)}
      >
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 cursor-pointer hover:text-primary"
                onClick={() => onViewDetails(item.id)}>
              {item.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>{getCategoryIcon(item.category)}</span>
              <span>•</span>
              <Ruler className="h-3 w-3" />
              <span>Size {item.size}</span>
              <span>•</span>
              <span>{item.gender}</span>
            </div>
          </div>
          <Badge className={getConditionColor(item.condition)}>
            {item.condition}
          </Badge>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Location & Distance */}
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {item.distance}km away
          </Badge>
        </div>

        {/* Donor Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">{item.donorName}</div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{item.donorRating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-reward font-semibold">
              <Star className="h-4 w-4" />
              <span>{item.points} pts</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatTimeAgo(item.uploadedAt)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {canRequest ? (
            <Button 
              variant="community" 
              className="flex-1"
              onClick={() => onRequest(item.id)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Request Item
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onViewDetails(item.id)}
            >
              View Details
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onViewDetails(item.id)}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>

        {/* Request Count */}
        {item.requestsCount > 0 && (
          <div className="mt-2 text-center">
            <Badge variant="outline" className="text-xs">
              {item.requestsCount} request{item.requestsCount > 1 ? 's' : ''}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}