import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ClothingCard, ClothingItem } from "@/components/items/ClothingCard";
import { 
  Search, 
  Filter, 
  MapPin, 
  SlidersHorizontal,
  Grid3X3,
  List,
  Zap
} from "lucide-react";

interface BrowseItemsProps {
  onRequestItem: (itemId: string) => void;
  onViewItem: (itemId: string) => void;
  currentUser?: {
    id: string;
    role: 'donor' | 'receiver' | 'both';
    city: string;
  };
}

export function BrowseItems({ onRequestItem, onViewItem, currentUser }: BrowseItemsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  const mockItems: ClothingItem[] = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      category: 'Jacket',
      size: 'M',
      gender: 'Unisex',
      condition: 'Good',
      image: '/placeholder.svg?height=300&width=300',
      location: 'Downtown',
      distance: 1.2,
      donorName: 'Sarah Chen',
      donorRating: 4.8,
      uploadedAt: '2024-01-15T10:30:00Z',
      description: 'Classic blue denim jacket, perfect for casual wear. Barely worn, great condition.',
      isFeatured: true,
      points: 10,
      requestsCount: 3
    },
    {
      id: '2',
      title: 'Nike Running Shoes',
      category: 'Shoes',
      size: '9',
      gender: 'Male',
      condition: 'Good',
      image: '/placeholder.svg?height=300&width=300',
      location: 'Midtown',
      distance: 2.5,
      donorName: 'Mike Johnson',
      donorRating: 4.6,
      uploadedAt: '2024-01-14T15:45:00Z',
      description: 'Comfortable running shoes, used for about 6 months. Still have good tread.',
      points: 6,
      requestsCount: 1
    },
    {
      id: '3',
      title: 'Floral Summer Dress',
      category: 'T-Shirt',
      size: 'S',
      gender: 'Female',
      condition: 'New',
      image: '/placeholder.svg?height=300&width=300',
      location: 'Uptown',
      distance: 3.1,
      donorName: 'Emma Wilson',
      donorRating: 4.9,
      uploadedAt: '2024-01-13T09:20:00Z',
      description: 'Brand new with tags, never worn. Beautiful floral pattern.',
      isFeatured: true,
      points: 5,
      requestsCount: 5
    },
    {
      id: '4',
      title: 'Black Formal Pants',
      category: 'Pant',
      size: 'L',
      gender: 'Male',
      condition: 'Good',
      image: '/placeholder.svg?height=300&width=300',
      location: 'Business District',
      distance: 0.8,
      donorName: 'David Kim',
      donorRating: 4.7,
      uploadedAt: '2024-01-12T16:30:00Z',
      description: 'Professional dress pants, excellent for office wear.',
      points: 7,
      requestsCount: 2
    }
  ];

  const categories = ['all', 'T-Shirt', 'Pant', 'Jacket', 'Shoes'];
  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const genders = ['all', 'Male', 'Female', 'Unisex'];
  const conditions = ['all', 'New', 'Good', 'Worn'];
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'nearby', label: 'Nearest' },
    { value: 'popular', label: 'Most Requested' },
    { value: 'points-high', label: 'Highest Points' },
    { value: 'points-low', label: 'Lowest Points' }
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSize = selectedSize === 'all' || item.size === selectedSize;
    const matchesGender = selectedGender === 'all' || item.gender === selectedGender;
    const matchesCondition = selectedCondition === 'all' || item.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesSize && matchesGender && matchesCondition;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'nearby':
        return a.distance - b.distance;
      case 'popular':
        return b.requestsCount - a.requestsCount;
      case 'points-high':
        return b.points - a.points;
      case 'points-low':
        return a.points - b.points;
      case 'latest':
      default:
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    }
  });

  const featuredItems = sortedItems.filter(item => item.isFeatured);
  const regularItems = sortedItems.filter(item => !item.isFeatured);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Browse Items</h1>
              <p className="text-muted-foreground">
                Discover amazing clothing donations in {currentUser?.city || 'your area'}
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {sortedItems.length} items available
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 shadow-card">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for clothing items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFilters ? "community" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? "community" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "community" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map(size => (
                      <SelectItem key={size} value={size}>
                        {size === 'all' ? 'All Sizes' : size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Gender</label>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map(gender => (
                      <SelectItem key={gender} value={gender}>
                        {gender === 'all' ? 'All Genders' : gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Condition</label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map(condition => (
                      <SelectItem key={condition} value={condition}>
                        {condition === 'all' ? 'All Conditions' : condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedSize("all");
                    setSelectedGender("all");
                    setSelectedCondition("all");
                    setSortBy("latest");
                  }}
                  className="w-full"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Featured Items */}
        {featuredItems.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-semibold">Featured Items</h2>
              <Badge className="bg-accent/10 text-accent border-accent/20">
                Boosted by donors
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredItems.map(item => (
                <ClothingCard
                  key={item.id}
                  item={item}
                  onRequest={onRequestItem}
                  onViewDetails={onViewItem}
                  currentUser={currentUser}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Items */}
        {regularItems.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Available Items ({regularItems.length})
            </h2>
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 lg:grid-cols-2'
            }`}>
              {regularItems.map(item => (
                <ClothingCard
                  key={item.id}
                  item={item}
                  onRequest={onRequestItem}
                  onViewDetails={onViewItem}
                  currentUser={currentUser}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {sortedItems.length === 0 && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check back later for new donations.
              </p>
              <Button 
                variant="community" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedSize("all");
                  setSelectedGender("all");
                  setSelectedCondition("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}