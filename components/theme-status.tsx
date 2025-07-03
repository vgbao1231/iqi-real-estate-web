"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export function ThemeStatus() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
        {theme === "system" ? `System (${currentTheme})` : theme}
      </Badge>
    </div>
  )
}
