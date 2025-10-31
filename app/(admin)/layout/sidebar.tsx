import Link from 'next/link';
import {
  BriefcaseBusiness,
  Building,
  Gift,
  Globe,
  Newspaper,
  Phone,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

export default function Sidebar({ sidebarOpen, setSidebarOpen }: any) {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Nhân sự',
      href: '/admin/accounts',
      icon: Users,
      current: pathname.startsWith('/admin/accounts'),
    },
    {
      name: 'Đối tác',
      href: '/admin/partners',
      icon: Globe,
      current: pathname.startsWith('/admin/partners'),
    },
    {
      name: 'Tin tức',
      href: '/admin/articles',
      icon: Newspaper,
      current: pathname.startsWith('/admin/articles'),
    },
    {
      name: 'Sản phẩm',
      href: '/admin/merchandises',
      icon: Gift,
      current: pathname.startsWith('/admin/merchandises'),
    },
    {
      name: 'Tuyển dụng',
      href: '/admin/jobs',
      icon: BriefcaseBusiness,
      current: pathname.startsWith('/admin/jobs'),
    },
    {
      name: 'Liên hệ',
      href: '/admin/contacts',
      icon: Phone,
      current: pathname.startsWith('/admin/contacts'),
    },
  ];
  return (
    <>
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
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <Link href="/admin/accounts" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg center-both">
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
          <Separator />
          <Link
            href="/admin/settings"
            className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname.startsWith('/admin/settings')
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <Settings className="w-5 h-5 mr-3" />
              Cài đặt
            </div>
          </Link>
        </nav>
      </div>
    </>
  );
}
