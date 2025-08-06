'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Users,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Download,
  Upload,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

// Mock staff data
const allStaff = [
  {
    id: 1,
    name: 'Nguyễn Văn Minh',
    email: 'minh.nguyen@iqi.com',
    phone: '0901234567',
    role: 'Senior Agent',
    department: 'sales',
    status: 'active',
    joinDate: '2023-01-15',
    avatar: '/placeholder-2.webp?height=40&width=40',
    location: 'TP.HCM',
    deals: 23,
    revenue: '1.2B',
    performance: 95,
    lastActive: '2 giờ trước',
  },
  {
    id: 2,
    name: 'Trần Thị Hương',
    email: 'huong.tran@iqi.com',
    phone: '0901234568',
    role: 'Team Lead',
    department: 'sales',
    status: 'active',
    joinDate: '2022-08-20',
    avatar: '/placeholder-2.webp?height=40&width=40',
    location: 'Hà Nội',
    deals: 19,
    revenue: '980M',
    performance: 92,
    lastActive: '1 giờ trước',
  },
  {
    id: 3,
    name: 'Lê Văn Đức',
    email: 'duc.le@iqi.com',
    phone: '0901234569',
    role: 'Sales Manager',
    department: 'sales',
    status: 'active',
    joinDate: '2022-03-10',
    avatar: '/placeholder-2.webp?height=40&width=40',
    location: 'Đà Nẵng',
    deals: 17,
    revenue: '850M',
    performance: 88,
    lastActive: '30 phút trước',
  },
  {
    id: 4,
    name: 'Phạm Thị Mai',
    email: 'mai.pham@iqi.com',
    phone: '0901234570',
    role: 'Marketing Specialist',
    department: 'marketing',
    status: 'active',
    joinDate: '2023-05-12',
    avatar: '/placeholder-2.webp?height=40&width=40',
    location: 'TP.HCM',
    deals: 0,
    revenue: '0',
    performance: 85,
    lastActive: '1 ngày trước',
  },
  {
    id: 5,
    name: 'Hoàng Văn Nam',
    email: 'nam.hoang@iqi.com',
    phone: '0901234571',
    role: 'IT Support',
    department: 'it',
    status: 'active',
    joinDate: '2023-02-28',
    avatar: '/placeholder-2.webp?height=40&width=40',
    location: 'Hà Nội',
    deals: 0,
    revenue: '0',
    performance: 90,
    lastActive: '4 giờ trước',
  },
  {
    id: 6,
    name: 'Vũ Thị Lan',
    email: 'lan.vu@iqi.com',
    phone: '0901234572',
    role: 'HR Manager',
    department: 'hr',
    status: 'active',
    joinDate: '2022-11-05',
    avatar: '/placeholder-2.webp?height=40&width=40',
    location: 'TP.HCM',
    deals: 0,
    revenue: '0',
    performance: 93,
    lastActive: '2 giờ trước',
  },
  {
    id: 7,
    name: 'Đỗ Văn Hùng',
    email: 'hung.do@iqi.com',
    phone: '0901234573',
    role: 'Junior Agent',
    department: 'sales',
    status: 'inactive',
    joinDate: '2023-09-01',
    avatar: '/placeholder-2.webp?height=40&width=40',
    location: 'Nha Trang',
    deals: 5,
    revenue: '120M',
    performance: 75,
    lastActive: '1 tuần trước',
  },
  {
    id: 8,
    name: 'Ngô Thị Hoa',
    email: 'hoa.ngo@iqi.com',
    phone: '0901234574',
    role: 'Content Writer',
    department: 'marketing',
    status: 'active',
    joinDate: '2023-07-15',
    avatar: '/placeholder-2.webp?height=40&width=40',
    location: 'Hà Nội',
    deals: 0,
    revenue: '0',
    performance: 87,
    lastActive: '3 giờ trước',
  },
];

export default function StaffManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const itemsPerPage = 12;

  const departments = [
    { value: 'all', label: 'Tất cả phòng ban' },
    { value: 'sales', label: 'Kinh doanh' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'Nhân sự' },
    { value: 'it', label: 'IT' },
    { value: 'finance', label: 'Tài chính' },
  ];

  const roles = [
    { value: 'all', label: 'Tất cả chức vụ' },
    { value: 'manager', label: 'Manager' },
    { value: 'team-lead', label: 'Team Lead' },
    { value: 'senior', label: 'Senior' },
    { value: 'junior', label: 'Junior' },
    { value: 'specialist', label: 'Specialist' },
  ];

  const statuses = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'active', label: 'Đang hoạt động' },
    { value: 'inactive', label: 'Tạm nghỉ' },
    { value: 'pending', label: 'Chờ duyệt' },
  ];

  // Filter logic
  const filteredStaff = useMemo(() => {
    return allStaff.filter((staff) => {
      const matchesSearch =
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.phone.includes(searchTerm) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartment === 'all' || staff.department === selectedDepartment;
      const matchesRole =
        selectedRole === 'all' ||
        staff.role.toLowerCase().includes(selectedRole);
      const matchesStatus =
        selectedStatus === 'all' || staff.status === selectedStatus;

      return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
    });
  }, [searchTerm, selectedDepartment, selectedRole, selectedStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStaff = filteredStaff.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Stats
  const stats = {
    total: allStaff.length,
    active: allStaff.filter((s) => s.status === 'active').length,
    sales: allStaff.filter((s) => s.department === 'sales').length,
    newThisMonth: allStaff.filter(
      (s) =>
        new Date(s.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
  };

  const handleAddStaff = (formData: any) => {
    // Handle add staff logic
    console.log('Adding staff:', formData);
    setIsAddDialogOpen(false);
  };

  const handleEditStaff = (formData: any) => {
    // Handle edit staff logic
    console.log('Editing staff:', formData);
    setIsEditDialogOpen(false);
  };

  const handleDeleteStaff = (staffId: any) => {
    // Handle delete staff logic
    console.log('Deleting staff:', staffId);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Quản lý nhân sự
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Quản lý thông tin và hiệu suất của {stats.total} nhân viên
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất Excel
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Nhập Excel
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Thêm nhân viên
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Thêm nhân viên mới</DialogTitle>
                </DialogHeader>
                <StaffForm onSubmit={handleAddStaff} />
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
                  Tổng nhân viên
                </CardTitle>
                <Users className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs opacity-90">Tất cả nhân viên</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Đang hoạt động
                </CardTitle>
                <TrendingUp className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.active}</div>
                <p className="text-xs opacity-90">
                  {Math.round((stats.active / stats.total) * 100)}% tổng số
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Nhân viên kinh doanh
                </CardTitle>
                <Award className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.sales}</div>
                <p className="text-xs opacity-90">Đội ngũ sales</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Tuyển mới tháng này
                </CardTitle>
                <UserPlus className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.newThisMonth}</div>
                <p className="text-xs opacity-90">Nhân viên mới</p>
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
                    placeholder="Tìm kiếm theo tên, email, số điện thoại, chức vụ..."
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
                className="grid md:grid-cols-3 gap-4 pt-4 border-t"
              >
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Phòng ban
                  </Label>
                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Chức vụ
                  </Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue />
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
                {Math.min(startIndex + itemsPerPage, filteredStaff.length)}{' '}
                trong tổng số {filteredStaff.length} nhân viên
              </span>
              {(searchTerm ||
                selectedDepartment !== 'all' ||
                selectedRole !== 'all' ||
                selectedStatus !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDepartment('all');
                    setSelectedRole('all');
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

      {/* Staff Grid */}
      <FadeIn delay={0.3}>
        {paginatedStaff.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
              {paginatedStaff.map((staff: any, index) => (
                <ScaleIn key={staff.id} delay={index * 0.05}>
                  <motion.div whileHover={{ y: -5 }}>
                    <Card className="overflow-hidden h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={staff.avatar || '/placeholder-2.webp'}
                              />
                              <AvatarFallback>
                                {staff.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-sm">
                                {staff.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {staff.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedStaff(staff)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedStaff(staff);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteStaff(staff.id)}
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
                              variant={
                                staff.status === 'active'
                                  ? 'default'
                                  : 'secondary'
                              }
                              className={
                                staff.status === 'active' ? 'bg-green-600' : ''
                              }
                            >
                              {staff.status === 'active'
                                ? 'Hoạt động'
                                : 'Tạm nghỉ'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {staff.lastActive}
                            </span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="flex items-center text-muted-foreground">
                              <Mail className="w-3 h-3 mr-2" />
                              {staff.email}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Phone className="w-3 h-3 mr-2" />
                              {staff.phone}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="w-3 h-3 mr-2" />
                              {staff.location}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-2" />
                              Gia nhập:{' '}
                              {new Date(staff.joinDate).toLocaleDateString(
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
                setSelectedDepartment('all');
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
          </DialogHeader>
          {selectedStaff && (
            <StaffForm
              initialData={selectedStaff}
              onSubmit={handleEditStaff}
              isEdit={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Staff Form Component
function StaffForm({ initialData = null, onSubmit, isEdit = false }: any) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    role: initialData?.role || '',
    department: initialData?.department || '',
    location: initialData?.location || '',
    status: initialData?.status || 'active',
    joinDate: initialData?.joinDate || new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          <Label htmlFor="role">Chức vụ *</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="department">Phòng ban *</Label>
          <Select
            value={formData.department}
            onValueChange={(value) =>
              setFormData({ ...formData, department: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn phòng ban" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Kinh doanh</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="hr">Nhân sự</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="finance">Tài chính</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Địa điểm làm việc *</Label>
          <Select
            value={formData.location}
            onValueChange={(value) =>
              setFormData({ ...formData, location: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn địa điểm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TP.HCM">TP. Hồ Chí Minh</SelectItem>
              <SelectItem value="Hà Nội">Hà Nội</SelectItem>
              <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
              <SelectItem value="Nha Trang">Nha Trang</SelectItem>
              <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
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
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="inactive">Tạm nghỉ</SelectItem>
              <SelectItem value="pending">Chờ duyệt</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="joinDate">Ngày gia nhập</Label>
          <Input
            id="joinDate"
            type="date"
            value={formData.joinDate}
            onChange={(e) =>
              setFormData({ ...formData, joinDate: e.target.value })
            }
          />
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Ghi chú</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline">
          Hủy
        </Button>
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
          {isEdit ? 'Cập nhật' : 'Thêm nhân viên'}
        </Button>
      </div>
    </form>
  );
}
