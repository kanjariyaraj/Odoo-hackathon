import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  MapPin, 
  Star,
  Camera,
  CheckCircle,
  Zap
} from "lucide-react";

interface AddItemFormProps {
  currentUser: any;
}

export function AddItemForm({ currentUser }: AddItemFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    size: '',
    gender: '',
    condition: '',
    description: '',
    location: '',
    isFeatured: false
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = [
    { value: 'T-Shirt', label: 'T-Shirt', points: 5 },
    { value: 'Pant', label: 'Pants', points: 7 },
    { value: 'Jacket', label: 'Jacket', points: 10 },
    { value: 'Shoes', label: 'Shoes', points: 6 }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const genders = ['Male', 'Female', 'Unisex'];
  const conditions = [
    { value: 'New', label: 'New - With tags', color: 'bg-primary' },
    { value: 'Good', label: 'Good - Gently used', color: 'bg-reward' },
    { value: 'Worn', label: 'Worn - Shows use', color: 'bg-muted' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCategory = categories.find(cat => cat.value === formData.category);
    const points = selectedCategory?.points || 0;
    
    toast({
      title: "Item Listed Successfully!",
      description: `Your ${formData.title} has been added. You earned ${points} points!`,
    });

    // Reset form
    setFormData({
      title: '',
      category: '',
      size: '',
      gender: '',
      condition: '',
      description: '',
      location: '',
      isFeatured: false
    });
    setUploadedImage(null);
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);
  const earnedPoints = selectedCategory?.points || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Donate an Item</h1>
            <p className="text-muted-foreground">
              Share your unused clothing with the community and earn reward points!
            </p>
          </div>

          <Card className="p-6 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <Label>Item Photo</Label>
                <div 
                  className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-smooth ${
                    uploadedImage ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded item" 
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-primary flex items-center justify-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Image uploaded successfully
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-medium">Upload item photo</p>
                        <p className="text-sm text-muted-foreground">
                          Click to browse or drag and drop your image
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
              </div>

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Item Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{category.label}</span>
                            <Badge className="ml-2 text-xs">{category.points} pts</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Size</Label>
                  <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map(gender => (
                        <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Condition</Label>
                  <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map(condition => (
                        <SelectItem key={condition.value} value={condition.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${condition.color}`} />
                            {condition.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item, its history, or any special details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Pickup Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g., Downtown, Mall area, etc."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Featured Option */}
              <Card className="p-4 bg-accent/5 border-accent/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-accent" />
                    <div>
                      <h3 className="font-medium">Boost Your Listing</h3>
                      <p className="text-sm text-muted-foreground">
                        Feature your item at the top of search results
                      </p>
                    </div>
                  </div>
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
                  >
                    {formData.isFeatured ? 'Remove Boost' : 'Boost for ₹50'}
                  </Button>
                </div>
              </Card>

              {/* Points Preview */}
              {selectedCategory && (
                <Card className="p-4 reward-gradient text-reward-foreground">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      <span className="font-medium">
                        You'll earn {earnedPoints} reward points for this donation!
                      </span>
                    </div>
                    <Badge className="bg-reward-foreground/20 text-reward-foreground">
                      +{earnedPoints} pts
                    </Badge>
                  </div>
                </Card>
              )}

              {/* Submit */}
              <div className="flex gap-4">
                <Button type="submit" variant="community" className="flex-1">
                  List Item for Donation
                </Button>
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}