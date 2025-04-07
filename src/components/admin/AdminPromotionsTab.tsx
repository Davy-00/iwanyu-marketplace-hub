
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import AdminBannerForm from './AdminBannerForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const AdminPromotionsTab = () => {
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchBanners();
  }, []);
  
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setBanners(data || []);
    } catch (error: any) {
      console.error('Error fetching banners:', error);
      toast({
        title: "Error",
        description: "Failed to load banners",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddBanner = () => {
    setShowBannerForm(true);
  };
  
  const handleBannerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBannerForm(false);
    fetchBanners(); // Refresh banners after adding a new one
  };
  
  const handleRemoveBanner = async (bannerId: string) => {
    try {
      // First find the banner to get its image URL
      const bannerToDelete = banners.find(b => b.id === bannerId);
      if (!bannerToDelete) return;
      
      // Extract the file name from the URL
      const imageUrl = bannerToDelete.image_url;
      const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
      
      // Delete the banner from the database
      const { error: deleteError } = await supabase
        .from('banners')
        .delete()
        .eq('id', bannerId);
        
      if (deleteError) throw deleteError;
      
      // Try to delete the image file from storage (might fail if file doesn't exist)
      await supabase
        .storage
        .from('banners')
        .remove([fileName]);
      
      // Remove from local state
      setBanners(banners.filter(banner => banner.id !== bannerId));
      
      toast({
        title: "Success",
        description: "Banner deleted successfully",
      });
    } catch (error: any) {
      console.error('Error deleting banner:', error);
      toast({
        title: "Error",
        description: "Failed to delete banner",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Homepage Banners</CardTitle>
        <Button 
          className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
          onClick={handleAddBanner}
        >
          <Image className="mr-2 h-4 w-4" />
          Add New Banner
        </Button>
      </CardHeader>
      <CardContent>
        {showBannerForm ? (
          <AdminBannerForm 
            onSubmit={handleBannerFormSubmit}
            onCancel={() => setShowBannerForm(false)}
          />
        ) : (
          <div className="space-y-6">
            {loading ? (
              <p className="text-center py-4">Loading banners...</p>
            ) : banners.length === 0 ? (
              <p className="text-center py-4">No banners available. Add your first banner!</p>
            ) : (
              banners.map(banner => (
                <div key={banner.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-200 h-16 w-24 rounded flex items-center justify-center overflow-hidden">
                      {banner.image_url ? (
                        <img 
                          src={banner.image_url} 
                          alt={banner.title} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{banner.title}</h3>
                      <p className="text-sm text-iwanyu-gray">
                        Active until {new Date(banner.expiry_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500"
                      onClick={() => handleRemoveBanner(banner.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminPromotionsTab;
