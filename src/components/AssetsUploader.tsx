
import React from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import DropZone from '@/components/assets/DropZone';
import FileList from '@/components/assets/FileList';

interface AssetUploaderProps {
  onUploadComplete?: () => void;
}

const AssetsUploader: React.FC<AssetUploaderProps> = ({ onUploadComplete }) => {
  const { 
    files, 
    isUploading, 
    uploadFiles, 
    removeFile, 
    clearAllFiles,
    dropzoneProps: { getRootProps, getInputProps, isDragActive }
  } = useFileUpload({ onUploadComplete });

  return (
    <div className="w-full space-y-4">
      <DropZone 
        getRootProps={getRootProps} 
        getInputProps={getInputProps} 
        isDragActive={isDragActive} 
      />
      
      {files.length > 0 && (
        <>
          <FileList 
            files={files}
            onRemoveFile={removeFile}
            onClearAllFiles={clearAllFiles}
          />
          
          <button 
            onClick={uploadFiles} 
            disabled={isUploading || files.length === 0}
            className="fun-button w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </>
      )}
    </div>
  );
};

export default AssetsUploader;
