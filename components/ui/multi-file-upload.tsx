'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, ImageIcon } from 'lucide-react';

interface MultiFileUploadProps {
  label: string;
  value: (string | File)[]; // Updated type to accept array of strings (paths) or File objects
  onChange: (files: File[]) => void; // Still returns File objects for new uploads
  accept?: string;
}

export function MultiFileUpload({
  label,
  value,
  onChange,
  accept = 'image/*',
}: MultiFileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // When new files are added, we pass them as File objects to the parent
    // The parent hook will then decide whether to store them as File or string (path)
    onChange([...value.filter((f): f is File => f instanceof File), ...files]);
  };

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    // When removing, we need to ensure we only pass File objects back if that's what the parent expects
    // For simplicity, we'll filter out strings here, assuming the parent will re-process paths if needed.
    // A more robust solution might involve passing an object with { type: 'remove', index: number }
    // or having the parent manage the array directly.
    onChange(newFiles.filter((f): f is File => f instanceof File));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <label className="cursor-pointer block text-center mb-4">
          <input
            type="file"
            className="hidden"
            accept={accept}
            multiple
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-6 w-6 text-gray-400" />
            <span className="text-sm text-gray-500">
              Tải lên nhiều {label.toLowerCase()}
            </span>
          </div>
        </label>

        {value.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
            {value.map((file, index) => {
              const imgSrc =
                typeof file === 'string' ? file : URL.createObjectURL(file);
              const fileName =
                typeof file === 'string' ? file.split('/').pop() : file.name;
              const isImage =
                typeof file === 'string' || file.type.startsWith('image/');

              return (
                <div
                  key={index}
                  className="relative group border rounded-lg overflow-hidden aspect-square flex items-center justify-center bg-gray-100"
                >
                  {isImage ? (
                    <img
                      src={imgSrc || '/placeholder.svg'}
                      alt={`Preview ${fileName}`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-center text-gray-500 text-xs p-2">
                      <ImageIcon className="h-6 w-6 mx-auto mb-1" />
                      {fileName}
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
