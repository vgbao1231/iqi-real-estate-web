"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MapPin, Eye, MessageSquare, MoreHorizontal, Edit3, Trash2, Star, Building, Calendar } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

interface PropertyCardProps {
  property: any
  onEdit: (property: any) => void
  onDelete: (id: number) => void
  index: number
}

export function PropertyCard({ property, onEdit, onDelete, index }: PropertyCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "draft":
        return "bg-orange-600"
      case "archived":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang bán"
      case "draft":
        return "Bản nháp"
      case "archived":
        return "Đã lưu trữ"
      default:
        return "Không xác định"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <Image
            src={property.images?.[0] || "/placeholder.svg?height=200&width=300"}
            alt={property.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <Badge className={`absolute top-3 right-3 ${getStatusColor(property.status)}`}>
            {getStatusText(property.status)}
          </Badge>
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className="bg-white/90 text-gray-700">
              ID: {property.id}
            </Badge>
          </div>

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
            <Button size="sm" variant="secondary" onClick={() => onEdit(property)}>
              <Edit3 className="w-4 h-4 mr-1" />
              Sửa
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(property.id)}>
              <Trash2 className="w-4 h-4 mr-1" />
              Xóa
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-lg line-clamp-1">{property.name}</h3>
              <p className="text-gray-600 text-sm flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{property.location}</span>
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-primary">{property.price}</div>
              {property.pricePerSqm && (
                <div className="text-sm text-orange-600 font-medium">{property.pricePerSqm}</div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium">{property.bedrooms || "N/A"}</div>
                <div className="text-gray-600 text-xs">Phòng ngủ</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium">{property.area || "N/A"}</div>
                <div className="text-gray-600 text-xs">Diện tích</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium">{property.bathrooms || "N/A"}</div>
                <div className="text-gray-600 text-xs">Phòng tắm</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span className="line-clamp-1">{property.developer}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{property.completion}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{property.views || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{property.inquiries || 0}</span>
                </div>
                {property.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{property.rating}</span>
                  </div>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(property)}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 mr-2" />
                    Xem chi tiết
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={() => onDelete(property.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
