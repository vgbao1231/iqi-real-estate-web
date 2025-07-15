"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface PropertyLocationFormProps {
  propertyForm: any
}

export function PropertyLocationForm({ propertyForm }: PropertyLocationFormProps) {
  return (
    <div className="space-y-6">
      {/* Map placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Bản đồ tương tác</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <span className="text-gray-500">Bản đồ tương tác</span>
              <p className="text-sm text-gray-400 mt-1">{propertyForm.location || "Chưa có địa chỉ"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
