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
}

export function FileUpload({
  label,
  value,
  onChange,
  accept = 'image/*',
}: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
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
              <img
                src={imgSrc || '/placeholder.svg'}
                alt="Preview"
                className="max-h-32 max-w-full rounded-md object-contain mb-2"
              />
            )}
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-4 w-4" />
                <span className="text-sm text-gray-600 truncate">
                  {fileName}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onChange(null)}>
                <X className="h-4 w-4" />
              </Button>
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
