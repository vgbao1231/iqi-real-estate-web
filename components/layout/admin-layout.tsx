'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Building,
  Users,
  Newspaper,
  Globe,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/common/language-switcher';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: Home,
      current: pathname === '/admin/dashboard',
    },
    {
      name: 'Nhân sự',
      href: '/admin/staff',
      icon: Users,
      current: pathname.startsWith('/admin/staff'),
    },
    {
      name: 'Dự án',
      href: '/admin/properties',
      icon: Building,
      current: pathname.startsWith('/admin/properties'),
    },
    {
      name: 'Đối tác',
      href: '/admin/partners',
      icon: Globe,
      current: pathname.startsWith('/admin/partners'),
    },
    {
      name: 'Tin tức',
      href: '/admin/news',
      icon: Newspaper,
      current: pathname.startsWith('/admin/news'),
    },
  ];

  return (
    <div className="min-h-screen bg-background light">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-gray-600 opacity-75" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Building className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              IQI Admin
            </span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                item.current
                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </div>
            </Link>
          ))}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-border">
          <Link
            href="/admin/settings"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Settings className="w-5 h-5 mr-3" />
            Cài đặt
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div
        className={cn(
          'transition-all duration-300',
          sidebarOpen ? 'pl-64' : 'pl-0'
        )}
      >
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-card shadow-sm border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen((p) => !p)}
            >
              <Menu className="w-5 h-5 text-foreground" />
            </Button>

            {/* Page title - will be overridden by individual pages */}
            <div className="flex-1 lg:flex-none">
              <h1 className="text-lg font-semibold text-foreground lg:hidden">
                Admin Dashboard
              </h1>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-foreground" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-600 text-white text-xs">
                  3
                </Badge>
              </Button>

              {/* Language Switcher */}
              <LanguageSwitcher className="bg-card" />

              {/* User menu */}
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-2.webp?height=32&width=32" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Admin User
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    admin@iqi.com
                  </div>
                </div>
              </div>

              {/* Logout */}
              {/* TODO: để tạm cho tiện test */}
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4 text-foreground" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 text-foreground">{children}</main>
      </div>
    </div>
  );
}
