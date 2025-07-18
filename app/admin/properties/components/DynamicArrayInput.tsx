'use client';

import type * as React from 'react';
import { Trash, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export interface DynamicArrayInputProps<TItem> {
  label: string;
  items: TItem[];
  wrapperClassName?: any;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  /**
   * Render a single item.
   */
  renderItem: (item: TItem, index: number) => React.ReactNode;
  /**
   * (Optional) custom wrapper for each item row.
   * If omitted, a Card with a delete button is used.
   */
  renderItemWrapper?: (
    children: React.ReactNode,
    index: number,
    onRemove: () => void
  ) => React.ReactNode;
}

/**
 * Helper that renders:
 *  1. A section title
 *  2. Every array element with a delete button
 *  3. An “Add” button
 */
export function DynamicArrayInput<T>({
  label,
  items,
  onAddItem,
  onRemoveItem,
  renderItem,
  renderItemWrapper,
  wrapperClassName,
}: DynamicArrayInputProps<T>) {
  const defaultWrapper = (
    children: React.ReactNode,
    idx: number,
    onRemove: () => void
  ) => (
    <Card key={idx} className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="absolute right-2 top-2 text-destructive hover:bg-destructive/10"
      >
        <Trash className="h-4 w-4" />
        <span className="sr-only">Xoá</span>
      </Button>
      <CardContent className="space-y-4 pt-6">{children}</CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium">{label}</h4>

      <div className={wrapperClassName}>
        {items.map((item, idx) => {
          const content = renderItem(item, idx);
          const wrapped = renderItemWrapper
            ? renderItemWrapper(content, idx, () => onRemoveItem(idx))
            : defaultWrapper(content, idx, () => onRemoveItem(idx));
          return wrapped;
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onAddItem}
        className="gap-2 bg-transparent"
      >
        <Plus className="h-4 w-4" />
        Thêm
      </Button>
    </div>
  );
}
