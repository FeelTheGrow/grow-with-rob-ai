
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

export interface FileWithProgress {
  file: File;
  preview?: string;
  progress: number;
  error?: string;
  uploaded?: boolean;
}

interface UseFileUploadOptions {
  onUploadComplete?: () => void;
  maxFiles?: number;
  maxSize?: number;
}

export function useFileUpload({
  onUploadComplete,
  maxFiles = 10,
  maxSize = 5242880 // 5MB
}: UseFileUploadOptions = {}) {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
      'text/plain': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'font/ttf': [],
      'font/otf': [],
      'image/svg+xml': [],
    },
    maxFiles,
    maxSize,
    onDrop: useCallback((acceptedFiles: File[], fileRejections) => {
      if (fileRejections.length > 0) {
        fileRejections.forEach(({ file, errors }) => {
          const errorMessages = errors.map(e => e.message).join(', ');
          toast({
            title: "File error",
            description: `${file.name}: ${errorMessages}`,
            variant: "destructive"
          });
        });
        return;
      }
      
      setFiles(prevFiles => [
        ...prevFiles,
        ...acceptedFiles.map(file => ({
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
          uploaded: false
        }))
      ]);
    }, []),
  });

  // Clean up previews when component unmounts
  useEffect(() => {
    return () => {
      files.forEach(fileObj => {
        if (fileObj.preview) URL.revokeObjectURL(fileObj.preview);
      });
    };
  }, [files]);

  const removeFile = useCallback((index: number) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      const removedFile = newFiles.splice(index, 1)[0];
      if (removedFile.preview) {
        URL.revokeObjectURL(removedFile.preview);
      }
      return newFiles;
    });
  }, []);

  const clearAllFiles = useCallback(() => {
    files.forEach(fileObj => {
      if (fileObj.preview) URL.revokeObjectURL(fileObj.preview);
    });
    setFiles([]);
  }, [files]);

  const uploadFiles = useCallback(async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    let uploadedCount = 0;
    let failedCount = 0;
    
    try {
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL, 
        import.meta.env.VITE_SUPABASE_ANON_KEY
      );
      
      const uploadPromises = files.map(async (fileObj, index) => {
        try {
          // Upload to Supabase storage
          const { data, error } = await supabase.storage
            .from('assets')
            .upload(`public/${fileObj.file.name}`, fileObj.file, {
              upsert: false,
              contentType: fileObj.file.type
            });
            
          if (error) throw error;
          
          // Update file progress
          setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index] = { ...updatedFiles[index], progress: 100, uploaded: true };
            return updatedFiles;
          });
          
          uploadedCount++;
          return data;
        } catch (err) {
          console.error(`Error uploading ${fileObj.file.name}:`, err);
          
          // Update file with error
          setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index] = { 
              ...updatedFiles[index], 
              progress: 0, 
              error: err instanceof Error ? err.message : 'Upload failed' 
            };
            return updatedFiles;
          });
          
          failedCount++;
          return null;
        }
      });
      
      await Promise.all(uploadPromises);
      
      if (uploadedCount > 0) {
        toast({
          title: "Upload complete",
          description: `Successfully uploaded ${uploadedCount} ${uploadedCount === 1 ? 'file' : 'files'}`
        });
        
        if (onUploadComplete) {
          onUploadComplete();
        }
      }
      
      if (failedCount > 0) {
        toast({
          title: "Upload issues",
          description: `${failedCount} ${failedCount === 1 ? 'file' : 'files'} failed to upload`,
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error('Error in uploadFiles:', err);
      toast({
        title: "Upload error",
        description: "There was a problem uploading your files",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      
      // If all uploads were successful, clear the files
      if (failedCount === 0 && uploadedCount > 0) {
        clearAllFiles();
      }
    }
  }, [files, clearAllFiles, onUploadComplete]);

  return {
    files,
    isUploading,
    uploadFiles,
    removeFile,
    clearAllFiles,
    dropzoneProps: { getRootProps, getInputProps, isDragActive }
  };
}
