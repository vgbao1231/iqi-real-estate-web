'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface PriceFilterProps {
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  unit?: string;
  className?: string;
}

export function PriceFilter({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  unit = 'tỷ VNĐ',
  className,
}: PriceFilterProps) {
  const [open, setOpen] = React.useState(false);

  const getDisplayText = () => {
    if (fromValue && toValue) {
      return `${fromValue} - ${toValue} ${unit}`;
    }
    if (fromValue) {
      return `Từ ${fromValue} ${unit}`;
    }
    if (toValue) {
      return `Đến ${toValue} ${unit}`;
    }
    return <p className="font-normal">Khoảng giá</p>;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between ${className}`}
        >
          {getDisplayText()}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div className="text-sm font-medium">Chọn khoảng giá</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Từ
              </label>
              <Input
                type="number"
                placeholder="0"
                value={fromValue}
                onChange={(e) => onFromChange(e.target.value)}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Đến
              </label>
              <Input
                type="number"
                placeholder="∞"
                value={toValue}
                onChange={(e) => onToChange(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Đơn vị: {unit}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
