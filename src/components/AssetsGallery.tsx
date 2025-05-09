
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';
import { FileIcon, ImageIcon, MoreVerticalIcon, Trash2Icon, CopyIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Asset } from '@/types/supabase';

interface AssetsGalleryProps {
  assets: Asset[];
  isLoading: boolean;
  onAssetDeleted?: () => void;
}

const AssetsGallery: React.FC<AssetsGalleryProps> = ({ 
  assets, 
  isLoading, 
  onAssetDeleted 
}) => {
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null);
  
  const getFileUrl = (filePath: string) => {
    const { data } = supabase.storage.from('ftg-assets').getPublicUrl(filePath);
    return data.publicUrl;
  };
  
  const isImage = (fileType: string) => {
    return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(fileType.toLowerCase());
  };
  
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "URL Copied",
        description: "Asset URL copied to clipboard",
      });
    });
  };
  
  const deleteAsset = async (asset: Asset) => {
    try {
      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('ftg-assets')
        .remove([asset.file_path]);
        
      if (storageError) throw storageError;
      
      // Delete the record using our edge function
      const { error } = await supabase.functions.invoke('assets', {
        body: {
          action: 'deleteAsset',
          data: { id: asset.id }
        }
      });
        
      if (error) throw error;
      
      toast({
        title: "Asset deleted",
        description: "The asset has been successfully deleted",
      });
      
      if (onAssetDeleted) onAssetDeleted();
      
    } catch (error: any) {
      console.error('Error deleting asset:', error);
      toast({
        title: "Delete failed",
        description: "There was a problem deleting the asset: " + error.message,
        variant: "destructive",
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const renderAssetThumbnail = (asset: Asset) => {
    const url = getFileUrl(asset.file_path);
    
    if (isImage(asset.file_type)) {
      return (
        <img 
          src={url} 
          alt={asset.alt_text || asset.name}
          className="w-full h-32 object-cover object-center rounded-t-md"
          loading="lazy"
        />
      );
    }
    
    return (
      <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-t-md">
        <FileIcon className="h-10 w-10 text-gray-400" />
      </div>
    );
  };
  
  const renderSkeletons = () => {
    return Array(8).fill(null).map((_, index) => (
      <Card key={`skeleton-${index}`} className="overflow-hidden">
        <Skeleton className="h-32 w-full" />
        <CardHeader>
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardFooter>
          <Skeleton className="h-4 w-1/2" />
        </CardFooter>
      </Card>
    ));
  };
  
  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {renderSkeletons()}
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-16">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No assets found</h3>
          <p className="mt-1 text-gray-500">Upload some assets to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map(asset => (
            <Card key={asset.id} className="overflow-hidden group">
              {renderAssetThumbnail(asset)}
              
              <CardHeader className="p-3 pb-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm truncate" title={asset.name}>
                    {asset.name}
                  </h3>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => copyToClipboard(getFileUrl(asset.file_path))}>
                        <CopyIcon className="mr-2 h-4 w-4" />
                        <span>Copy URL</span>
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => {
                            e.preventDefault();
                            setAssetToDelete(asset);
                          }}>
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the asset.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => assetToDelete && deleteAsset(assetToDelete)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardFooter className="p-3 pt-0 flex items-center justify-between">
                <div className="flex items-center">
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-full",
                    asset.category === 'images' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                    asset.category === 'documents' && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
                    asset.category === 'svg' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                    asset.category === 'fonts' && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
                    asset.category === 'other' && "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
                  )}>
                    {asset.category}
                  </span>
                </div>
                <span className="text-gray-500 text-xs">
                  {formatDate(asset.created_at)}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetsGallery;
