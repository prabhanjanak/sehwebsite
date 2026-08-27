import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X, Check, RefreshCw } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (base64Url: string) => void;
  aspectRatio?: '1:1' | '16:9' | '4:3' | 'free';
  helpText?: string;
  placeholder?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  aspectRatio = '1:1',
  helpText = 'Upload local image (.jpg, .png, .webp). File is encoded and saved directly to the database.',
  placeholder = 'No image selected'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
      }
      setIsProcessing(false);
    };
    reader.onerror = () => {
      alert('Error reading file.');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">
          {label} {aspectRatio === '1:1' && <span className="text-[10px] text-orange-600 font-mono font-bold">(1:1 Square Required)</span>}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[10px] text-red-600 hover:text-red-700 font-semibold flex items-center gap-0.5"
          >
            <X className="w-3 h-3" />
            <span>Remove Image</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* Preview Frame */}
        <div className="sm:col-span-4 flex flex-col items-center">
          <div 
            className={`relative overflow-hidden rounded-2xl border-2 border-dashed bg-slate-100 flex items-center justify-center shadow-xs transition-all ${
              aspectRatio === '1:1' ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-full h-24'
            } ${value ? 'border-orange-300' : 'border-slate-300'}`}
          >
            {value ? (
              <img 
                src={value} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-2">
                <ImageIcon className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-[9px] text-slate-400 block font-medium">1:1 Square</span>
              </div>
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Dropzone & Picker */}
        <div className="sm:col-span-8 space-y-2">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`p-3 rounded-2xl border-2 border-dashed cursor-pointer text-center transition-all ${
              isDragging
                ? 'border-orange-500 bg-orange-50/80 scale-[0.99]'
                : 'border-slate-300 hover:border-orange-400 bg-slate-50 hover:bg-orange-50/30'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex items-center justify-center gap-2 text-slate-700 text-xs font-bold">
              <Upload className="w-4 h-4 text-orange-600" />
              <span>Choose Photo or Drag & Drop</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">
              JPG, PNG, WEBP (stored in local database)
            </p>
          </div>

          <p className="text-[10px] text-slate-400 leading-tight">
            {helpText}
          </p>
        </div>

      </div>
    </div>
  );
};
