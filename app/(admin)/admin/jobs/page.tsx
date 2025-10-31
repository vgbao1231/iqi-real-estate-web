'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/common/animations';
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetAllJobQuery,
  useUpdateJobMutation,
} from '@/features/job/jobApi';
import { diffPayload, formatVietnameseDateTime } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface Job {
  id: string;
  name: string;
  description?: string;
  price: number;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function JobPage() {
  const { data: jobs, isLoading } = useGetAllJobQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [deleteJob] = useDeleteJobMutation();

  const filteredJobs = (jobs ?? []).filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleOpenCreateDialog = () => {
    setSelectedJob(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (item: Job) => {
    setSelectedJob(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => deleteJob(id);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tuyển dụng
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Quản lý vị trí tuyển dụng của IQI Vietnam
            </p>
          </div>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleOpenCreateDialog}
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm vị trí mới
          </Button>
        </div>
      </FadeIn>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedJob
                ? 'Chỉnh sửa thông tin sản phẩm'
                : 'Thêm sản phẩm mới'}
            </DialogTitle>
          </DialogHeader>
          <JobFormDialog
            initialData={selectedJob}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogContent>
      </Dialog>

      {/* Search */}
      <FadeIn delay={0.1}>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm job..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </FadeIn>

      {/* Table */}
      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>
              Danh sách vị trí tuyển dụng ({filteredJobs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-300">
                      Vị trí
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-300">
                      Phòng ban
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-300">
                      Địa điểm
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-300">
                      Mức lương
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-300">
                      Ngày tạo
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-300">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="p-3 ">{item.title}</td>
                        <td className="p-3 text-sm font-medium text-gray-900">
                          {item.department}
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          {item.location}
                        </td>
                        <td className="p-3 text-sm text-orange-600 max-w-xs truncate">
                          {item.salary}
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          {formatVietnameseDateTime(item.createdAt)}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenEditDialog(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Xóa job</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {`Bạn có chắc chắn muốn xóa "${item.name}"?`}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="flex gap-3">
                                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Xóa
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 px-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        Không có job nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Trang {currentPage} của {totalPages} • Hiển thị{' '}
                    {paginatedJobs.length} / {filteredJobs.length} kết quả
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Trước
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={
                              currentPage === page
                                ? 'bg-orange-600 hover:bg-orange-700'
                                : ''
                            }
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Sau
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}

function JobFormDialog({ initialData, setIsDialogOpen }: any) {
  initialData;
  const [formData, setFormData] = useState({
    title: initialData?.title ?? '',
    department: initialData?.department ?? '',
    location: initialData?.location ?? '',
    salary: initialData?.salary ?? '',
    description: initialData?.description ?? '',
    requirements: initialData?.requirements ?? ([] as string[]),
    benefits: initialData?.benefits ?? ([] as string[]),
  });

  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Lấy ra các field thay đổi
      let payload = diffPayload(formData, initialData);
      if (initialData) {
        await updateJob({ id: initialData.id, body: payload }).unwrap();
      } else {
        await createJob(payload).unwrap();
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error(
        `Error ${initialData ? 'editing' : 'creating'} job:`,
        error
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[70vh] overflow-auto"
    >
      {/* Title */}
      <div>
        <Label htmlFor="title">Vị trí tuyển dụng *</Label>
        <Input
          id="title"
          placeholder="VD: Chuyên Viên Tư Vấn Bất Động Sản Cao Cấp"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      {/* Department & Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="department">Phòng ban *</Label>
          <Input
            id="department"
            placeholder="VD: Kinh doanh & Phát triển Thị trường"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Địa điểm *</Label>
          <Input
            id="location"
            placeholder="VD: TP. Hồ Chí Minh"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
        </div>
      </div>

      {/* Salary */}
      <div>
        <Label htmlFor="salary">Mức lương *</Label>
        <Input
          id="salary"
          placeholder="VD: Hoa hồng hấp dẫn (lên đến 80%) + Thưởng nóng"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          required
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Mô tả công việc *</Label>
        <Textarea
          id="description"
          placeholder="Mô tả chi tiết về công việc..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          required
        />
      </div>

      {/* Requirements */}
      <div>
        <Label htmlFor="requirements">Yêu cầu * (nhấn Enter để thêm)</Label>
        <Input
          id="requirements"
          placeholder="Nhập quyền lợi và nhấn Enter..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddItem(
                'requirements',
                (e.target as HTMLInputElement).value.trim()
              );
              (e.target as HTMLInputElement).value = '';
            }
          }}
        />
        {/* Display requirements as chips */}
        <div className="flex flex-col items-start gap-2 mt-2">
          {formData.requirements.map((item: any, index: any) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {item}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleRemoveItem('requirements', item)}
              />
            </Badge>
          ))}
        </div>
        {formData.requirements.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">Chưa có quyền lợi nào</p>
        )}
      </div>

      {/* Benefits */}
      <div>
        <Label htmlFor="benefits">Quyền lợi (nhấn Enter để thêm)</Label>
        <Input
          id="benefits"
          placeholder="Nhập quyền lợi và nhấn Enter..."
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
        {/* Display benefits as chips */}
        <div className="flex flex-col items-start gap-2 mt-2">
          {formData.benefits.map((item: any, index: any) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {item}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleRemoveItem('specialties', item)}
              />
            </Badge>
          ))}
        </div>
        {formData.benefits.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">Chưa có quyền lợi nào</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDialogOpen(false)}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={isUpdating || isCreating}
          className="bg-orange-600 hover:bg-orange-700"
        >
          {initialData
            ? isUpdating
              ? 'Đang lưu'
              : 'Lưu'
            : isCreating
              ? 'Đang thêm'
              : 'Thêm đối tác'}
        </Button>
      </div>
    </form>
  );
}
