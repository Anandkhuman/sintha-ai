
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface AudioUploaderProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled: boolean;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ file, onFileChange, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileChange(files[0]);
    } else {
        onFileChange(null);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-center w-full h-48 p-5 border-2 border-dashed rounded-lg transition-all duration-300 ${
        disabled ? 'bg-gray-200 cursor-not-allowed' : 'border-brand-light bg-blue-50 hover:border-brand-primary hover:bg-blue-100 cursor-pointer'
      }`}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileSelect}
        accept="audio/*"
        className="hidden"
        disabled={disabled}
      />
      <div className="text-center">
        <UploadIcon className="mx-auto h-12 w-12 text-brand-secondary" />
        <p className="mt-2 text-sm text-content-200">
          <span className="font-semibold text-brand-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-content-200">Any audio format</p>
        {file && (
          <p className="mt-4 text-sm font-medium text-brand-dark bg-brand-light px-3 py-1 rounded-full">
            {file.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default AudioUploader;
