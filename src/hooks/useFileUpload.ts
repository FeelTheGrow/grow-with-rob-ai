
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface FileWithProgress {
  file: File;
  progress: number;
  error?: string;
  uploaded?: boolean;
}

interface UseFileUploadProps {
  onUploadComplete?: () => void;
}

export const useFileUpload = ({ onUploadComplete }: UseFileUploadProps = {}) => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => ({ file, progress: 0 }))
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'font/*': [],
      'text/plain': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': []
    }
  });

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    const uploads = files.map(async (fileObj, index) => {
      const { file } = fileObj;
      
      try {
        // Determine category based on file type
        let category = 'other';
        if (file.type.startsWith('image/')) {
          if (file.type.includes('svg')) {
            category = 'svg';
          } else {
            category = 'images';
          }
        } else if (file.type.includes('pdf') || file.type.includes('doc')) {
          category = 'documents';
        } else if (file.type.includes('font')) {
          category = 'fonts';
        }
        
        // Create file path
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${category}/${fileName}`;
        
        // Upload to storage
        const { error: uploadError, data } = await supabase.storage
          .from('ftg-assets')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) throw uploadError;
        
        // Update progress in UI
        setFiles(currentFiles => 
          currentFiles.map((f, i) => 
            i === index ? { ...f, progress: 50 } : f
          )
        );
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('ftg-assets')
          .getPublicUrl(filePath);
        
        // Insert asset record using the edge function
        const { error: dbError } = await supabase.functions.invoke('assets', {
          body: {
            action: 'insertAsset',
            data: {
              name: file.name,
              file_path: filePath,
              file_type: fileExt?.toLowerCase() || 'unknown',
              file_size: file.size,
              mime_type: file.type,
              category: category,
              alt_text: file.name
            }
          }
        });
          
        if (dbError) throw dbError;
        
        // Update UI to show success
        setFiles(currentFiles => 
          currentFiles.map((f, i) => 
            i === index ? { ...f, progress: 100, uploaded: true } : f
          )
        );
        
      } catch (error: any) {
        console.error('Upload error:', error);
        setFiles(currentFiles => 
          currentFiles.map((f, i) => 
            i === index ? { ...f, error: error.message || 'Upload failed', progress: 0 } : f
          )
        );
      }
    });
    
    await Promise.all(uploads);
    setIsUploading(false);
    toast({
      title: "Assets uploaded",
      description: `Successfully uploaded ${files.filter(f => f.uploaded).length} of ${files.length} files`,
    });
    
    if (onUploadComplete) {
      onUploadComplete();
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(files => files.filter((_, i) => i !== index));
  };
  
  const clearAllFiles = () => {
    setFiles([]);
  };

  return {
    files,
    isUploading,
    uploadFiles,
    removeFile,
    clearAllFiles,
    dropzoneProps: {
      getRootProps,
      getInputProps,
      isDragActive
    }
  };
};
