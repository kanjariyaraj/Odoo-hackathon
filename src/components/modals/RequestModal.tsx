import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  User,
  Heart,
  Send
} from "lucide-react";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendRequest: (message: string) => void;
  itemId: string | null;
}

export function RequestModal({ isOpen, onClose, onSendRequest, itemId }: RequestModalProps) {
  const [message, setMessage] = useState('');
  
  // Mock item data - in real app would fetch based on itemId
  const mockItem = {
    title: 'Vintage Denim Jacket',
    donorName: 'Sarah Chen',
    condition: 'Good',
    size: 'M',
    image: '/placeholder.svg?height=200&width=200'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendRequest(message);
      setMessage('');
    }
  };

  const suggestedMessages = [
    "Hi! I'm interested in this item. Is it still available?",
    "This looks perfect for me! When would be a good time to pick it up?",
    "I love this piece! Could you tell me more about its condition?",
    "Hi! I'm very interested and can pick up anytime. Thank you for donating!"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Request Item
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Preview */}
          <Card className="p-4">
            <div className="flex gap-3">
              <img 
                src={mockItem.image} 
                alt={mockItem.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium mb-1">{mockItem.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">Size {mockItem.size}</Badge>
                  <Badge variant="outline">{mockItem.condition}</Badge>
                </div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <User className="h-3 w-3" />
                  <span>Donated by {mockItem.donorName}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Message Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Write a friendly message to the donor..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="mt-2"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Be polite and explain why you'd like this item
              </p>
            </div>

            {/* Quick Message Suggestions */}
            <div>
              <Label className="text-sm">Quick suggestions:</Label>
              <div className="space-y-2 mt-2">
                {suggestedMessages.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setMessage(suggestion)}
                    className="w-full text-left p-2 text-sm bg-muted/50 hover:bg-muted rounded-md transition-smooth"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button 
                type="submit" 
                variant="community" 
                className="flex-1"
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Request
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>

          {/* Tips */}
          <Card className="p-3 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-2">
              <Heart className="h-4 w-4 text-primary mt-0.5" />
              <div className="text-sm">
                <div className="font-medium mb-1">Tips for a successful request:</div>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Be genuine about why you need the item</li>
                  <li>• Mention when you can pick it up</li>
                  <li>• Thank the donor for their generosity</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}