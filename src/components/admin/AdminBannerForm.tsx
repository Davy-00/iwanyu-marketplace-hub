
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface AdminBannerFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const AdminBannerForm = ({ onSubmit, onCancel }: AdminBannerFormProps) => {
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerLink, setBannerLink] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
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
          <Upload className="h-8 w-8 mx-auto text-iwanyu-gray" />
          <p className="mt-2 text-sm text-iwanyu-gray">
            Drop your image here, or click to browse
          </p>
          <Input 
            id="imageUpload" 
            type="file" 
            className="hidden" 
            accept="image/*"
          />
          <Button 
            type="button" 
            variant="outline" 
            className="mt-2"
            onClick={() => document.getElementById('imageUpload')?.click()}
          >
            Select Image
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
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
          Save Banner
        </Button>
      </div>
    </form>
  );
};

export default AdminBannerForm;
