
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const BannersTab = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, check user's subscription status from database
    // For now, we'll simulate this with a timeout
    const checkPremiumStatus = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, we'll set this to false
        // In a real app, this would check the database for the user's subscription
        setIsPremiumUser(false);
      } catch (error) {
        console.error('Error checking premium status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkPremiumStatus();
  }, []);
  
  const handleAddBanner = () => {
    if (!isPremiumUser) {
      toast({
        title: "Premium Feature",
        description: "Banner management is only available for Premium plan subscribers.",
      });
      return;
    }
    
    // Add banner logic would go here
    toast({
      title: "Banner Form",
      description: "Banner creation form opened.",
    });
  };
  
  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Homepage Banners</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {isPremiumUser 
              ? "Upload and manage banners for your store's homepage."
              : "Premium feature - Upgrade to access banner management."}
          </p>
        </div>
        <Button 
          className={`${isPremiumUser ? 'bg-iwanyu-orange hover:bg-iwanyu-dark-orange' : 'bg-gray-300'}`}
          onClick={handleAddBanner}
          disabled={!isPremiumUser}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Banner
        </Button>
      </CardHeader>
      <CardContent>
        {isPremiumUser ? (
          <div className="text-center py-12 bg-gray-50 rounded-md">
            <Upload className="mx-auto h-12 w-12 text-iwanyu-gray opacity-50 mb-2" />
            <h3 className="text-xl font-medium text-iwanyu-dark-gray mb-2">No Banners Yet</h3>
            <p className="text-iwanyu-gray max-w-md mx-auto">
              Upload banner images to promote your products on the homepage.
            </p>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-md">
            <Lock className="mx-auto h-12 w-12 text-iwanyu-gray opacity-50 mb-2" />
            <h3 className="text-xl font-medium text-iwanyu-dark-gray mb-2">Premium Feature</h3>
            <p className="text-iwanyu-gray max-w-md mx-auto mb-4">
              Banner management is available exclusively for Premium plan subscribers. Upgrade to showcase your products on the homepage.
            </p>
            <Link to="/seller-subscription">
              <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
                Upgrade to Premium
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BannersTab;
