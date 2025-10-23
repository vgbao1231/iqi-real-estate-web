'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  Users,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Camera,
  X,
  EyeOff,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useMemo, useRef } from 'react';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '@/features/user/userApi';
import { useUploadImageMutation } from '@/features/upload/uploadApi';
import { compressImage, diffPayload } from '@/lib/utils';

const roles = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'SALE', label: 'Sale' },
];

const statuses = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'true', label: 'Đang hoạt động' },
  { value: 'false', label: 'Tạm nghỉ' },
];

export default function UserManagementPage() {
  const { data: users } = useGetAllUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 4;
  const [deleteUser] = useDeleteUserMutation();

  // Filter logic
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((us) => {
      const matchesSearch =
        us.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        us.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        us.phone.includes(searchTerm) ||
        us.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        selectedRole === 'all' || us.role.toLowerCase().includes(selectedRole);
      const matchesStatus =
        selectedStatus === 'all' || us.isActive === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchTerm, selectedRole, selectedStatus, users]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUser = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = async (id: any) => {
    console.log('Deleting us:', id);
    try {
      await deleteUser(id).unwrap();
    } catch (error) {
      console.error(`Error delete user:`, error);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-4">
            <Users className="h-8 w-8 text-orange-600" />
            Quản lý nhân sự
          </h1>
          <div className="flex space-x-3">
            {/* <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất Excel
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Nhập Excel
            </Button> */}
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => {
                setSelectedUser(null);
                setIsDialogOpen(true);
              }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Thêm nhân viên
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* Search and Filter */}
      <FadeIn delay={0.2}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-shrink-0 w-3/5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm theo tên, email, số điện thoại, chức vụ..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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

            <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
              <span>
                Hiển thị {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, filteredUsers.length)}{' '}
                trong tổng số {filteredUsers.length} nhân viên
              </span>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* User Grid */}
      <FadeIn delay={0.3}>
        {paginatedUser.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
              {paginatedUser.map((us: any, index) => (
                <ScaleIn key={us.id} delay={index * 0.05}>
                  <motion.div whileHover={{ y: -5 }}>
                    <Card className="overflow-hidden h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={us.image?.url || '/placeholder.svg'}
                                className="w-full h-full object-cover"
                                alt="User Avatar"
                              />
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-sm">
                                {us.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {us.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(us);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(us.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant={us.isActive ? 'default' : 'secondary'}
                              className={us.isActive ? 'bg-green-600' : ''}
                            >
                              {us.isActive ? 'Hoạt động' : 'Tạm nghỉ'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {us.lastActive}
                            </span>
                          </div>

                          <div className="text-xs grid grid-cols-2 gap-2">
                            <div className="flex items-center text-muted-foreground">
                              <Mail className="w-3 h-3 mr-2" />
                              {us.email}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Phone className="w-3 h-3 mr-2" />
                              {us.phone}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-2" />
                              Gia nhập:{' '}
                              {new Date(us.createdAt).toLocaleDateString(
                                'vi-VN'
                              )}
                            </div>
                          </div>
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
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Không tìm thấy nhân viên
            </h3>
            <p className="text-muted-foreground mb-4">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedRole('all');
                setSelectedStatus('all');
                setCurrentPage(1);
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </FadeIn>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedUser
                ? 'Chỉnh sửa thông tin nhân viên'
                : 'Thêm nhân viên mới'}
            </DialogTitle>
          </DialogHeader>
          <UserForm
            initialData={selectedUser}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// User Form Component
function UserForm({ initialData = null, setIsDialogOpen }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const [formData, setFormData] = useState<any>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    role: initialData?.role || 'ADMIN',
    isActive: initialData?.isActive ?? true,
    password: '',
    image: initialData?.image,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let uploadRes: { url: string; publicId: string } | null = null;
    try {
      // Lấy ra các field thay đổi
      let payload = diffPayload(formData, initialData);

      // Bỏ password nếu rỗng
      if (!payload.password) delete payload.password;

      // Nếu avatar là file -> upload
      if (formData.image instanceof File) {
        const compressedFile = await compressImage(formData.image);
        uploadRes = await uploadImage({
          file: compressedFile,
          folder: 'users',
        }).unwrap();
        payload.image = uploadRes;
      }

      if (initialData) {
        await updateUser({ id: initialData.id, body: payload }).unwrap();
      } else {
        await createUser(payload).unwrap();
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error(
        `Error ${initialData ? 'editing' : 'creating'} user:`,
        error
      );
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const removeAvatar = () => {
    setFormData({ ...formData, image: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="w-24 h-24 rounded-full overflow-hidden">
            <AvatarImage
              src={
                formData.image instanceof File
                  ? URL.createObjectURL(formData.image)
                  : formData.image?.url || '/placeholder.svg'
              }
              className="w-full h-full object-cover"
              alt="User Avatar"
            />
          </Avatar>

          {formData.image && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
              onClick={removeAvatar}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-4 h-4 mr-2" />
            {formData.image ? 'Thay đổi avatar' : 'Thêm avatar'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Chọn ảnh JPG, PNG hoặc GIF. Kích thước tối đa 2MB.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Họ và tên *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Số điện thoại *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="role">Vai trò *</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {!initialData && (
          <div>
            <Label htmlFor="password">Mật khẩu *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline">Hủy</Button>
        <Button
          type="submit"
          disabled={isUpdating || isCreating || isUploading}
          className="bg-orange-600 hover:bg-orange-700"
        >
          {initialData
            ? isUpdating || isUploading
              ? 'Đang lưu'
              : 'Lưu'
            : isCreating || isUploading
              ? 'Đang thêm'
              : 'Thêm nhân viên'}
        </Button>
      </div>
    </form>
  );
}
