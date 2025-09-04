'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, ImageIcon } from 'lucide-react';

interface FileUploadProps {
  label: string;
  value: string | File | null; // Updated type to accept string (path) or File object
  onChange: (file: File | null) => void; // Still returns File object for new uploads
  accept?: string;
  clickToDelete?: boolean; // New prop to enable click-to-delete functionality
}

export function FileUpload({
  label,
  value,
  onChange,
  accept = 'image/*',
  clickToDelete = false,
}: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleImageClick = () => {
    if (clickToDelete && value) {
      // If clickToDelete is enabled and there's an image, delete it
      onChange(null);
    }
  };

  // Determine the image source based on whether value is a string (path) or a File object
  const imgSrc =
    typeof value === 'string'
      ? value
      : value
        ? URL.createObjectURL(value)
        : '/placeholder.svg';
  const fileName =
    typeof value === 'string' ? value.split('/').pop() : value?.name;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
        {value ? (
          <div className="flex flex-col items-center space-y-2">
            {/* Check if it's an image type before rendering img tag */}
            {(typeof value === 'string' || value.type.startsWith('image/')) && (
              <div
                className={`relative group ${clickToDelete ? 'cursor-pointer' : ''}`}
                onClick={clickToDelete ? handleImageClick : undefined}
                title={clickToDelete ? 'Click để xóa ảnh' : undefined}
              >
                <img
                  src={imgSrc || '/placeholder.svg'}
                  alt="Preview"
                  className="max-h-32 max-w-full rounded-md object-contain"
                />
                {clickToDelete && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all center-both rounded-md">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-1 w-6 h-6 rounded-full text-xs font-medium center-both">
                      X
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-4 w-4" />
                <span className="text-sm text-gray-600 truncate">
                  {fileName}
                </span>
              </div>
              {!clickToDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onChange(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center space-y-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-500">
                Tải lên {label.toLowerCase()}
              </span>
            </div>
          </label>
        )}
      </div>
    </div>
  );
}
