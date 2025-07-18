'use client';

import type * as React from 'react';
import { ClipboardList, Trash } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FileUpload } from '../FileUpload';

interface TechnicalDetailsTabProps {
  project: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: keyof any, value: string) => void;
  handleFileUpload: (
    name: keyof any,
    files: (File | string)[] | File | string | null
  ) => void;
  handleDynamicArrayChange: <K extends keyof any, V extends any[K]>(
    key: K,
    index: number,
    field: string,
    value: any
  ) => void;
  handleAddDynamicItem: <K extends keyof any>(key: K, newItem: any) => void;
  handleRemoveDynamicItem: <K extends keyof any>(key: K, index: number) => void;
  measurementUnitOptions: { value: string; label: string }[];
  currencyOptions: { value: string; label: string }[];
}

export function TechnicalDetailsTab({
  project,
  handleChange,
  handleNumberChange,
  handleSelectChange,
  handleFileUpload,
  handleDynamicArrayChange,
  handleAddDynamicItem,
  handleRemoveDynamicItem,
  measurementUnitOptions,
  currencyOptions,
}: TechnicalDetailsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" /> Tổng quan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Section 1: Technical Media */}
        <Separator />
        <h3 className="text-lg font-semibold">Ảnh & Mô tả kỹ thuật</h3>
        <div className="space-y-4">
          <FileUpload
            label="Ảnh tổng quan kỹ thuật"
            multiple={false}
            value={project.technicalImage}
            onChange={(file) => handleFileUpload('technicalImage', file)}
          />
          <div className="space-y-2">
            <Label htmlFor="technicalDescription">
              Mô tả tổng quan kỹ thuật
            </Label>
            <Textarea
              id="technicalDescription"
              name="technicalDescription"
              value={project.technicalDescription}
              onChange={handleChange}
              rows={5}
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Section 2: Technical Specifications & Other Details (Combined Table) */}
        <h3 className="text-lg font-semibold">Thông số & Chi tiết</h3>
        <Table>
          <TableBody>
            {/* --- Danh sách các thông tin readonly --- */}
            {[
              ['Tên dự án', project.name],
              ['Chủ đầu tư', project.developer],
              ['Địa chỉ', project.address],
              ['Loại hình BĐS', project.propertyType],
              ['Nhóm BĐS', project.propertyGroup],
              ['Giai đoạn', project.phase],
              ['Tình trạng sở hữu', project.tenure],
              ['Thời gian hoàn thành', project.completion],
              ['Tổng số căn/sản phẩm', project.totalUnits],
              ['Ngày niêm yết', project.listedOn],
              ['Cập nhật cuối', project.lastUpdated],
              ['Thời gian bàn giao', project.handoverDate],
              ['Lượt xem', project.views],
            ].map(([label, value], idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{label}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}

            {/* --- Các trường chọn --- */}
            <TableRow>
              <TableCell className="font-medium">Đơn vị đo lường</TableCell>
              <TableCell>
                <Select
                  value={project.measurementUnit}
                  onValueChange={(v) =>
                    handleSelectChange('measurementUnit', v)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn đơn vị" />
                  </SelectTrigger>
                  <SelectContent>
                    {measurementUnitOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Tiền tệ</TableCell>
              <TableCell>
                <Select
                  value={project.currency}
                  onValueChange={(v) => handleSelectChange('currency', v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn tiền tệ" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>

            {/* --- Các trường nhập số --- */}
            {[
              ['Diện tích đất', 'landArea'],
              ['Giá', 'minPrice', 'maxPrice'],
              ['Diện tích xây dựng', 'minBuildUp', 'maxBuildUp'],
              ['Số phòng ngủ', 'minBedroom', 'maxBedroom'],
              ['Số phòng tắm', 'minBathroom', 'maxBathroom'],
            ].map(([label, input1, input2], idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{label}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Input
                    id={input1}
                    name={input1}
                    type="number"
                    value={project[input1]}
                    onChange={handleNumberChange}
                  />
                  {input2 && (
                    <>
                      <p>-</p>
                      <Input
                        id={input2}
                        name={input2}
                        type="number"
                        value={project[input2]}
                        onChange={handleNumberChange}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {/* --- Các trường động (dynamic) --- */}
            {(project.customTechnicalDetails ?? []).map(
              (detail: any, index: any) => (
                <TableRow key={detail.id}>
                  <TableCell className="font-medium">
                    <Input
                      value={detail.label}
                      onChange={(e) =>
                        handleDynamicArrayChange(
                          'customTechnicalDetails',
                          index,
                          'label',
                          e.target.value
                        )
                      }
                      placeholder="Nhãn"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={detail.value}
                      onChange={(e) =>
                        handleDynamicArrayChange(
                          'customTechnicalDetails',
                          index,
                          'value',
                          e.target.value
                        )
                      }
                      placeholder="Giá trị"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleRemoveDynamicItem('customTechnicalDetails', index)
                      }
                      className="text-destructive hover:bg-destructive/10 h-6 w-6 p-0"
                    >
                      <Trash className="h-3 w-3" />
                      <span className="sr-only">Xoá</span>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}

            {/* Nút thêm mới dòng động */}
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAddDynamicItem('customTechnicalDetails', {
                      label: '',
                      value: '',
                    })
                  }
                >
                  Thêm thông tin khác
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
