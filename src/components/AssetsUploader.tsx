
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ArrowUpIcon, CheckIcon, XIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AssetUploaderProps {
  onUploadComplete?: () => void;
}

const AssetsUploader: React.FC<AssetUploaderProps> = ({ onUploadComplete }) => {
  const [files, setFiles] = useState<Array<{ file: File; progress: number; error?: string; uploaded?: boolean }>>([]);
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
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
      'application/pdf': ['.pdf'],
      'font/*': ['.ttf', '.otf', '.woff', '.woff2'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
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
          
        // Insert record in database using raw SQL approach
        const { error: dbError } = await supabase
          .from('ftg.assets')
          .insert({
            name: file.name,
            file_path: filePath,
            file_type: fileExt?.toLowerCase() || 'unknown',
            file_size: file.size,
            mime_type: file.type,
            category: category,
            alt_text: file.name
          }) as { error: any };
          
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

  return (
    <div className="w-full space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-ftg-green bg-ftg-green/10' : 'border-gray-300 hover:border-ftg-green/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <ArrowUpIcon className="h-10 w-10 text-ftg-green" />
          <h3 className="text-lg font-medium">Drag files here or click to upload</h3>
          <p className="text-sm text-gray-500">
            Support for images, documents, icons, SVGs, and fonts
          </p>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Files to Upload ({files.length})</h3>
            <button 
              onClick={clearAllFiles}
              className="text-sm text-gray-500 hover:text-ftg-green"
            >
              Clear all
            </button>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {files.map((fileObj, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    {fileObj.uploaded ? (
                      <CheckIcon className="h-5 w-5 text-green-500" />
                    ) : fileObj.error ? (
                      <XIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{fileObj.file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(fileObj.file.size / 1024).toFixed(1)} KB
                    </p>
                    {fileObj.error && (
                      <p className="text-xs text-red-500">{fileObj.error}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {fileObj.progress > 0 && !fileObj.uploaded && !fileObj.error && (
                    <Progress value={fileObj.progress} className="h-2 w-16" />
                  )}
                  <button 
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={uploadFiles} 
            disabled={isUploading || files.length === 0}
            className="fun-button w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetsUploader;
