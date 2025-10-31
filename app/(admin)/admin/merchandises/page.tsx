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
import { Plus, Edit, Trash2, Search, ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/common/animations';
import {
  useCreateMerchandiseMutation,
  useDeleteMerchandiseMutation,
  useGetAllMerchandiseQuery,
  useUpdateMerchandiseMutation,
} from '@/features/merchandise/merchandiseApi';
import { compressImage, diffPayload } from '@/lib/utils';
import { useUploadImageMutation } from '@/features/upload/uploadApi';

interface Merchandise {
  id: string;
  name: string;
  description?: string;
  price: number;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function MerchandisePage() {
  const { data: merchandises, isLoading } = useGetAllMerchandiseQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMerchandise, setSelectedMerchandise] =
    useState<Merchandise | null>(null);
  const [deleteMerchandise] = useDeleteMerchandiseMutation();

  const filteredMerchandises = (merchandises ?? []).filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedMerchandises = filteredMerchandises.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMerchandises.length / itemsPerPage);

  const handleOpenCreateDialog = () => {
    setSelectedMerchandise(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (item: Merchandise) => {
    setSelectedMerchandise(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => deleteMerchandise(id);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Merchandise
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Quản lý sản phẩm của IQI Vietnam
            </p>
          </div>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleOpenCreateDialog}
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </div>
      </FadeIn>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedMerchandise
                ? 'Chỉnh sửa thông tin sản phẩm'
                : 'Thêm sản phẩm mới'}
            </DialogTitle>
          </DialogHeader>
          <MerchandiseFormDialog
            initialData={selectedMerchandise}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogContent>
      </Dialog>

      {/* Search */}
      <FadeIn delay={0.1}>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm merchandise..."
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
              Danh sách sản phẩm ({filteredMerchandises.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Ảnh
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Tên sản phẩm
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Mô tả
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Giá
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Ngày tạo
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMerchandises.length > 0 ? (
                    paginatedMerchandises.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="py-3 px-4">
                          {item.images && item.images.length > 0 ? (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <Image
                                src={item.images[0]?.url || '/placeholder.svg'}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                          {item.description}
                        </td>
                        <td className="py-3 px-4 font-semibold text-orange-600">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(item.price)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {item.createdAt}
                        </td>
                        <td className="py-3 px-4">
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
                                  <AlertDialogTitle>
                                    Xóa merchandise
                                  </AlertDialogTitle>
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
                        Không có merchandise nào
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
                    {paginatedMerchandises.length} /{' '}
                    {filteredMerchandises.length} kết quả
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

function MerchandiseFormDialog({ initialData, setIsDialogOpen }: any) {
  initialData;
  const [formData, setFormData] = useState({
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    price: initialData?.price ?? '',
    images: initialData?.images ?? '',
  });

  console.log(formData.images);

  const [updateMerchandise, { isLoading: isUpdating }] =
    useUpdateMerchandiseMutation();
  const [createMerchandise, { isLoading: isCreating }] =
    useCreateMerchandiseMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files) {
      Array.from(files).forEach((file) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, file],
        }));
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_: any, i: any) => i !== index),
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Lấy ra các field thay đổi
      let payload = diffPayload(formData, initialData);

      const finalImages = [];

      for (const img of formData.images) {
        if (img instanceof File) {
          const compressedFile = await compressImage(img);

          const newUploadRes = await uploadImage({
            file: compressedFile,
            folder: 'merchandise',
          }).unwrap();

          finalImages.push(newUploadRes);
        }
      }

      // Gán MẢNG ảnh đã xử lý (cũ + mới upload) vào payload
      console.log(finalImages);

      payload.images = finalImages;

      if (initialData) {
        await updateMerchandise({ id: initialData.id, body: payload }).unwrap();
      } else {
        await createMerchandise(payload).unwrap();
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error(
        `Error ${initialData ? 'editing' : 'creating'} merchandise:`,
        error
      );
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
      {/* Left: Image Upload */}
      <div className="flex flex-col space-y-4">
        <label className="text-sm font-semibold">Hình ảnh sản phẩm</label>

        {/* Upload Area */}
        <label className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-800 cursor-pointer hover:border-orange-500 transition-colors">
          <div className="flex flex-col items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Chọn ảnh
            </span>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        <label className="text-xs text-gray-500">
          Tối đa 2MB, định dạng JPG, PNG, WebP
        </label>

        {/* Image Grid */}
        {formData.images.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Ảnh đã chọn ({formData.images.length})
            </p>
            <div className="grid grid-cols-3 gap-3">
              {formData.images.map((img: any, idx: any) => (
                <div
                  key={idx}
                  className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                >
                  <Image
                    src={
                      img
                        ? img instanceof File
                          ? URL.createObjectURL(img)
                          : img.url
                        : '/placeholder.svg'
                    }
                    alt={`Preview ${idx}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Form */}
      <div className="flex flex-col space-y-4">
        <div>
          <label className="text-sm font-semibold mb-2 block">
            Tên sản phẩm *
          </label>
          <Input
            placeholder="VD: IQI Vietnam Hoodie"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 block">
            Mô tả sản phẩm
          </label>
          <Textarea
            placeholder="Mô tả chi tiết sản phẩm..."
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 block">
            Giá sản phẩm (VNĐ) *
          </label>
          <Input
            type="number"
            placeholder="VD: 450000"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => setIsDialogOpen(false)}
          >
            Hủy
          </Button>
          <Button
            className="flex-1 bg-orange-600 hover:bg-orange-700"
            onClick={handleSubmit}
          >
            {initialData
              ? isUpdating || isUploading
                ? 'Đang lưu'
                : 'Lưu'
              : isCreating || isUploading
                ? 'Đang thêm'
                : 'Thêm sản phẩm'}
          </Button>
        </div>
      </div>
    </div>
  );
}
