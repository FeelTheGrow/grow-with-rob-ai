
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetsUploader from '@/components/AssetsUploader';
import AssetsGallery from '@/components/AssetsGallery';

type Asset = {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  category: string;
  created_at: string;
}

const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("gallery");
  
  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('ftg.assets')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
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
