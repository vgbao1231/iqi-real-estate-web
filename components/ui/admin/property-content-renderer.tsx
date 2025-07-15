"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EditableField } from "./editable-field"
import { CheckCircle, X, Plus, Trash2 } from "lucide-react"

interface PropertyContentRendererProps {
  item: any
  tabId: string
  contentIndex: number
  handleEditContentItem: (tabId: string, contentIndex: number, field: string, newValue: any) => void
  handleRemoveContentItem: (tabId: string, index: number) => void
}

export function PropertyContentRenderer({
  item,
  tabId,
  contentIndex,
  handleEditContentItem,
  handleRemoveContentItem,
}: PropertyContentRendererProps) {
  const [newItem, setNewItem] = useState("")

  const renderContentItem = () => {
    switch (item.type) {
      case "title":
        return (
          <div className="group relative">
            <h3 className="text-xl font-bold mb-2">
              <EditableField
                value={item.value}
                onSave={(value) => handleEditContentItem(tabId, contentIndex, "value", value)}
                placeholder="Nhập tiêu đề..."
              />
            </h3>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveContentItem(tabId, contentIndex)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        )

      case "paragraph":
        return (
          <div className="group relative">
            <div className="text-gray-700 leading-relaxed mb-4">
              <EditableField
                value={item.value}
                onSave={(value) => handleEditContentItem(tabId, contentIndex, "value", value)}
                placeholder="Nhập nội dung đoạn văn..."
                multiline={true}
              />
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveContentItem(tabId, contentIndex)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        )

      case "bullet-list":
        return (
          <div className="group relative mb-4">
            <div className="space-y-2">
              {item.items.map((bulletItem: string, bulletIndex: number) => (
                <div key={bulletIndex} className="flex items-center space-x-2 group/bullet">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <EditableField
                    value={bulletItem}
                    onSave={(value) => {
                      const newItems = [...item.items]
                      newItems[bulletIndex] = value
                      handleEditContentItem(tabId, contentIndex, "items", newItems)
                    }}
                    placeholder="Nhập nội dung..."
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover/bullet:opacity-100 transition-opacity"
                    onClick={() => {
                      const newItems = item.items.filter((_: any, bi: number) => bi !== bulletIndex)
                      handleEditContentItem(tabId, contentIndex, "items", newItems)
                    }}
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  placeholder="Thêm điểm mới..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      if (newItem.trim()) {
                        const newItems = [...item.items, newItem.trim()]
                        handleEditContentItem(tabId, contentIndex, "items", newItems)
                        setNewItem("")
                      }
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (newItem.trim()) {
                      const newItems = [...item.items, newItem.trim()]
                      handleEditContentItem(tabId, contentIndex, "items", newItems)
                      setNewItem("")
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveContentItem(tabId, contentIndex)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        )

      case "info-section":
        return (
          <div className="group relative mb-6">
            <h4 className="font-semibold mb-3">
              <EditableField
                value={item.title}
                onSave={(value) => handleEditContentItem(tabId, contentIndex, "title", value)}
                placeholder="Nhập tiêu đề phần..."
              />
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {item.items.map((infoItem: any, infoIndex: number) => (
                <div key={infoIndex} className="flex justify-between items-center group/info">
                  <div className="flex items-center space-x-1">
                    <EditableField
                      value={infoItem.label}
                      onSave={(value) => {
                        const newItems = [...item.items]
                        newItems[infoIndex] = { ...newItems[infoIndex], label: value }
                        handleEditContentItem(tabId, contentIndex, "items", newItems)
                      }}
                      placeholder="Label"
                    />
                    <span>:</span>
                  </div>
                  <EditableField
                    value={infoItem.value}
                    onSave={(value) => {
                      const newItems = [...item.items]
                      newItems[infoIndex] = { ...newItems[infoIndex], value: value }
                      handleEditContentItem(tabId, contentIndex, "items", newItems)
                    }}
                    placeholder="Giá trị"
                  />
                </div>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 bg-transparent"
              onClick={() => {
                const newItems = [...item.items, { label: "Label mới", value: "Giá trị mới" }]
                handleEditContentItem(tabId, contentIndex, "items", newItems)
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Thêm thông tin
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveContentItem(tabId, contentIndex)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return renderContentItem()
}
