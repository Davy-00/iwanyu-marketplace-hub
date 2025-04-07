
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface AdminBannerFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const AdminBannerForm = ({ onSubmit, onCancel }: AdminBannerFormProps) => {
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerLink, setBannerLink] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image for the banner",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      
      // Upload image to Supabase Storage
      const fileExt = selectedImage.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('banners')
        .upload(filePath, selectedImage);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase
        .storage
        .from('banners')
        .getPublicUrl(filePath);
      
      // Insert banner data into the banners table
      const { error: insertError } = await supabase
        .from('banners')
        .insert({
          title: bannerTitle,
          image_url: publicUrl,
          link_url: bannerLink,
          expiry_date: new Date(expiryDate),
          active: true
        });
      
      if (insertError) {
        throw insertError;
      }
      
      toast({
        title: "Success",
        description: "Banner added successfully!",
        variant: "default",
      });
      
      onSubmit(e);
    } catch (error: any) {
      console.error('Error uploading banner:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload banner",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bannerTitle">Banner Title</Label>
        <Input
          id="bannerTitle"
          value={bannerTitle}
          onChange={(e) => setBannerTitle(e.target.value)}
          placeholder="Enter banner title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUpload">Banner Image</Label>
        <div className="border border-dashed rounded-md p-4 text-center">
          {imagePreview ? (
            <div className="mb-4">
              <img 
                src={imagePreview} 
                alt="Banner preview" 
                className="max-h-40 mx-auto"
              />
            </div>
          ) : (
            <Upload className="h-8 w-8 mx-auto text-iwanyu-gray" />
          )}
          <p className="mt-2 text-sm text-iwanyu-gray">
            {imagePreview ? "Image selected" : "Drop your image here, or click to browse"}
          </p>
          <Input 
            id="imageUpload" 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button 
            type="button" 
            variant="outline" 
            className="mt-2"
            onClick={() => document.getElementById('imageUpload')?.click()}
          >
            {imagePreview ? "Change Image" : "Select Image"}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bannerLink">Link URL</Label>
        <Input
          id="bannerLink"
          value={bannerLink}
          onChange={(e) => setBannerLink(e.target.value)}
          placeholder="https://example.com/promotion"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expiryDate">Expiry Date</Label>
        <Input
          id="expiryDate"
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={uploading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Save Banner"}
        </Button>
      </div>
    </form>
  );
};

export default AdminBannerForm;
