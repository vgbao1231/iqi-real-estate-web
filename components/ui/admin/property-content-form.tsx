"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyContentRenderer } from "./property-content-renderer"
import { X, Plus, Type, AlignLeft, List, Square } from "lucide-react"

interface PropertyContentFormProps {
  propertyForm: any
  handleInputChange: (field: string, value: any) => void
}

export function PropertyContentForm({ propertyForm, handleInputChange }: PropertyContentFormProps) {
  const [contentActiveTab, setContentActiveTab] = useState("overview")
  const [newItem, setNewItem] = useState("")
  const [newTabName, setNewTabName] = useState("")
  const [contentType, setContentType] = useState("bullet")

  // Dynamic tab content management
  const handleAddTab = () => {
    if (newTabName.trim()) {
      const newTab = {
        id: newTabName.toLowerCase().replace(/\s+/g, "-"),
        name: newTabName.trim(),
        content: [],
      }
      handleInputChange("tabs", [...propertyForm.tabs, newTab])
      setNewTabName("")
    }
  }

  const handleRemoveTab = (tabId: string) => {
    if (propertyForm.tabs.length > 1) {
      const newTabs = propertyForm.tabs.filter((tab: any) => tab.id !== tabId)
      handleInputChange("tabs", newTabs)
      // Reset active tab if removed tab was active
      if (contentActiveTab === tabId) {
        setContentActiveTab(propertyForm.tabs[0]?.id || "overview")
      }
    }
  }

  const handleAddContentItem = (tabId: string) => {
    if (newItem.trim()) {
      let newContent
      switch (contentType) {
        case "title":
          newContent = { type: "title", value: newItem.trim() }
          break
        case "paragraph":
          newContent = { type: "paragraph", value: newItem.trim() }
          break
        case "bullet":
          newContent = { type: "bullet-list", items: [newItem.trim()] }
          break
        case "info":
          newContent = {
            type: "info-section",
            title: "Thông tin mới",
            items: [{ label: "Label", value: newItem.trim() }],
          }
          break
        default:
          newContent = { type: "bullet-list", items: [newItem.trim()] }
      }

      const newTabs = propertyForm.tabs.map((tab: any) =>
        tab.id === tabId ? { ...tab, content: [...tab.content, newContent] } : tab,
      )
      handleInputChange("tabs", newTabs)
      setNewItem("")
    }
  }

  const handleRemoveContentItem = (tabId: string, index: number) => {
    const newTabs = propertyForm.tabs.map((tab: any) =>
      tab.id === tabId ? { ...tab, content: tab.content.filter((_: any, i: number) => i !== index) } : tab,
    )
    handleInputChange("tabs", newTabs)
  }

  const handleEditContentItem = (tabId: string, contentIndex: number, field: string, newValue: any) => {
    const newTabs = propertyForm.tabs.map((tab: any) =>
      tab.id === tabId
        ? {
            ...tab,
            content: tab.content.map((item: any, i: number) =>
              i === contentIndex ? { ...item, [field]: newValue } : item,
            ),
          }
        : tab,
    )
    handleInputChange("tabs", newTabs)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Nội dung chi tiết
            <div className="flex gap-2">
              <Input
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                placeholder="Tên tab mới..."
                className="w-40"
              />
              <Button size="sm" onClick={handleAddTab}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={contentActiveTab} onValueChange={setContentActiveTab}>
            <TabsList
              className="grid w-full"
              style={{ gridTemplateColumns: `repeat(${propertyForm.tabs.length}, 1fr)` }}
            >
              {propertyForm.tabs.map((tab: any) => (
                <TabsTrigger key={tab.id} value={tab.id} className="relative">
                  {tab.name}
                  {propertyForm.tabs.length > 1 && (
                    <X
                      className="w-3 h-3 ml-2 cursor-pointer hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveTab(tab.id)
                      }}
                    />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {propertyForm.tabs.map((tab: any) => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-6">
                <div className="space-y-6">
                  {tab.content.map((item: any, index: number) => (
                    <div key={index}>
                      <PropertyContentRenderer
                        item={item}
                        tabId={tab.id}
                        contentIndex={index}
                        handleEditContentItem={handleEditContentItem}
                        handleRemoveContentItem={handleRemoveContentItem}
                      />
                    </div>
                  ))}

                  {/* Add new content */}
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="title">
                            <div className="flex items-center">
                              <Type className="w-4 h-4 mr-2" />
                              Tiêu đề
                            </div>
                          </SelectItem>
                          <SelectItem value="paragraph">
                            <div className="flex items-center">
                              <AlignLeft className="w-4 h-4 mr-2" />
                              Đoạn văn
                            </div>
                          </SelectItem>
                          <SelectItem value="bullet">
                            <div className="flex items-center">
                              <List className="w-4 h-4 mr-2" />
                              Danh sách
                            </div>
                          </SelectItem>
                          <SelectItem value="info">
                            <div className="flex items-center">
                              <Square className="w-4 h-4 mr-2" />
                              Thông tin
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder={
                          contentType === "title"
                            ? "Nhập tiêu đề..."
                            : contentType === "paragraph"
                              ? "Nhập nội dung đoạn văn..."
                              : contentType === "info"
                                ? "Nhập thông tin..."
                                : "Nhập nội dung..."
                        }
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddContentItem(contentActiveTab)}
                      />
                      <Button size="sm" onClick={() => handleAddContentItem(contentActiveTab)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
