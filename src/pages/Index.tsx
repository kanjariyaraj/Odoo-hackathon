import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { BrowseItems } from "@/components/browse/BrowseItems";
import { AddItemForm } from "@/components/donate/AddItemForm";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { UserProfile } from "@/components/profile/UserProfile";
import { AuthModal } from "@/components/auth/AuthModal";
import { RequestModal } from "@/components/modals/RequestModal";
import { ItemDetailsModal } from "@/components/modals/ItemDetailsModal";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock current user - in real app this would come from auth context
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: 'donor' | 'receiver' | 'both';
    points: number;
    city: string;
    joinedAt: string;
  } | null>(null);

  const handleLogin = (userData: any) => {
    setCurrentUser({
      id: '1',
      name: userData.name || 'Demo User',
      email: userData.email || 'demo@rewear.com',
      role: userData.role || 'both',
      points: 156,
      city: 'San Francisco',
      joinedAt: '2024-01-01'
    });
    setShowAuthModal(false);
    toast({
      title: "Welcome to ReWear!",
      description: "You're now part of the community. Start exploring clothing donations.",
    });
  };

  const handleRequestItem = (itemId: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setSelectedItemId(itemId);
    setShowRequestModal(true);
  };

  const handleViewItem = (itemId: string) => {
    setSelectedItemId(itemId);
    setShowItemDetails(true);
  };

  const handleSendRequest = (message: string) => {
    toast({
      title: "Request Sent!",
      description: "Your request has been sent to the donor. They'll respond soon.",
    });
    setShowRequestModal(false);
  };

  const handleNavigate = (page: string) => {
    if ((page !== 'home' && page !== 'browse') && !currentUser) {
      setShowAuthModal(true);
      return;
    }
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'browse':
        return (
          <BrowseItems
            onRequestItem={handleRequestItem}
            onViewItem={handleViewItem}
            currentUser={currentUser}
          />
        );
      case 'add-item':
        return <AddItemForm currentUser={currentUser} />;
      case 'leaderboard':
        return <Leaderboard currentUser={currentUser} />;
      case 'profile':
        return <UserProfile currentUser={currentUser} />;
      case 'home':
      default:
        return (
          <HeroSection
            onGetStarted={() => currentUser ? handleNavigate('browse') : setShowAuthModal(true)}
            onBrowse={() => handleNavigate('browse')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentUser={currentUser}
        onAuthClick={() => setShowAuthModal(true)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      
      {renderCurrentPage()}

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      <RequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onSendRequest={handleSendRequest}
        itemId={selectedItemId}
      />

      <ItemDetailsModal
        isOpen={showItemDetails}
        onClose={() => setShowItemDetails(false)}
        itemId={selectedItemId}
        onRequest={handleRequestItem}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Index;
