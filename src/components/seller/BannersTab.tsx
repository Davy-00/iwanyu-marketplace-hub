
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';

const BannersTab = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Homepage Banners</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Homepage banner management will be added here.
          </p>
        </div>
        <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
          <Plus className="mr-2 h-4 w-4" />
          Add New Banner
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 bg-gray-50 rounded-md">
          <Upload className="mx-auto h-12 w-12 text-iwanyu-gray opacity-50 mb-2" />
          <h3 className="text-xl font-medium text-iwanyu-dark-gray mb-2">Banner Management Coming Soon</h3>
          <p className="text-iwanyu-gray max-w-md mx-auto">
            You'll be able to upload, schedule, and manage promotional banners for your store.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BannersTab;
