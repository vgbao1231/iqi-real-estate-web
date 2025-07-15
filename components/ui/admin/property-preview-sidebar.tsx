"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ImageIcon } from "lucide-react"
import Image from "next/image"

interface PropertyPreviewSidebarProps {
  propertyForm: any
}

export function PropertyPreviewSidebar({ propertyForm }: PropertyPreviewSidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Xem trước</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            {propertyForm.images.length > 0 ? (
              <Image
                src={propertyForm.images[0] || "/placeholder.svg"}
                alt="Preview"
                width={300}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <span className="text-muted-foreground">Chưa có ảnh</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-lg">{propertyForm.name || "Tên sản phẩm"}</h3>
            <p className="text-muted-foreground text-sm flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {propertyForm.location || "Địa chỉ"}
            </p>
          </div>

          <div className="text-xl font-bold text-primary">{propertyForm.price || "Giá bán"}</div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Phòng ngủ:</span>
              <div>{propertyForm.bedrooms || "N/A"}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Diện tích:</span>
              <div>{propertyForm.area || "N/A"}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Chủ đầu tư:</span>
              <div>{propertyForm.developer || "N/A"}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Bàn giao:</span>
              <div>{propertyForm.completion || "N/A"}</div>
            </div>
          </div>

          <div>
            <Badge className={propertyForm.status === "active" ? "bg-green-600" : "bg-orange-600"}>
              {propertyForm.status === "active"
                ? "Đang hoạt động"
                : propertyForm.status === "draft"
                  ? "Bản nháp"
                  : "Đã lưu trữ"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
