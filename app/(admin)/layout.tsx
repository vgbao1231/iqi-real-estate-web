'use client';

import type React from 'react';
import '../globals.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Header from './layout/header';
import Sidebar from './layout/sidebar';
import { ThemeProvider } from '@/components/common/theme-provider';
import GoogleTranslateScript from '@/components/common/google-translate-script';
import { useMeQuery } from '@/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '@/features/auth/authSlice';
import ScrollToTopButton from '@/components/common/scroll-top';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const { data: user, isLoading, error } = useMeQuery();
  useEffect(() => {
    if (user) {
      dispatch(setUser(user)); // 🆕 lưu user vào Redux store
    } else if (error) {
      dispatch(clearUser()); // clear nếu chưa login hoặc 401
    }
  }, [user, error, dispatch]);
  if (isLoading) {
    return <div></div>;
  }

  return (
    <ThemeProvider attribute="class" value={{ light: 'light' }}>
      <GoogleTranslateScript />
      <ScrollToTopButton />

      <div className="min-h-screen bg-background light">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <div
          className={cn(
            'transition-all duration-300',
            sidebarOpen ? 'pl-64' : 'pl-0'
          )}
        >
          {/* Top header */}
          <Header setSidebarOpen={setSidebarOpen} />

          {/* Page content */}
          <main className="flex-1 text-foreground">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
