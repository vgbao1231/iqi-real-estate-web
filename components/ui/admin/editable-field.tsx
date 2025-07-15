"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, X, Edit3 } from "lucide-react"

interface EditableFieldProps {
  value: string
  onSave: (value: string) => void
  placeholder: string
  multiline?: boolean
  className?: string
}

export function EditableField({ value, onSave, placeholder, multiline = false, className = "" }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)

  const handleSaveField = () => {
    onSave(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        {multiline ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1"
            rows={3}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSaveField()
              } else if (e.key === "Escape") {
                handleCancel()
              }
            }}
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveField()
              } else if (e.key === "Escape") {
                handleCancel()
              }
            }}
          />
        )}
        <Button size="sm" onClick={handleSaveField}>
          <Save className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`group flex items-center space-x-2 ${className}`}>
      <span
        className="flex-1 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
        onClick={() => setIsEditing(true)}
      >
        {value || <span className="text-gray-400">{placeholder}</span>}
      </span>
      <Button
        size="sm"
        variant="ghost"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIsEditing(true)}
      >
        <Edit3 className="w-4 h-4" />
      </Button>
    </div>
  )
}
