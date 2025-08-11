'use client';

import { useState, useEffect } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Award, X } from 'lucide-react';

interface EditPartnerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  partner: any;
}

export function EditPartnerDialog({
  isOpen,
  onOpenChange,
  partner,
}: EditPartnerDialogProps) {
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  useEffect(() => {
    if (partner) {
      setSpecialties(partner.specialties || []);
      setAchievements(partner.achievements || []);
      if ('benefits' in partner) {
        setBenefits(partner.benefits || []);
      }
    }
  }, [partner]);

  const getPartnerType = (partner: any) => {
    if ('projects' in partner) return 'developer';
    if ('countries' in partner) return 'international';
    return 'bank';
  };

  const addSpecialty = (specialty: string) => {
    if (specialty && !specialties.includes(specialty)) {
      setSpecialties([...specialties, specialty]);
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter((s) => s !== specialty));
  };

  const addAchievement = (achievement: string) => {
    if (achievement && !achievements.includes(achievement)) {
      setAchievements([...achievements, achievement]);
    }
  };

  const removeAchievement = (achievement: string) => {
    setAchievements(achievements.filter((a) => a !== achievement));
  };

  const addBenefit = (benefit: string) => {
    if (benefit && !benefits.includes(benefit)) {
      setBenefits([...benefits, benefit]);
    }
  };

  const removeBenefit = (benefit: string) => {
    setBenefits(benefits.filter((b) => b !== benefit));
  };

  const handleSubmit = () => {
    // Handle form submission here
    onOpenChange(false);
  };

  if (!partner) return null;

  const partnerType = getPartnerType(partner);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa đối tác</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin đối tác trong hệ thống
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Tên đối tác
            </Label>
            <Input
              id="edit-name"
              defaultValue={partner.name}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-type" className="text-right">
              Phân loại
            </Label>
            <Input
              id="edit-type"
              defaultValue={partner.type}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-description" className="text-right">
              Mô tả
            </Label>
            <Textarea
              id="edit-description"
              defaultValue={partner.description}
              className="col-span-3"
            />
          </div>

          {partnerType === 'developer' && 'projects' in partner && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-projects" className="text-right">
                  Số dự án
                </Label>
                <Input
                  id="edit-projects"
                  type="number"
                  defaultValue={partner.projects}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-revenue" className="text-right">
                  Doanh thu
                </Label>
                <Input
                  id="edit-revenue"
                  defaultValue={partner.revenue}
                  className="col-span-3"
                />
              </div>
            </>
          )}

          {partnerType === 'international' && 'countries' in partner && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-countries" className="text-right">
                  Số quốc gia
                </Label>
                <Input
                  id="edit-countries"
                  type="number"
                  defaultValue={partner.countries}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-agents" className="text-right">
                  Số đại lý
                </Label>
                <Input
                  id="edit-agents"
                  defaultValue={partner.agents}
                  className="col-span-3"
                />
              </div>
            </>
          )}

          {partnerType === 'bank' && 'loanRate' in partner && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-loanRate" className="text-right">
                  Lãi suất vay
                </Label>
                <Input
                  id="edit-loanRate"
                  defaultValue={partner.loanRate}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-maxLoan" className="text-right">
                  Tỷ lệ vay tối đa
                </Label>
                <Input
                  id="edit-maxLoan"
                  defaultValue={partner.maxLoan}
                  className="col-span-3"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-partnership" className="text-right">
              Năm hợp tác
            </Label>
            <Input
              id="edit-partnership"
              defaultValue={partner.partnership}
              className="col-span-3"
            />
          </div>

          {/* Specialties/Benefits Section */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">
              {partnerType === 'bank' ? 'Ưu đãi' : 'Chuyên môn'}
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex flex-wrap gap-2">
                {(partnerType === 'bank' ? benefits : specialties).map(
                  (item, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {item}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          partnerType === 'bank'
                            ? removeBenefit(item)
                            : removeSpecialty(item)
                        }
                      />
                    </Badge>
                  )
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder={
                    partnerType === 'bank'
                      ? 'Thêm ưu đãi...'
                      : 'Thêm chuyên môn...'
                  }
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (partnerType === 'bank') {
                        addBenefit(value);
                      } else {
                        addSpecialty(value);
                      }
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          {partnerType !== 'bank' && (
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right mt-2">Thành tựu</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {achievements.map((achievement, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Award className="h-3 w-3" />
                      {achievement}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeAchievement(achievement)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Thêm thành tựu..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const value = (
                          e.target as HTMLInputElement
                        ).value.trim();
                        addAchievement(value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleSubmit}
          >
            Cập nhật
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
