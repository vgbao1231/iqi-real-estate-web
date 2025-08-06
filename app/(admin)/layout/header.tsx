import { Bell, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import LanguageSwitcher from '../../../components/common/language-switcher';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function Header({ setSidebarOpen }: any) {
  return (
    <header className="sticky top-0 z-30 bg-card shadow-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen((p: any) => !p)}
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
            <div className="w-10 h-10 relative">
              <Image
                src="/placeholder.svg"
                alt="Avatar"
                fill
                className="object-cover rounded-full"
              />
            </div>
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
  );
}
