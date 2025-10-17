import '../globals.css';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import GoogleTranslateScript from '@/components/common/google-translate-script';
import { ThemeStatus } from '@/app/(main)/components/theme-status';
import ScrollToTopButton from '@/components/common/scroll-top';
import { ThemeProvider } from '@/components/common/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="iqi-theme"
    >
      {children}
      <ThemeStatus />
      <ScrollToTopButton />
      <GoogleTranslateScript />
    </ThemeProvider>
  );
}
