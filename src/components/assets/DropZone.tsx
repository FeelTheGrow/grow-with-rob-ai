
import React from 'react';
import { ArrowUpIcon } from 'lucide-react';

interface DropZoneProps {
  getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
  isDragActive: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ getRootProps, getInputProps, isDragActive }) => {
  return (
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
  );
};

export default DropZone;
