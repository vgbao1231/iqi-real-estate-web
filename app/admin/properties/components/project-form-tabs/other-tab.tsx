'use client';

import type * as React from 'react';
import { Handshake } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DateInput } from '../DateInput';

interface OtherTabProps {
  project: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: keyof any, value: string) => void;
  commonLegalStatusOptions: { value: string; label: string }[];
  setProject: React.Dispatch<React.SetStateAction<any>>;
}

export function OtherTab({
  project,
  handleChange,
  handleNumberChange,
  handleSelectChange,
  commonLegalStatusOptions,
  setProject,
}: OtherTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Handshake className="h-5 w-5" /> Thông tin khác
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="totalUnits">Tổng số căn/sản phẩm</Label>
            <Input
              id="totalUnits"
              name="totalUnits"
              value={project.totalUnits}
              onChange={handleChange}
            />
          </div>
          <DateInput
            label="Ngày niêm yết"
            id="listedOn"
            name="listedOn"
            value={project.listedOn}
            onChange={handleChange}
          />
          <DateInput
            label="Cập nhật cuối"
            id="lastUpdated"
            name="lastUpdated"
            value={project.lastUpdated}
            onChange={handleChange}
          />
          <div className="space-y-2">
            <Label htmlFor="handoverDate">Thời gian bàn giao</Label>
            <Input
              id="handoverDate"
              name="handoverDate"
              value={project.handoverDate}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="legalStatus">Tình trạng pháp lý</Label>
            <Select
              value={project.legalStatus}
              onValueChange={(v) => handleSelectChange('legalStatus', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tình trạng pháp lý" />
              </SelectTrigger>
              <SelectContent>
                {commonLegalStatusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="views">Lượt xem</Label>
            <Input
              id="views"
              name="views"
              type="number"
              value={project.views}
              onChange={handleNumberChange}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Tùy chọn</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                name="isFeatured"
                checked={project.isFeatured}
                onCheckedChange={(checked) =>
                  setProject((prev: any) => ({
                    ...prev,
                    isFeatured: !!checked,
                  }))
                }
              />
              <Label htmlFor="isFeatured">Dự án nổi bật</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isExclusive"
                name="isExclusive"
                checked={project.isExclusive}
                onCheckedChange={(checked) =>
                  setProject((prev: any) => ({
                    ...prev,
                    isExclusive: !!checked,
                  }))
                }
              />
              <Label htmlFor="isExclusive">Dự án độc quyền</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableLiveSales"
                name="enableLiveSales"
                checked={project.enableLiveSales}
                onCheckedChange={(checked) =>
                  setProject((prev: any) => ({
                    ...prev,
                    enableLiveSales: !!checked,
                  }))
                }
              />
              <Label htmlFor="enableLiveSales">
                Cho phép bán hàng trực tiếp
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="visibleOnWeb"
                name="visibleOnWeb"
                checked={project.visibleOnWeb}
                onCheckedChange={(checked) =>
                  setProject((prev: any) => ({
                    ...prev,
                    visibleOnWeb: !!checked,
                  }))
                }
              />
              <Label htmlFor="visibleOnWeb">Hiển thị trên website</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
