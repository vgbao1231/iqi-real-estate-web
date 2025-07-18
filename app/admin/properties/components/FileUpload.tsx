'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
  label: string;
  multiple?: boolean;
  value: File | string | null | (File | string)[];
  onChange: (files: File | string | null | (File | string)[]) => void;
}

export function FileUpload({
  label,
  multiple = false,
  value,
  onChange,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const files: (File | string)[] = React.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const handleSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    onChange(multiple ? selected : selected[0]);
  };

  const handleRemove = (idx: number) => {
    const newArr = [...files];
    newArr.splice(idx, 1);
    onChange(multiple ? newArr : null);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      <div className="flex flex-wrap gap-4">
        {files.map((file, idx) => {
          const url =
            typeof file === 'string' ? file : URL.createObjectURL(file);
          return (
            <div key={idx} className="relative w-[120px] h-[90px]">
              <Image
                src={url || '/placeholder-2.webp'}
                fill
                alt="preview"
                className="object-cover rounded border"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => handleRemove(idx)}
                className="absolute -top-2 -right-2 bg-white/70 hover:bg-white text-destructive"
              >
                <Trash className="w-4 h-4" />
                <span className="sr-only">Xoá</span>
              </Button>
            </div>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        className="hidden"
        onChange={handleSelect}
        accept="image/*"
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        className="gap-2"
      >
        <ImagePlus className="w-4 h-4" />
        {multiple ? 'Chọn ảnh' : 'Chọn ảnh'}
      </Button>
    </div>
  );
}
