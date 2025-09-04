'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, GripVertical, Eye, EyeOff, X } from 'lucide-react'; // Import Eye, EyeOff, and X
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils'; // Import cn utility

interface KeyValuePair {
  id: string; // Added for DND
  key: string;
  value: string | number | [number | string, number | string]; // Updated to support array for range
  type?: 'text' | 'number' | 'select' | 'range'; // Added "range" type
  options?: string[];
  hidden?: boolean; // Added hidden project
  isNew?: boolean; // Added isNew project to distinguish new items
}

interface KeyValueTableProps {
  title: string;
  data: KeyValuePair[];
  onChange: (data: KeyValuePair[]) => void;
}

// SortableItem component for drag and drop
function SortableItem({
  item,
  index,
  updateItem,
  onToggleHidden, // For predefined items
  onRemove, // For newly added items
  renderValueInput,
}: {
  item: KeyValuePair;
  index: number;
  updateItem: (
    index: number,
    field: 'key' | 'value',
    value: string | number | [number | string, number | string]
  ) => void;
  onToggleHidden: (index: number) => void;
  onRemove: (index: number) => void;
  renderValueInput: (item: KeyValuePair, index: number) => React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors',
        item.hidden && 'opacity-50 text-gray-400' // Visual cue for hidden items
      )}
    >
      {/* Drag Handle */}
      <div className="flex-shrink-0" {...listeners} {...attributes}>
        <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
      </div>

      {/* Key Field */}
      <div className="min-w-0">
        <Input
          value={item.key}
          onChange={(e) => updateItem(index, 'key', e.target.value)}
          placeholder="Tên trường"
          className="h-8 text-sm font-medium border-0 bg-transparent focus:bg-white focus:border focus:shadow-sm"
        />
      </div>

      {/* Separator */}
      <div className="flex-shrink-0 text-gray-300 font-medium">:</div>

      {/* Value Field */}
      <div className="flex-1 min-w-0">
        <div className="relative">{renderValueInput(item, index)}</div>
      </div>

      {/* Action Button (Toggle Hidden or Remove) */}
      <div className="flex-shrink-0">
        {item.isNew ? ( // If it's a newly added item, show remove button
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          // If it's a predefined item, show toggle hidden button
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleHidden(index)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            {item.hidden ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export function KeyValueTable({ title, data, onChange }: KeyValueTableProps) {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateItem = (
    index: number,
    field: 'key' | 'value',
    value: string | number | [number | string, number | string]
  ) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const toggleItemHidden = (index: number) => {
    const newData = [...data];
    newData[index] = { ...newData[index], hidden: !newData[index].hidden };
    onChange(newData);
  };

  const removeItem = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  const addItem = () => {
    if (newKey.trim() && newValue.trim()) {
      // New items are deletable (isNew: true) and not hidden by default
      const newData = [
        ...data,
        {
          id: Date.now().toString(),
          key: newKey.trim(),
          value: newValue.trim(),
          type: 'text' as 'text',
          hidden: false,
          isNew: true,
        },
      ];
      onChange(newData);
      setNewKey('');
      setNewValue('');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over?.id);
      onChange(arrayMove(data, oldIndex, newIndex));
    }
  };

  const renderValueInput = (item: KeyValuePair, index: number) => {
    if (item.type === 'number') {
      return (
        <Input
          type="number"
          value={item.value as number}
          onChange={(e) =>
            updateItem(index, 'value', Number(e.target.value) || 0)
          }
          placeholder="Nhập giá trị số"
          className="h-8 text-sm"
        />
      );
    }

    if (item.type === 'select' && item.options) {
      return (
        <Select
          value={item.value.toString()}
          onValueChange={(value) => updateItem(index, 'value', value)}
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="Chọn giá trị" />
          </SelectTrigger>
          <SelectContent>
            {item.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (item.type === 'range') {
      const rangeValue = item.value as [number | string, number | string];
      return (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={rangeValue[0]}
            onChange={(e) =>
              updateItem(index, 'value', [
                Number(e.target.value) || '',
                rangeValue[1],
              ])
            }
            placeholder="Min"
            className="h-8 text-sm w-1/2"
          />
          <span className="text-gray-400">-</span>
          <Input
            type="number"
            value={rangeValue[1]}
            onChange={(e) =>
              updateItem(index, 'value', [
                rangeValue[0],
                Number(e.target.value) || '',
              ])
            }
            placeholder="Max"
            className="h-8 text-sm w-1/2"
          />
        </div>
      );
    }

    return (
      <Input
        value={item.value as string}
        onChange={(e) => updateItem(index, 'value', e.target.value)}
        placeholder="Nhập giá trị"
        className="h-8 text-sm"
      />
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b">
        <Label className="text-lg font-semibold text-gray-900">{title}</Label>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{data.length} trường</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        {data.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">
              <GripVertical className="h-8 w-8 mx-auto" />
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Chưa có trường nào được thêm
            </p>
            <p className="text-xs text-gray-400">
              Sử dụng form bên dưới để thêm trường mới
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={data.map((item) => item.id)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
                {data.map((item, index) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    index={index}
                    updateItem={updateItem}
                    onToggleHidden={toggleItemHidden}
                    onRemove={removeItem}
                    renderValueInput={renderValueInput}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Add New Row */}
        <div className="border-t bg-gray-50/50 p-3">
          <div className="flex items-center gap-3">
            {/* Placeholder for drag handle */}
            <div className="flex-shrink-0 w-4"></div>

            {/* New Key Input */}
            <div className="flex-1 min-w-0">
              <Input
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="Tên trường mới..."
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                className="h-8 text-sm border-dashed"
              />
            </div>

            {/* Separator */}
            <div className="flex-shrink-0 text-gray-300 font-medium">:</div>

            {/* New Value Input */}
            <div className="flex-1 min-w-0">
              <Input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Giá trị..."
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                className="h-8 text-sm border-dashed"
              />
            </div>

            {/* Add Button */}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={addItem}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                disabled={!newKey.trim() || !newValue.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
