
import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { FileWithProgress } from '@/hooks/useFileUpload';

interface FileItemProps {
  fileObj: FileWithProgress;
  index: number;
  onRemove: (index: number) => void;
}

const FileItem: React.FC<FileItemProps> = ({ fileObj, index, onRemove }) => {
  return (
    <div 
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
          onClick={() => onRemove(index)}
          className="text-gray-400 hover:text-red-500"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FileItem;
