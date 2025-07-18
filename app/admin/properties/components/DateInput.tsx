"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function DateInput({ label, id, ...props }: DateInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="date" {...props} />
    </div>
  )
}
