
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Save, Settings, Upload } from 'lucide-react';

const SettingsTab = () => {
  const [storeSettings, setStoreSettings] = useState({
    name: 'My Rwanda Store',
    description: 'Selling authentic Rwandan handcrafted products',
    email: 'store@example.com',
    phone: '+250 123 456 789',
    location: 'Kigali, Rwanda',
    acceptsReturns: true,
    shippingNotes: 'Free delivery in Kigali. Shipping to other provinces may take 3-5 business days.',
  });
  
  const { toast } = useToast();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSwitchChange = (checked) => {
    setStoreSettings(prev => ({
      ...prev,
      acceptsReturns: checked
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to the database
    toast({
      title: "Store settings updated",
      description: "Your store settings have been saved successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Store Settings</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Configure your store's information and policies</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Store Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={storeSettings.name} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <Label htmlFor="description">Store Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={storeSettings.description} 
                  onChange={handleInputChange} 
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={storeSettings.email} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={storeSettings.phone} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Store Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={storeSettings.location} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <Label htmlFor="shippingNotes">Shipping Information</Label>
                <Textarea 
                  id="shippingNotes" 
                  name="shippingNotes" 
                  value={storeSettings.shippingNotes} 
                  onChange={handleInputChange} 
                  rows={2}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="acceptsReturns" 
                  checked={storeSettings.acceptsReturns}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="acceptsReturns">Accept Returns & Exchanges</Label>
              </div>
            </div>
            
            <Drawer>
              <DrawerTrigger asChild>
                <Button type="button" variant="outline">Advanced Settings</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Advanced Store Settings</DrawerTitle>
                  <DrawerDescription>Configure additional store settings and preferences.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 py-2">
                  <p className="text-center text-muted-foreground">
                    Advanced settings will be available soon.
                  </p>
                </div>
                <DrawerFooter>
                  <Button>Save Changes</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" onClick={handleSubmit} className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
            <Save className="mr-2 h-4 w-4" />
            Save Store Settings
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Store Appearance</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Customize how your store looks to customers</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="logo">Store Logo</Label>
              <div className="mt-2 flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                  <Settings className="h-8 w-8 text-gray-400" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
            </div>
            
            <div>
              <Label>Store Theme</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="border rounded-md p-2 text-center cursor-pointer hover:border-iwanyu-orange">
                  <div className="h-12 bg-iwanyu-orange rounded-md mb-1"></div>
                  <span className="text-xs">Orange</span>
                </div>
                <div className="border rounded-md p-2 text-center cursor-pointer hover:border-iwanyu-orange">
                  <div className="h-12 bg-blue-500 rounded-md mb-1"></div>
                  <span className="text-xs">Blue</span>
                </div>
                <div className="border rounded-md p-2 text-center cursor-pointer hover:border-iwanyu-orange">
                  <div className="h-12 bg-green-500 rounded-md mb-1"></div>
                  <span className="text-xs">Green</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
            Save Appearance
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsTab;
