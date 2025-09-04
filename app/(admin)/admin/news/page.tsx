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
  DialogTrigger,
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
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  Download,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock news data
const allNews = [
  {
    id: 1,
    title: 'Thị trường bất động sản Q4/2025: Xu hướng phục hồi mạnh mẽ',
    slug: 'thi-truong-bat-dong-san-q4-2025',
    excerpt:
      'Thị trường bất động sản trong quý 4 năm 2025 cho thấy những dấu hiệu phục hồi tích cực với thanh khoản tăng mạnh...',
    content: 'Nội dung chi tiết bài viết...',
    category: 'market',
    status: 'published',
    author: 'Nguyễn Văn A',
    authorId: 1,
    publishDate: '2025-01-10',
    createdAt: '2025-01-08',
    updatedAt: '2025-01-10',
    featuredImage: '/placeholder-2.webp?height=200&width=300',
    views: 2341,
    likes: 45,
    comments: 12,
    tags: ['thị trường', 'Q4 2025', 'phục hồi'],
    seoTitle: 'Thị trường BĐS Q4/2025 - Xu hướng phục hồi',
    seoDescription:
      'Phân tích chi tiết về xu hướng phục hồi của thị trường bất động sản trong quý 4/2025',
  },
  {
    id: 2,
    title: 'Dự án Vinhomes Grand Park: Cập nhật tiến độ xây dựng tháng 1/2025',
    slug: 'vinhomes-grand-park-tien-do-thang-1-2025',
    excerpt:
      'Dự án Vinhomes Grand Park đang trong giai đoạn hoàn thiện hạ tầng và bàn giao những căn hộ đầu tiên...',
    content: 'Nội dung chi tiết bài viết...',
    category: 'project',
    status: 'published',
    author: 'Trần Thị B',
    authorId: 2,
    publishDate: '2025-01-08',
    createdAt: '2025-01-06',
    updatedAt: '2025-01-08',
    featuredImage: '/placeholder-2.webp?height=200&width=300',
    views: 1876,
    likes: 32,
    comments: 8,
    tags: ['Vinhomes', 'Grand Park', 'tiến độ'],
    seoTitle: 'Vinhomes Grand Park - Tiến độ tháng 1/2025',
    seoDescription:
      'Cập nhật mới nhất về tiến độ xây dựng dự án Vinhomes Grand Park',
  },
  {
    id: 3,
    title: '5 xu hướng đầu tư bất động sản nổi bật năm 2025',
    slug: '5-xu-huong-dau-tu-bat-dong-san-2025',
    excerpt:
      'Năm 2025 đánh dấu sự chuyển mình của thị trường bất động sản với những xu hướng đầu tư mới...',
    content: 'Nội dung chi tiết bài viết...',
    category: 'investment',
    status: 'draft',
    author: 'Lê Văn C',
    authorId: 3,
    publishDate: null,
    createdAt: '2025-01-05',
    updatedAt: '2025-01-07',
    featuredImage: '/placeholder-2.webp?height=200&width=300',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['đầu tư', 'xu hướng', '2025'],
    seoTitle: '5 xu hướng đầu tư BĐS nổi bật 2025',
    seoDescription:
      'Khám phá 5 xu hướng đầu tư bất động sản đáng chú ý trong năm 2025',
  },
  {
    id: 4,
    title: 'Chính sách mới về thuế bất động sản có hiệu lực từ tháng 2/2025',
    slug: 'chinh-sach-thue-bat-dong-san-thang-2-2025',
    excerpt:
      'Chính phủ vừa ban hành chính sách mới về thuế bất động sản, có hiệu lực từ tháng 2/2025...',
    content: 'Nội dung chi tiết bài viết...',
    category: 'policy',
    status: 'published',
    author: 'Phạm Thị D',
    authorId: 4,
    publishDate: '2025-01-05',
    createdAt: '2025-01-03',
    updatedAt: '2025-01-05',
    featuredImage: '/placeholder-2.webp?height=200&width=300',
    views: 3456,
    likes: 67,
    comments: 23,
    tags: ['chính sách', 'thuế', '2025'],
    seoTitle: 'Chính sách thuế BĐS mới 2025',
    seoDescription:
      'Tìm hiểu về chính sách thuế bất động sản mới có hiệu lực từ tháng 2/2025',
  },
];

export default function NewsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const itemsPerPage = 12;

  const categories = [
    { value: 'all', label: 'Tất cả danh mục' },
    { value: 'market', label: 'Thị trường' },
    { value: 'project', label: 'Dự án' },
    { value: 'investment', label: 'Đầu tư' },
    { value: 'policy', label: 'Chính sách' },
    { value: 'guide', label: 'Hướng dẫn' },
  ];

  const statuses = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'published', label: 'Đã xuất bản' },
    { value: 'draft', label: 'Bản nháp' },
    { value: 'scheduled', label: 'Đã lên lịch' },
    { value: 'archived', label: 'Đã lưu trữ' },
  ];

  // Filter logic
  const filteredNews = useMemo(() => {
    return allNews.filter((news) => {
      const matchesSearch =
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'all' || news.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'all' || news.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Stats
  const stats = {
    total: allNews.length,
    published: allNews.filter((n) => n.status === 'published').length,
    draft: allNews.filter((n) => n.status === 'draft').length,
    totalViews: allNews.reduce((sum, n) => sum + n.views, 0),
  };

  const NewsForm = ({ initialData, onSubmit, isEdit = false }: any) => {
    const [formData, setFormData] = useState({
      title: initialData?.title || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
      category: initialData?.category || 'market',
      status: initialData?.status || 'draft',
      tags: initialData?.tags?.join(', ') || '',
      seoTitle: initialData?.seoTitle || '',
      seoDescription: initialData?.seoDescription || '',
      publishDate: initialData?.publishDate || '',
    });

    const handleSubmit = (e: any) => {
      e.preventDefault();
      const submitData = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((tag: any) => tag.trim())
          .filter((tag: any) => tag),
      };
      onSubmit(submitData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Tiêu đề *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="excerpt">Tóm tắt *</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            rows={3}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Danh mục *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Thị trường</SelectItem>
                <SelectItem value="project">Dự án</SelectItem>
                <SelectItem value="investment">Đầu tư</SelectItem>
                <SelectItem value="policy">Chính sách</SelectItem>
                <SelectItem value="guide">Hướng dẫn</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Bản nháp</SelectItem>
                <SelectItem value="published">Xuất bản ngay</SelectItem>
                <SelectItem value="scheduled">Lên lịch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="content">Nội dung *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={8}
            required
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="thị trường, đầu tư, 2025"
          />
        </div>

        {formData.status === 'scheduled' && (
          <div>
            <Label htmlFor="publishDate">Ngày xuất bản</Label>
            <Input
              id="publishDate"
              type="datetime-local"
              value={formData.publishDate}
              onChange={(e) =>
                setFormData({ ...formData, publishDate: e.target.value })
              }
            />
          </div>
        )}

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">SEO Settings</h4>
          <div>
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              value={formData.seoTitle}
              onChange={(e) =>
                setFormData({ ...formData, seoTitle: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              value={formData.seoDescription}
              onChange={(e) =>
                setFormData({ ...formData, seoDescription: e.target.value })
              }
              rows={2}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline">
            Hủy
          </Button>
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
            {isEdit ? 'Cập nhật' : 'Tạo bài viết'}
          </Button>
        </div>
      </form>
    );
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
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Viết bài mới
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tạo bài viết mới</DialogTitle>
                </DialogHeader>
                <NewsForm
                  onSubmit={(data: any) => {
                    console.log('Adding news:', data);
                    setIsAddDialogOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
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
                  {Math.round((stats.published / stats.total) * 100)}% tổng số
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
                      {categories.map((category) => (
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
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
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
                {Math.min(startIndex + itemsPerPage, filteredNews.length)} trong
                tổng số {filteredNews.length} bài viết
              </span>
              {(searchTerm ||
                selectedCategory !== 'all' ||
                selectedStatus !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedStatus('all');
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

      {/* News Grid */}
      <FadeIn delay={0.3}>
        {paginatedNews.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedNews.map((news: any, index) => (
                <ScaleIn key={news.id} delay={index * 0.05}>
                  <motion.div whileHover={{ y: -5 }}>
                    <Card className="overflow-hidden h-full">
                      <div className="relative">
                        <Image
                          src={news.featuredImage || '/placeholder-2.webp'}
                          alt={news.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge
                            className={
                              news.status === 'published'
                                ? 'bg-green-600'
                                : news.status === 'draft'
                                  ? 'bg-yellow-600'
                                  : news.status === 'scheduled'
                                    ? 'bg-blue-600'
                                    : 'bg-gray-600'
                            }
                          >
                            {news.status === 'published'
                              ? 'Đã xuất bản'
                              : news.status === 'draft'
                                ? 'Bản nháp'
                                : news.status === 'scheduled'
                                  ? 'Đã lên lịch'
                                  : 'Lưu trữ'}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3 flex gap-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedNews(news);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <Badge variant="outline" className="capitalize">
                              {news.category === 'market'
                                ? 'Thị trường'
                                : news.category === 'project'
                                  ? 'Dự án'
                                  : news.category === 'investment'
                                    ? 'Đầu tư'
                                    : news.category === 'policy'
                                      ? 'Chính sách'
                                      : 'Hướng dẫn'}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(news.createdAt).toLocaleDateString(
                                  'vi-VN'
                                )}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-semibold line-clamp-2 leading-tight">
                            {news.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {news.excerpt}
                          </p>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{news.author}</span>
                            </div>
                            {news.publishDate && (
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {new Date(
                                    news.publishDate
                                  ).toLocaleDateString('vi-VN')}
                                </span>
                              </div>
                            )}
                          </div>

                          {news.status === 'published' && (
                            <div className="flex items-center justify-between text-xs pt-2 border-t">
                              <span className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{news.views}</span>
                              </span>
                              <Link href={`/news/${news.slug}`}>
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Xem
                                </Button>
                              </Link>
                            </div>
                          )}

                          {news.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-2">
                              {news.tags
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
                              {news.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{news.tags.length - 3}
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
                setSelectedStatus('all');
                setCurrentPage(1);
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </FadeIn>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
          </DialogHeader>
          {selectedNews && (
            <NewsForm
              initialData={selectedNews}
              onSubmit={(data: any) => {
                console.log('Editing news:', data);
                setIsEditDialogOpen(false);
              }}
              isEdit={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
