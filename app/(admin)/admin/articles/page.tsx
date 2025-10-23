'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  Newspaper,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  TrendingUp,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useMemo, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { FileUpload } from '@/components/ui/file-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import {
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useGetAdminArticlesQuery,
  useUpdateArticleMutation,
} from '@/features/article/articleApi';
import { useUploadImageMutation } from '@/features/upload/uploadApi';
import { compressImage, diffPayload } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function ArticleManagementPage() {
  const { data: allArticle } = useGetAdminArticlesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPublishStatus, setSelectedPublishStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 12;
  const [deleteArticle] = useDeleteArticleMutation();
  const articleCategories: any = useSelector(
    (state: RootState) => state.enum.articleCategories ?? []
  );

  const publishStatuses = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'published', label: 'Đã xuất bản' },
    { value: 'draft', label: 'Bản nháp' },
  ];

  // Filter logic
  const filteredArticle = useMemo(() => {
    return !allArticle
      ? []
      : allArticle.filter((article) => {
          const matchesSearch =
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            article.tags.some((tag: any) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            );

          const matchesCategory =
            selectedCategory === 'all' || article.category === selectedCategory;
          const matchesPublishStatus =
            selectedPublishStatus === 'all' ||
            (selectedPublishStatus === 'published' && article.isPublished) ||
            (selectedPublishStatus === 'draft' && !article.isPublished);

          return matchesSearch && matchesCategory && matchesPublishStatus;
        });
  }, [searchTerm, selectedCategory, selectedPublishStatus, allArticle]);

  // Pagination logic
  const totalPages = Math.ceil(filteredArticle.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticle = filteredArticle.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Stats
  const stats = {
    total: (allArticle ?? []).length,
    published: (allArticle ?? []).filter((n) => n.isPublished).length,
    draft: (allArticle ?? []).filter((n) => !n.isPublished).length,
    totalViews: (allArticle ?? []).reduce((sum, n) => sum + n.views, 0),
  };

  const handleDelete = async (id: any) => {
    console.log('Deleting ar:', id);
    try {
      await deleteArticle(id).unwrap();
    } catch (error) {
      console.error(`Error delete article:`, error);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Quản lý tin tức
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Quản lý {stats.total} bài viết với{' '}
              {stats.totalViews.toLocaleString()} lượt xem
            </p>
          </div>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => {
              setIsDialogOpen(true);
              setSelectedArticle(null);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Viết bài mới
          </Button>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Tổng bài viết
                </CardTitle>
                <Newspaper className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs opacity-90">Tất cả bài viết</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Đã xuất bản
                </CardTitle>
                <TrendingUp className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.published}</div>
                <p className="text-xs opacity-90">
                  {stats.total > 0
                    ? `${Math.round((stats.published / stats.total) * 100)}% tổng số`
                    : '0% tổng số'}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Bản nháp
                </CardTitle>
                <Clock className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.draft}</div>
                <p className="text-xs opacity-90">Chờ xuất bản</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Tổng lượt xem
                </CardTitle>
                <Eye className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalViews.toLocaleString()}
                </div>
                <p className="text-xs opacity-90">Lượt xem tích lũy</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </FadeIn>

      {/* Search and Filter */}
      <FadeIn delay={0.2}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm theo tiêu đề, nội dung, tác giả, tags..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Bộ lọc
              </Button>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid md:grid-cols-2 gap-4 pt-4 border-t"
              >
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Danh mục
                  </Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {articleCategories.map((category: any) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Trạng thái
                  </Label>
                  <Select
                    value={selectedPublishStatus}
                    onValueChange={setSelectedPublishStatus}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {publishStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
              <span>
                Hiển thị {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, filteredArticle.length)}{' '}
                trong tổng số {filteredArticle.length} bài viết
              </span>
              {(searchTerm ||
                selectedCategory !== 'all' ||
                selectedPublishStatus !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedPublishStatus('all');
                    setCurrentPage(1);
                  }}
                >
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Article Grid */}
      <FadeIn delay={0.3}>
        {paginatedArticle.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedArticle.map((article: any, index) => (
                <ScaleIn key={article.id} delay={index * 0.05}>
                  <motion.div whileHover={{ y: -5 }}>
                    <Card className="overflow-hidden h-full">
                      <div className="relative">
                        <Image
                          src={article.image?.url || '/placeholder.svg'}
                          alt={article.title}
                          width={800}
                          height={400}
                          priority
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge
                            className={
                              article.isPublished
                                ? 'bg-green-600'
                                : 'bg-gray-400'
                            }
                          >
                            {article.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                          </Badge>
                          {article.isFeatured && (
                            <Badge className="bg-orange-600">Nổi bật</Badge>
                          )}
                        </div>
                        <div className="absolute top-3 right-3 flex gap-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedArticle(article);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDelete(article.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <Badge variant="outline">
                              {articleCategories.find(
                                (ac: any) => ac.value === article.category
                              )?.label || article.category}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(article.createdAt).toLocaleDateString(
                                  'vi-VN'
                                )}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-semibold line-clamp-2 leading-tight">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {article.description}
                          </p>

                          {article.readTime && (
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime}</span>
                            </div>
                          )}

                          {article.isPublished && (
                            <div className="flex items-center justify-between text-xs pt-2 border-t">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center space-x-1">
                                  <Eye className="w-3 h-3" />
                                  <span>
                                    {article.views >= 1000
                                      ? `${(article.views / 1000).toFixed(1)}K`
                                      : article.views}
                                  </span>
                                </span>
                              </div>
                              <Link
                                href={`/${article.type.toLowerCase()}/${article.id}`}
                              >
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Xem
                                </Button>
                              </Link>
                            </div>
                          )}

                          {article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-2">
                              {article.tags
                                .slice(0, 3)
                                .map((tag: any, tagIndex: any) => (
                                  <Badge
                                    key={tagIndex}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              {article.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{article.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Trước
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    return page <= totalPages ? (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    ) : null;
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Sau
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Không tìm thấy bài viết
            </h3>
            <p className="text-muted-foreground mb-4">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedPublishStatus('all');
                setCurrentPage(1);
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </FadeIn>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedArticle ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
            </DialogTitle>
          </DialogHeader>
          <ArticleForm
            initialData={selectedArticle}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

const ArticleForm = memo(({ initialData = null, setIsDialogOpen }: any) => {
  const enums: any = useSelector((state: RootState) => state.enum) ?? {};

  const { articleTypes = [], articleCategories = [] } = enums;
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    type: initialData?.type || articleTypes[0]?.value,
    category: initialData?.category || articleCategories[0]?.value,
    isPublished: initialData?.isPublished || false,
    isFeatured: initialData?.isFeatured || false,
    tags: initialData?.tags || [],
    readTime: initialData?.readTime || '',
    image: initialData?.image || '',
  });

  const handleAddItem = (item: any) => {
    if (!item) return;
    setFormData((prev: any) => ({
      ...prev,
      tags: [...(prev.tags || []), item],
    }));
  };

  const handleRemoveItem = (item: any) => {
    setFormData((prev: any) => ({
      ...prev,
      tags: prev.tags.filter((i: any) => i !== item),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadRes: { url: string; publicId: string } | null = null;
    try {
      // Lấy ra các field thay đổi
      let payload = diffPayload(formData, initialData);

      // Nếu avatar là file -> upload
      if (formData.image instanceof File) {
        const compressedFile = await compressImage(formData.image);
        uploadRes = await uploadImage({
          file: compressedFile,
          folder: 'articles',
        }).unwrap();
        payload.image = uploadRes;
      }

      if (initialData) {
        await updateArticle({ id: initialData.id, body: payload }).unwrap();
      } else {
        await createArticle(payload).unwrap();
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error(
        `Error ${initialData ? 'editing' : 'creating'} article:`,
        error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Image & Settings */}
        <div className="space-y-6">
          {/* Article Featured Image */}
          <FileUpload
            label="Ảnh bài viết*"
            value={formData.image}
            onChange={(file) => {
              setFormData({ ...formData, image: file });
              console.log('???');
            }}
            placeholder={
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb">
                  Tải ảnh bài viết
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP (tối đa 5MB)
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Khuyến nghị: 800x400px
                </p>
              </div>
            }
          />
          {/* Published Toggle */}
          <div className="flex items-center space-x-2 px-4 py-2 border rounded-lg">
            <Checkbox
              id="isPublished"
              checked={formData.isPublished}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isPublished: checked })
              }
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <div>
              <Label
                htmlFor="isPublished"
                className="font-medium cursor-pointer"
              >
                Xuất bản bài viết
              </Label>
              <p className="text-xs text-muted-foreground">
                {formData.isPublished
                  ? 'Bài viết đang công khai'
                  : 'Lưu dưới dạng bản nháp'}
              </p>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-2 px-4 py-2 border rounded-lg">
            <Checkbox
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isFeatured: checked })
              }
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <Label
                htmlFor="isFeatured"
                className="font-medium cursor-pointer"
              >
                Bài viết nổi bật
              </Label>
              <p className="text-xs text-muted-foreground">
                Hiển thị ở vị trí ưu tiên
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Article Info */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <Label htmlFor="title">Tiêu đề bài viết *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Nhập tiêu đề hấp dẫn..."
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Mô tả ngắn *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Mô tả ngắn gọn về nội dung bài viết..."
              rows={2}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">Loại bài viết *</Label>
              <Select
                required
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại bài viết" />
                </SelectTrigger>
                <SelectContent>
                  {articleTypes.map((item: any) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Danh mục *</Label>
              <Select
                required
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {articleCategories.map((item: any) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="readTime">Thời gian đọc</Label>
              <Input
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData({ ...formData, readTime: e.target.value })
                }
                placeholder="vd: 5 phút đọc"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="content">Nội dung bài viết *</Label>
            <RichTextEditor
              id="content"
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="Nhập nội dung bài viết..."
            />
          </div>

          <div>
            <Label htmlFor="tags">Nhãn bài viết (Enter để thêm)</Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((item: any, index: any) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {item}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveItem(item)}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Thêm nhãn..."
                name="tags"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem((e.target as HTMLInputElement).value.trim());
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsDialogOpen(false);
          }}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={isUpdating || isCreating || isUploading}
        >
          {initialData
            ? isUpdating || isUploading
              ? 'Đang lưu'
              : 'Lưu'
            : isCreating || isUploading
              ? 'Đang thêm'
              : 'Thêm bài viết'}
        </Button>
      </div>
    </form>
  );
});
ArticleForm.displayName = 'ArticleForm';
