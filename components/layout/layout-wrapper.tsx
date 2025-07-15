'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/common/theme-provider';
import React from 'react';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    // Không dùng theme, force light mode
    return <div className="bg-white text-black">{children}</div>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="iqi-theme"
    >
      {children}
    </ThemeProvider>
  );
}
