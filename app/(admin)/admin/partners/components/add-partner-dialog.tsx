'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddPartnerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPartnerDialog({
  isOpen,
  onOpenChange,
}: AddPartnerDialogProps) {
  const [partnerType, setPartnerType] = useState('developer');

  const handleSubmit = () => {
    // Handle form submission here
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm đối tác mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin đối tác mới vào hệ thống
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="partner-type" className="text-right">
              Loại đối tác
            </Label>
            <Select value={partnerType} onValueChange={setPartnerType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn loại đối tác" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="developer">Chủ đầu tư</SelectItem>
                <SelectItem value="international">Đối tác quốc tế</SelectItem>
                <SelectItem value="bank">Đối tác ngân hàng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên đối tác
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="Nhập tên đối tác"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Phân loại
            </Label>
            <Input
              id="type"
              className="col-span-3"
              placeholder="Ví dụ: Chủ đầu tư cao cấp"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              placeholder="Mô tả về đối tác"
            />
          </div>

          {partnerType === 'developer' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projects" className="text-right">
                  Số dự án
                </Label>
                <Input
                  id="projects"
                  type="number"
                  className="col-span-3"
                  placeholder="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="revenue" className="text-right">
                  Doanh thu
                </Label>
                <Input
                  id="revenue"
                  className="col-span-3"
                  placeholder="Ví dụ: 49.7 triệu USD"
                />
              </div>
            </>
          )}

          {partnerType === 'international' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="countries" className="text-right">
                  Số quốc gia
                </Label>
                <Input
                  id="countries"
                  type="number"
                  className="col-span-3"
                  placeholder="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="agents" className="text-right">
                  Số đại lý
                </Label>
                <Input
                  id="agents"
                  className="col-span-3"
                  placeholder="Ví dụ: 40,000+"
                />
              </div>
            </>
          )}

          {partnerType === 'bank' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="loanRate" className="text-right">
                  Lãi suất vay
                </Label>
                <Input
                  id="loanRate"
                  className="col-span-3"
                  placeholder="Ví dụ: 6.5%/năm"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="maxLoan" className="text-right">
                  Tỷ lệ vay tối đa
                </Label>
                <Input
                  id="maxLoan"
                  className="col-span-3"
                  placeholder="Ví dụ: 85%"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="partnership" className="text-right">
              Năm hợp tác
            </Label>
            <Input id="partnership" className="col-span-3" placeholder="2025" />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleSubmit}
          >
            Thêm đối tác
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
