
import React from 'react';
import FileItem from './FileItem';
import { FileWithProgress } from '@/hooks/useFileUpload';

interface FileListProps {
  files: FileWithProgress[];
  onRemoveFile: (index: number) => void;
  onClearAllFiles: () => void;
}

const FileList: React.FC<FileListProps> = ({ 
  files, 
  onRemoveFile, 
  onClearAllFiles 
}) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-foreground">Files to Upload ({files.length})</h3>
        <button 
          onClick={onClearAllFiles}
          className="text-sm text-gray-500 hover:text-ftg-green"
        >
          Clear all
        </button>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {files.map((fileObj, index) => (
          <FileItem 
            key={index}
            fileObj={fileObj}
            index={index}
            onRemove={onRemoveFile}
          />
        ))}
      </div>
    </div>
  );
};

export default FileList;
