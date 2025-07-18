'use client';

import * as React from 'react';
import * as LucideIcons from 'lucide-react';
import { Combobox } from '@/components/ui/combobox';

type LucideIconName = keyof typeof LucideIcons;

interface IconPickerProps {
  value: string;
  onValueChange: (iconName: string) => void;
  placeholder?: string;
  className?: any;
}

const allowedIcons: LucideIconName[] = [
  'Home',
  'Building2',
  'Bath',
  'BedDouble',
  'Car',
  'Leaf',
  'MapPin',
  'Shield',
  'Wifi',
  'Phone',
  'Mail',
  'Heart',
  'Camera',
  'Calendar',
  'Star',
  'Sun',
  'Moon',
  'Users',
  'Lock',
  'KeyRound',
  'ShoppingBag',
  'Dumbbell',
  'LandPlot',
  'Trees',
  'School',
  'Bus',
  'Train',
  'ParkingSquare',
  'Lamp',
  'Globe',
  'UtensilsCrossed',
  'Hospital',
  'Banknote',
  'Accessibility',
  'Gamepad2',
  'Music',
  'Tv',
];

export function IconPicker({
  value,
  onValueChange,
  placeholder = 'Chọn icon...',
}: IconPickerProps) {
  const options = React.useMemo(() => {
    return allowedIcons.map((name) => {
      const IconComponent = LucideIcons[name] as React.ComponentType<{
        className?: string;
      }>;
      return {
        value: name,
        label: (
          <div className="flex items-center gap-2">
            <IconComponent className="w-4 h-4" />
            <span>{name}</span>
          </div>
        ),
      };
    });
  }, []);

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
      searchPlaceholder="Tìm icon..."
      emptyText="Không tìm thấy icon."
      className="w-full bg-background"
    />
  );
}
