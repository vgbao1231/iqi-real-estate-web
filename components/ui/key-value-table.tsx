"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, GripVertical } from "lucide-react"

interface KeyValuePair {
  key: string
  value: string | number
  type?: "text" | "number" | "select"
  options?: string[]
}

interface KeyValueTableProps {
  title: string
  data: KeyValuePair[]
  onChange: (data: KeyValuePair[]) => void
  predefinedFields?: KeyValuePair[]
}

export function KeyValueTable({ title, data, onChange, predefinedFields = [] }: KeyValueTableProps) {
  const [newKey, setNewKey] = useState("")
  const [newValue, setNewValue] = useState("")

  const updateItem = (index: number, field: "key" | "value", value: string | number) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const removeItem = (index: number) => {
    const newData = data.filter((_, i) => i !== index)
    onChange(newData)
  }

  const addItem = () => {
    if (newKey.trim() && newValue.trim()) {
      const newData = [...data, { key: newKey.trim(), value: newValue.trim() }]
      onChange(newData)
      setNewKey("")
      setNewValue("")
    }
  }

  const addPredefinedField = (field: KeyValuePair) => {
    const exists = data.some((item) => item.key === field.key)
    if (!exists) {
      const newData = [...data, { ...field }]
      onChange(newData)
    }
  }

  const renderValueInput = (item: KeyValuePair, index: number) => {
    if (item.type === "number") {
      return (
        <Input
          type="number"
          value={item.value}
          onChange={(e) => updateItem(index, "value", Number(e.target.value) || 0)}
          placeholder="Nhập giá trị số"
          className="h-8 text-sm"
        />
      )
    }

    if (item.type === "select" && item.options) {
      return (
        <Select value={item.value.toString()} onValueChange={(value) => updateItem(index, "value", value)}>
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="Chọn giá trị" />
          </SelectTrigger>
          <SelectContent>
            {item.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    return (
      <Input
        value={item.value}
        onChange={(e) => updateItem(index, "value", e.target.value)}
        placeholder="Nhập giá trị"
        className="h-8 text-sm"
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b">
        <Label className="text-lg font-semibold text-gray-900">{title}</Label>
        <div className="flex items-center gap-3">
          {predefinedFields.length > 0 && (
            <Select
              onValueChange={(value) => {
                const field = predefinedFields.find((f) => f.key === value)
                if (field) addPredefinedField(field)
              }}
            >
              <SelectTrigger className="w-48 h-8 text-sm">
                <SelectValue placeholder="+ Thêm trường có sẵn" />
              </SelectTrigger>
              <SelectContent>
                {predefinedFields
                  .filter((field) => !data.some((item) => item.key === field.key))
                  .map((field) => (
                    <SelectItem key={field.key} value={field.key}>
                      {field.key}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
          <span className="text-sm text-gray-500">{data.length} trường</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        {data.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">
              <GripVertical className="h-8 w-8 mx-auto" />
            </div>
            <p className="text-gray-500 text-sm mb-4">Chưa có trường nào được thêm</p>
            <p className="text-xs text-gray-400">Sử dụng form bên dưới để thêm trường mới</p>
          </div>
        ) : (
          <div className="overflow-hidden">
            {data.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                {/* Drag Handle */}
                <div className="flex-shrink-0">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                </div>

                {/* Key Field */}
                <div className="flex-1 min-w-0">
                  <Input
                    value={item.key}
                    onChange={(e) => updateItem(index, "key", e.target.value)}
                    placeholder="Tên trường"
                    className="h-8 text-sm font-medium border-0 bg-transparent focus:bg-white focus:border focus:shadow-sm"
                  />
                </div>

                {/* Separator */}
                <div className="flex-shrink-0 text-gray-300 font-medium">:</div>

                {/* Value Field */}
                <div className="flex-1 min-w-0">
                  <div className="relative">{renderValueInput(item, index)}</div>
                </div>

                {/* Delete Button */}
                <div className="flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Row */}
        <div className="border-t bg-gray-50/50 p-3">
          <div className="flex items-center gap-3">
            {/* Placeholder for drag handle */}
            <div className="flex-shrink-0 w-4"></div>

            {/* New Key Input */}
            <div className="flex-1 min-w-0">
              <Input
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="Tên trường mới..."
                onKeyPress={(e) => e.key === "Enter" && addItem()}
                className="h-8 text-sm border-dashed"
              />
            </div>

            {/* Separator */}
            <div className="flex-shrink-0 text-gray-300 font-medium">:</div>

            {/* New Value Input */}
            <div className="flex-1 min-w-0">
              <Input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Giá trị..."
                onKeyPress={(e) => e.key === "Enter" && addItem()}
                className="h-8 text-sm border-dashed"
              />
            </div>

            {/* Add Button */}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={addItem}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                disabled={!newKey.trim() || !newValue.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
