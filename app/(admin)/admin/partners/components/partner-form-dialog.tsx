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
import { FileUpload } from '@/components/ui/file-upload';
import { X, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
} from '@/features/partner/partnerApi';
import { useUploadImageMutation } from '@/features/upload/uploadApi';
import { compressImage, diffPayload } from '@/lib/utils';

interface PartnerFormDialogProps {
  initialData?: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PartnerFormDialog({
  initialData,
  isOpen,
  onOpenChange,
}: PartnerFormDialogProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    category: initialData?.category || 'DEVELOPER',
    countryCount: initialData?.countryCount || 0,
    agentCount: initialData?.agentCount || 0,
    projectCount: initialData?.projectCount || 0,
    partnershipYear: initialData?.partnershipYear || new Date().getFullYear(),
    specialties: initialData?.specialties || [],
    achievements: initialData?.achievements || [],
    benefits: initialData?.benefits || [],
    image: initialData?.image || '',
    loanRate: initialData?.loanRate || '',
    maxLoan: initialData?.maxLoan || '',
    revenue: initialData?.revenue || '',
  });

  const [updatePartner, { isLoading: isUpdating }] = useUpdatePartnerMutation();
  const [createPartner, { isLoading: isCreating }] = useCreatePartnerMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let uploadRes: { url: string; publicId: string } | null = null;
    try {
      // Lấy ra các field thay đổi
      let payload: any = {
        name: formData.name,
        category: formData.category,
        shortDescription: formData.shortDescription,
        partnershipYear: Number(formData.partnershipYear),
      };

      // Nếu logo là file -> upload
      if (formData.image instanceof File) {
        const compressedFile = await compressImage(formData.image);
        uploadRes = await uploadImage({
          file: compressedFile,
          folder: 'partners',
        }).unwrap();
        payload.image = uploadRes;
      }

      switch (formData.category) {
        case 'DEVELOPER':
          payload = {
            description: formData.description,
            projectCount: Number(formData.projectCount),
            specialties: formData.specialties,
            achievements: formData.achievements,
            revenue: formData.revenue !== null ? formData.revenue : null,
            ...payload,
          };
          break;

        case 'INTERNATIONAL':
          payload = {
            description: formData.description,
            countryCount: Number(formData.countryCount),
            agentCount: Number(formData.agentCount),
            achievements: formData.achievements,
            ...payload,
          };
          break;

        case 'BANK':
          payload = {
            benefits: formData.benefits,
            loanRate: formData.loanRate,
            maxLoan: formData.maxLoan,
            ...payload,
          };
          break;

        default:
          break;
      }

      console.log('>>> category:', formData.category);
      console.log(
        '>>> payload chuẩn bị gửi:',
        diffPayload(payload, initialData)
      );

      if (initialData) {
        await updatePartner({
          id: initialData.id,
          body: diffPayload(payload, initialData),
        }).unwrap();
      } else {
        await createPartner(diffPayload(payload, initialData)).unwrap();
      }

      onOpenChange(false);
    } catch (error) {
      console.error(
        `Error ${initialData ? 'editing' : 'creating'} user:`,
        error
      );
    }
  };

  const handleChange = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Thêm 1 item vào mảng
  const handleAddItem = (field: any, item: any) => {
    if (!item) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...(prev[field] || []), item],
    }));
  };

  // Xóa 1 item khỏi mảng theo index
  const handleRemoveItem = (field: any, item: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((i: any) => i !== item),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[60vw]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Chỉnh sửa đối tác' : 'Thêm đối tác mới'}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Cập nhật thông tin đối tác trong hệ thống'
              : 'Nhập thông tin đối tác mới vào hệ thống'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-x-8">
            <div className="col-span-1">
              <div className="space-y-4">
                <FileUpload
                  label="Ảnh/Logo đối tác"
                  value={formData.image}
                  onChange={(file) => handleChange('image', file)}
                />

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Định dạng: JPG, PNG, SVG</p>
                  <p>• Kích thước tối đa: 2MB</p>
                  <p>• Tỷ lệ khuyến nghị: 16:9 hoặc 4:3</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 grid gap-4 max-h-[60vh] p-2 overflow-y-hidden hover:overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="partner-type" className="text-right">
                  Loại đối tác
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => handleChange('category', v)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn loại đối tác" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEVELOPER">Chủ đầu tư</SelectItem>
                    <SelectItem value="INTERNATIONAL">
                      Đối tác quốc tế
                    </SelectItem>
                    <SelectItem value="BANK">Đối tác ngân hàng</SelectItem>
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
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Mô tả ngắn
                </Label>
                <Input
                  id="shortDescription"
                  className="col-span-3"
                  placeholder="Mô tả ngắn về đối tác"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    handleChange('shortDescription', e.target.value)
                  }
                />
              </div>

              {formData.category === 'DEVELOPER' && (
                <>
                  {formData.category !== 'BANK' && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Mô tả
                      </Label>
                      <Textarea
                        id="description"
                        className="col-span-3"
                        placeholder="Mô tả về đối tác"
                        value={formData.description}
                        onChange={(e) =>
                          handleChange('description', e.target.value)
                        }
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projects" className="text-right">
                      Số dự án
                    </Label>
                    <Input
                      id="projects"
                      type="number"
                      className="col-span-3"
                      placeholder="0"
                      value={formData.projectCount}
                      onChange={(e) =>
                        handleChange('projectCount', e.target.value)
                      }
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
                      value={formData.revenue}
                      onChange={(e) => handleChange('revenue', e.target.value)}
                    />
                  </div>
                  {/* Specialties/Benefits Section */}
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right mt-2">Chuyên môn</Label>
                    <div className="col-span-3 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {formData.specialties.map((item: any, index: any) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {item}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() =>
                                handleRemoveItem('specialties', item)
                              }
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Thêm chuyên môn..."
                          name="specialties"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddItem(
                                'specialties',
                                (e.target as HTMLInputElement).value.trim()
                              );
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Achievements Section */}
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right mt-2">Thành tựu</Label>
                    <div className="col-span-3 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {formData.achievements.map(
                          (achievement: any, index: any) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <Award className="h-3 w-3" />
                              {achievement}
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() =>
                                  handleRemoveItem('achievements', achievement)
                                }
                              />
                            </Badge>
                          )
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Thêm thành tựu..."
                          name="achievements"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddItem(
                                'achievements',
                                (e.target as HTMLInputElement).value.trim()
                              );
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {formData.category === 'INTERNATIONAL' && (
                <>
                  {formData.category !== 'BANK' && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Mô tả
                      </Label>
                      <Textarea
                        id="description"
                        className="col-span-3"
                        placeholder="Mô tả về đối tác"
                        value={formData.description}
                        onChange={(e) =>
                          handleChange('description', e.target.value)
                        }
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="countries" className="text-right">
                      Số quốc gia
                    </Label>
                    <Input
                      id="countries"
                      type="number"
                      className="col-span-3"
                      placeholder="0"
                      value={formData.countryCount}
                      onChange={(e) =>
                        handleChange('countryCount', e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="agents" className="text-right">
                      Số đại lý
                    </Label>
                    <Input
                      id="agents"
                      type="number"
                      className="col-span-3"
                      placeholder="Ví dụ: 40,000+"
                      value={formData.agentCount}
                      onChange={(e) =>
                        handleChange('agentCount', e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right mt-2">Thành tựu</Label>
                    <div className="col-span-3 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {formData.achievements.map(
                          (achievement: any, index: any) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <Award className="h-3 w-3" />
                              {achievement}
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() =>
                                  handleRemoveItem('achievements', achievement)
                                }
                              />
                            </Badge>
                          )
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Thêm thành tựu..."
                          name="achievements"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddItem(
                                'achievements',
                                (e.target as HTMLInputElement).value.trim()
                              );
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {formData.category === 'BANK' && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="loanRate" className="text-right">
                      Lãi suất vay
                    </Label>
                    <Input
                      id="loanRate"
                      className="col-span-3"
                      placeholder="Ví dụ: 6.5%/năm"
                      value={formData.loanRate}
                      onChange={(e) => handleChange('loanRate', e.target.value)}
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
                      value={formData.maxLoan}
                      onChange={(e) => handleChange('maxLoan', e.target.value)}
                    />
                  </div>
                  {/* Benefits Section */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Lợi ích</Label>
                    <div className="col-span-3">
                      <div className="flex flex-wrap gap-2">
                        {formData.benefits.map((benefit: any, index: any) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1 mb-2"
                          >
                            <Award className="h-3 w-3" />
                            {benefit}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() =>
                                handleRemoveItem('benefits', benefit)
                              }
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Thêm lợi ích..."
                          name="benefits"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddItem(
                                'benefits',
                                (e.target as HTMLInputElement).value.trim()
                              );
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="partnershipYear" className="text-right">
                  Năm hợp tác
                </Label>
                <Input
                  id="partnershipYear"
                  className="col-span-3"
                  placeholder="2025"
                  value={formData.partnershipYear}
                  onChange={(e) =>
                    handleChange('partnershipYear', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button
              disabled={isUpdating || isCreating || isUploading}
              className="bg-orange-600 hover:bg-orange-700"
              type="submit"
            >
              {initialData
                ? isUpdating || isUploading
                  ? 'Đang lưu'
                  : 'Lưu'
                : isCreating || isUploading
                  ? 'Đang thêm'
                  : 'Thêm đối tác'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
