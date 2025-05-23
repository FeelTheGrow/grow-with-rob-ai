
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetsUploader from '@/components/AssetsUploader';
import AssetsGallery from '@/components/AssetsGallery';
import { toast } from '@/hooks/use-toast';
import { Asset } from '@/types/supabase';

const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("gallery");
  
  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      // Call the edge function to get assets
      const { data, error } = await supabase.functions.invoke('assets', {
        body: { action: 'getAssets' }
      });
        
      if (error) {
        console.error('Error fetching assets:', error);
        toast({
          title: "Error loading assets",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      setAssets(data || []);
    } catch (error: any) {
      console.error('Error fetching assets:', error);
      toast({
        title: "Error loading assets",
        description: error.message || "Failed to load assets",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAssets();
  }, []);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Digital Assets</h1>
          <p className="text-gray-500">Manage your documents, images, and other media</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="gallery">Asset Gallery</TabsTrigger>
          <TabsTrigger value="upload">Upload Assets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery">
          <AssetsGallery 
            assets={assets} 
            isLoading={isLoading} 
            onAssetDeleted={fetchAssets} 
          />
        </TabsContent>
        
        <TabsContent value="upload">
          <div className="max-w-2xl mx-auto">
            <AssetsUploader onUploadComplete={() => {
              fetchAssets();
              setActiveTab("gallery");
            }} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assets;
