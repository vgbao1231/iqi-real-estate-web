import AdminLayout from '@/components/layout/admin-layout';
import type { ReactNode } from 'react';

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
