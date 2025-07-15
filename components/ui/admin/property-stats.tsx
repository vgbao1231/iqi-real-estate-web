"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Eye, MessageSquare, Users, Globe, Home, MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface PropertyStatsProps {
  activeTab: string
  properties: any[]
}

export function PropertyStats({ activeTab, properties }: PropertyStatsProps) {
  const getStats = () => {
    const total = properties.length
    const active = properties.filter((p) => p.status === "active").length
    const draft = properties.filter((p) => p.status === "draft").length
    const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0)
    const totalInquiries = properties.reduce((sum, p) => sum + (p.inquiries || 0), 0)

    return { total, active, draft, totalViews, totalInquiries }
  }

  const stats = getStats()

  const getTabIcon = () => {
    switch (activeTab) {
      case "vietnam":
        return Home
      case "international":
        return Globe
      case "resort":
        return MapPin
      default:
        return Building
    }
  }

  const getTabName = () => {
    switch (activeTab) {
      case "vietnam":
        return "Việt Nam"
      case "international":
        return "Quốc tế"
      case "resort":
        return "Resort"
      default:
        return "Tất cả"
    }
  }

  const TabIcon = getTabIcon()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <motion.div whileHover={{ y: -5 }}>
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Tổng dự án {getTabName()}</CardTitle>
            <TabIcon className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs opacity-90">{stats.active} đang hoạt động</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ y: -5 }}>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Đang bán</CardTitle>
            <Building className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs opacity-90">{((stats.active / stats.total) * 100 || 0).toFixed(1)}% tổng số</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ y: -5 }}>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Bản nháp</CardTitle>
            <Users className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draft}</div>
            <p className="text-xs opacity-90">Chờ phê duyệt</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ y: -5 }}>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Lượt xem</CardTitle>
            <Eye className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs opacity-90">Tổng lượt xem</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ y: -5 }}>
        <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Quan tâm</CardTitle>
            <MessageSquare className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInquiries}</div>
            <p className="text-xs opacity-90">Lượt liên hệ</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
