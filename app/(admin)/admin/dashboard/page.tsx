'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn } from '@/components/common/animations';
import {
  Users,
  Building,
  Newspaper,
  Plus,
  UserPlus,
  FileText,
  DollarSign,
  Target,
  Award,
  Globe,
  Eye,
  BarChart3,
  Calendar,
  MessageSquare,
  ArrowUp,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  // Mock data
  const stats = {
    totalStaff: 156,
    totalProperties: 1247,
    totalPartners: 48,
    totalNews: 89,
    monthlyRevenue: '2.4B',
    activeProjects: 23,
    pendingApprovals: 12,
    newInquiries: 34,
  };

  const recentActivities = [
    {
      action: 'Thêm dự án mới',
      item: 'Marina Bay Residences',
      time: '2 giờ trước',
      type: 'property',
      user: 'Nguyễn Văn A',
    },
    {
      action: 'Cập nhật tin tức',
      item: 'Thị trường BDS Q4',
      time: '4 giờ trước',
      type: 'news',
      user: 'Trần Thị B',
    },
    {
      action: 'Thêm nhân viên',
      item: 'Lê Văn C',
      time: '1 ngày trước',
      type: 'staff',
      user: 'Admin',
    },
    {
      action: 'Cập nhật đối tác',
      item: 'Vinhomes',
      time: '2 ngày trước',
      type: 'partner',
      user: 'Phạm Thị D',
    },
    {
      action: 'Phê duyệt dự án',
      item: 'Times City Hanoi',
      time: '3 ngày trước',
      type: 'approval',
      user: 'Admin',
    },
  ];

  const topPerformers = [
    {
      id: 1,
      name: 'Nguyễn Văn Minh',
      role: 'Senior Agent',
      avatar: '/placeholder-2.webp?height=40&width=40',
      deals: 23,
      revenue: '1.2B',
      growth: '+15%',
    },
    {
      id: 2,
      name: 'Trần Thị Hương',
      role: 'Team Lead',
      avatar: '/placeholder-2.webp?height=40&width=40',
      deals: 19,
      revenue: '980M',
      growth: '+12%',
    },
    {
      id: 3,
      name: 'Lê Văn Đức',
      role: 'Sales Manager',
      avatar: '/placeholder-2.webp?height=40&width=40',
      deals: 17,
      revenue: '850M',
      growth: '+8%',
    },
  ];

  const recentProperties = [
    {
      id: 1,
      name: 'Marina Bay Residences',
      location: 'Singapore',
      status: 'active',
      views: 2341,
      inquiries: 45,
      image: '/placeholder-2.webp?height=60&width=80',
    },
    {
      id: 2,
      name: 'Vinhomes Central Park',
      location: 'TP.HCM',
      status: 'active',
      views: 3456,
      inquiries: 78,
      image: '/placeholder-2.webp?height=60&width=80',
    },
    {
      id: 3,
      name: 'Times City Hanoi',
      location: 'Hà Nội',
      status: 'pending',
      views: 1876,
      inquiries: 32,
      image: '/placeholder-2.webp?height=60&width=80',
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Chào mừng trở lại! Đây là tổng quan hệ thống IQI Vietnam.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Thêm mới
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Báo cáo
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* Stats Grid */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Tổng nhân sự
                </CardTitle>
                <Users className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStaff}</div>
                <p className="text-xs opacity-90 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +12% so với tháng trước
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Tổng dự án
                </CardTitle>
                <Building className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalProperties}
                </div>
                <p className="text-xs opacity-90 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +8% so với tháng trước
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Doanh thu tháng
                </CardTitle>
                <DollarSign className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.monthlyRevenue}</div>
                <p className="text-xs opacity-90 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +23% so với tháng trước
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  Đối tác
                </CardTitle>
                <Globe className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPartners}</div>
                <p className="text-xs opacity-90 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +5% so với tháng trước
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </FadeIn>

      {/* Quick Actions */}
      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-orange-600" />
              Thao tác nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/admin/dashboard/properties/new">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col bg-transparent"
                  >
                    <Building className="w-6 h-6 mb-2" />
                    <span className="text-sm">Thêm dự án</span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/admin/dashboard/staff/new">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col bg-transparent"
                  >
                    <UserPlus className="w-6 h-6 mb-2" />
                    <span className="text-sm">Thêm nhân viên</span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/admin/dashboard/news/new">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col bg-transparent"
                  >
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">Viết tin tức</span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/admin/dashboard/reports">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col bg-transparent"
                  >
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <span className="text-sm">Xem báo cáo</span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <FadeIn delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Hoạt động gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'property'
                            ? 'bg-green-100 text-green-600'
                            : activity.type === 'news'
                              ? 'bg-blue-100 text-blue-600'
                              : activity.type === 'staff'
                                ? 'bg-purple-100 text-purple-600'
                                : activity.type === 'partner'
                                  ? 'bg-orange-100 text-orange-600'
                                  : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {activity.type === 'property' && (
                          <Building className="w-5 h-5" />
                        )}
                        {activity.type === 'news' && (
                          <Newspaper className="w-5 h-5" />
                        )}
                        {activity.type === 'staff' && (
                          <Users className="w-5 h-5" />
                        )}
                        {activity.type === 'partner' && (
                          <Globe className="w-5 h-5" />
                        )}
                        {activity.type === 'approval' && (
                          <Award className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.action}:{' '}
                          <span className="text-blue-600">{activity.item}</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          bởi {activity.user} • {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/admin/dashboard/activities">
                    <Button variant="ghost" className="w-full">
                      Xem tất cả hoạt động
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Top Performers */}
        <div>
          <FadeIn delay={0.4}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <motion.div
                      key={performer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={performer.avatar || '/placeholder-2.webp'}
                          />
                          <AvatarFallback>
                            {performer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Badge
                          className={`absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs ${
                            index === 0
                              ? 'bg-yellow-500'
                              : index === 1
                                ? 'bg-gray-400'
                                : 'bg-orange-500'
                          }`}
                        >
                          {index + 1}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {performer.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {performer.role}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-green-600 font-medium">
                            {performer.deals} deals
                          </span>
                          <span className="text-xs text-blue-600 font-medium">
                            {performer.revenue}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {performer.growth}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/admin/dashboard/staff">
                    <Button variant="ghost" className="w-full">
                      Xem tất cả nhân viên
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>

      {/* Recent Properties */}
      <FadeIn delay={0.5}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2 text-green-600" />
                Dự án mới nhất
              </CardTitle>
              <Link href="/admin/dashboard/properties">
                <Button variant="outline" size="sm">
                  Xem tất cả
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {recentProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden">
                    <div className="relative">
                      <Image
                        src={property.image || '/placeholder-2.webp'}
                        alt={property.name}
                        width={80}
                        height={60}
                        className="w-full h-32 object-cover"
                      />
                      <Badge
                        className={`absolute top-2 right-2 ${
                          property.status === 'active'
                            ? 'bg-green-600'
                            : 'bg-yellow-600'
                        }`}
                      >
                        {property.status === 'active'
                          ? 'Đang bán'
                          : 'Chờ duyệt'}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-1">
                        {property.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">
                        {property.location}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center text-gray-500">
                          <Eye className="w-3 h-3 mr-1" />
                          {property.views}
                        </div>
                        <div className="flex items-center text-blue-600">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          {property.inquiries}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
