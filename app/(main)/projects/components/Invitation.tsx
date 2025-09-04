'use client';

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas-pro';
import { useParams } from 'next/navigation';
import { projects } from '@/lib/project-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Header from '@/app/(main)/layout/header';

// Add global type for html2canvas
declare global {
  interface Window {
    html2canvas?: (
      element: HTMLElement,
      options?: any
    ) => Promise<HTMLCanvasElement>;
  }
}

export default function Invitation() {
  const [exportedImage, setExportedImage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const previewRef = useRef(null);
  const params = useParams();
  const project = projects.find((p) => p.id === Number(params.id));
  const { other: { invitation = {} } = {} } = project || {};
  const { invitationImage, fontSize, position }: any = invitation;
  const [name, setName] = useState('');

  // Function to export the div as a PNG image
  const handleExport = async () => {
    if (!previewRef.current || !html2canvas) {
      console.error('Preview element or html2canvas is not available.');
      return;
    }

    setIsLoading(true);

    try {
      await document.fonts.ready; // Wait for custom fonts to be loaded

      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2, // Render at 2x resolution to fix positioning and improve quality
      });
      const dataUrl = canvas.toDataURL('image/png');
      setExportedImage(dataUrl);
    } catch (error) {
      console.error('Error exporting canvas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render the final exported image with a download button
  if (exportedImage) {
    return (
      <main className="min-h-screen relative overflow-hidden center-both">
        <div
          ref={previewRef}
          className="relative w-fit mx-auto overflow-hidden"
        >
          <Image
            src={exportedImage}
            alt="Invitation"
            width={1200} // đặt width lớn để Next xử lý responsive
            height={800} // đặt height tạm, sẽ scale theo ảnh thật
            className="w-full h-auto object-contain max-h-screen"
          />
        </div>
      </main>
    );
  }

  // Render the main creation UI
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <Header />
      {/* Background Image */}
      <Image
        src="/hero-1.png"
        alt="Background"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 z-10 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-6 max-w-md w-full">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo-detail-light.png"
              alt="Logo"
              width={200}
              height={160}
              className="object-contain h-auto"
            />
          </div>

          {/* Main Title */}
          <h2 className="text-white text-3xl font-bold tracking-wider">
            TẠO THIỆP MỜI ONLINE
          </h2>

          {/* Form */}
          <form className="space-y-4 w-full">
            <Input
              type="text"
              placeholder="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 md:text-lg bg-black/30 border border-white/20 text-white focus:border-white/50 focus:bg-black/40"
            />

            <Button
              onClick={handleExport}
              disabled={!name || isLoading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:hover:bg-gray-400 text-white font-medium text-lg tracking-wide transition-colors disabled:bg-gray-400 disabled:opacity-100"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                'Tạo thiệp mời'
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Preview ẩn để sau khi submit thì tạo canva thiệp mời */}
      <div className="absolute inset-0 -z-20 center-both opacity-0">
        <div
          ref={previewRef}
          className="relative w-fit mx-auto overflow-hidden"
        >
          {invitationImage && (
            <Image
              src={invitationImage}
              alt="Invitation background"
              width={1200} // đặt width lớn để Next xử lý responsive
              height={800} // đặt height tạm, sẽ scale theo ảnh thật
              className="w-full h-auto object-contain max-h-screen"
            />
          )}
          {name && (
            <div
              style={{
                position: 'absolute',
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
                fontFamily: "'Great Vibes', cursive",
                fontSize: `${fontSize}px`,
                color: '#2c2c2c',
                textShadow: '1px 1px 3px rgba(255,255,255,0.7)',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
