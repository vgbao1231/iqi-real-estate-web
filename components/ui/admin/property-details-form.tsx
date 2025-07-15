"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { Camera, X, Plus, Trash2, CheckCircle } from "lucide-react"
import Image from "next/image"

interface PropertyDetailsFormProps {
  propertyForm: any
  handleInputChange: (field: string, value: any) => void
}

export function PropertyDetailsForm({ propertyForm, handleInputChange }: PropertyDetailsFormProps) {
  const [newFeature, setNewFeature] = useState("")

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      handleInputChange("features", [...propertyForm.features, newFeature.trim()])
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    handleInputChange(
      "features",
      propertyForm.features.filter((_: any, i: number) => i !== index),
    )
  }

  const handleAddImage = () => {
    const newImage = "/placeholder.svg?height=400&width=600"
    handleInputChange("images", [...propertyForm.images, newImage])
  }

  const handleRemoveImage = (index: number) => {
    handleInputChange(
      "images",
      propertyForm.images.filter((_: any, i: number) => i !== index),
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Mô tả sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              value={propertyForm.description}
              onChange={(value) => handleInputChange("description", value)}
              placeholder="Mô tả chi tiết về sản phẩm..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hình ảnh sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {propertyForm.images.map((image: string, index: number) => (
                <div key={index} className="relative group">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Property ${index + 1}`}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                onClick={handleAddImage}
              >
                <div className="text-center">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Thêm ảnh</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Điểm nổi bật</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-3">
            {propertyForm.features.map((feature: string, index: number) => (
              <div key={index} className="group flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="flex-1">{feature}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveFeature(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Thêm đặc điểm nổi bật..."
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
            />
            <Button size="sm" onClick={handleAddFeature}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
