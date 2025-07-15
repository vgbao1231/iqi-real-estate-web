import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import LayoutWrapper from '@/components/layout/layout-wrapper';
import React from 'react';
import 'leaflet/dist/leaflet.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'IQI Vietnam - Đối tác Bất động sản Đáng tin cậy',
    template: '%s | IQI Vietnam',
  },
  description: 'IQI Vietnam cung cấp dịch vụ bất động sản toàn diện',
  keywords: ['bất động sản', 'IQI Vietnam', 'mua bán nhà', 'cho thuê căn hộ'],
  authors: [{ name: 'IQI Vietnam', url: 'https://iqiglobal.com/vn' }],
  creator: 'IQI Vietnam Team',
  openGraph: {
    title: 'IQI Vietnam - Đối tác Bất động sản Đáng tin cậy',
    description: 'IQI Vietnam cung cấp dịch vụ bất động sản toàn diện',
    url: 'https://iqiglobal.com/vn',
    siteName: 'IQI Vietnam',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="uaG-e_NkOuXNQMqXLlZxz2-J7JsM3-1J_HbgdbAkzZU"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <LayoutWrapper>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </LayoutWrapper>
      </body>
    </html>
  );
}
