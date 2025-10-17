import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import Providers from './providers';
import { siteMetadata } from '@/app/metadata';
import { EnumLoader } from '@/components/common/enum-loader';

const inter = Inter({ subsets: ['latin'] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="uaG-e_NkOuXNQMqXLlZxz2-J7JsM3-1J_HbgdbAkzZU"
        />
        <link rel="icon" type="image/png" href="/logo-IQIVN.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <EnumLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
