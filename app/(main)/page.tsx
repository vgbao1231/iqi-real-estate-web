'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas-pro';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Plus } from 'lucide-react';

// Add global type for html2canvas
declare global {
  interface Window {
    html2canvas?: (
      element: HTMLElement,
      options?: any
    ) => Promise<HTMLCanvasElement>;
  }
}

const defaultValue = {
  policy: {
    title: '',
    policyText: '<p><br></p>',
    policyImage: null,
  },
  invitation: {
    fields: [
      {
        id: 'name',
        size: 30,
        type: 'text',
        label: 'Tên trên thiệp',
        position: {
          x: 26.671876589208765,
          y: 18.053248569577693,
        },
        value: 'Nguyễn Thành Trung',
      },
      {
        id: 'image',
        size: 80,
        type: 'image',
        label: 'Logo đại lý',
        position: {
          x: 10.218752373754866,
          y: 7.318423953500148,
        },
        value: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1759744643/IQI/projects/pyels9t7jcd0o9k4f3uk.png',
          publicId: 'IQI/projects/pyels9t7jcd0o9k4f3uk',
        },
      },
    ],
    invitationImage: {
      url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1759744646/IQI/projects/j1dc3ls6uhltbmcwqoo8.jpg',
      publicId: 'IQI/projects/j1dc3ls6uhltbmcwqoo8',
    },
  },
  breakImages: [],
};

export default function Invitation() {
  const [exportedImage, setExportedImage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const previewRef = useRef<HTMLDivElement>(null);

  // const params = useParams();
  // const { data: other = {} } = useGetPublicProjectTabByIdQuery({
  //   id: params.id as string,
  //   tab: 'other',
  // });

  const other = defaultValue;

  const { invitation = {} } = other as any;
  const invitationImage = invitation?.invitationImage ?? null;

  // State lưu dữ liệu form
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Memo fields để tránh re-calc nhiều lần
  const fields = useMemo(() => invitation?.fields ?? [], [invitation]);

  // Init state khi lần đầu có fields
  useEffect(() => {
    if (fields.length > 0 && Object.keys(formData).length === 0) {
      const init: Record<string, any> = {};
      fields.forEach((f: any) => {
        init[f.id] = ''; // local state thôi
      });
      setFormData(init);
    }
  }, [fields, formData]);

  // Export ra ảnh
  const handleExport = async () => {
    if (!previewRef.current || !html2canvas) return;

    setIsLoading(true);
    try {
      await document.fonts.ready;
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
      });
      setExportedImage(canvas.toDataURL('image/png'));
    } catch (err) {
      console.error('Error exporting canvas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!exportedImage) return;
    const link = document.createElement('a');
    link.href = exportedImage;
    link.download = 'thiep-moi.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Nếu chưa có invitation thì không render gì
  if (!invitation || fields.length === 0) return <></>;

  // Nếu đã export thì hiển thị ảnh kết quả
  if (exportedImage) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <div
          ref={previewRef}
          className="relative w-fit mx-auto overflow-hidden center-both flex-col mt-20"
        >
          <Image
            src={exportedImage}
            alt="Invitation"
            width={1200}
            height={800}
            className="w-full h-auto object-contain max-h-[70vh]"
          />
        </div>
        <div className="center-both gap-8 mt-8">
          <Button
            onClick={() => setExportedImage(null)}
            className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Plus />
            Tạo thiệp mới
          </Button>
          <Button onClick={handleDownload} className="hover:bg-orange-500">
            Tải ảnh xuống
          </Button>
        </div>
      </main>
    );
  }

  // Render the main creation UI
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Header */}
      {/* <Header /> */}
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
        <div className="text-center space-y-6 max-w-100 w-full">
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
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExport();
              }}
              className="space-y-4"
            >
              {fields.map((field: any) => {
                if (field.type === 'text') {
                  return (
                    <div key={field.id}>
                      <Input
                        type="text"
                        placeholder={`Nhập ${field.label.toLowerCase()}`}
                        value={formData[field.id] || ''}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            [field.id]: newValue,
                          }));
                        }}
                        className="w-full h-11 px-4 text-sm bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:border-orange-400 focus:bg-white/30 focus:ring-2 focus:ring-orange-400/20 rounded-lg transition-all duration-200"
                      />
                    </div>
                  );
                }

                if (field.type === 'image') {
                  return (
                    <div key={field.id}>
                      <div className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg p-4 hover:bg-white/20 transition-all duration-200">
                        <label className="flex flex-col items-center justify-center cursor-pointer">
                          {imagePreview ? (
                            <div className="w-full mb-3 center-both border-2 border-white/30 rounded-lg">
                              <img
                                src={imagePreview || '/placeholder.svg'}
                                alt="Preview"
                                className="h-24 object-cover"
                              />
                            </div>
                          ) : (
                            <svg
                              className="mx-auto h-10 w-10 text-white/70 mb-2"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          <div className="text-center">
                            <p className="text-sm text-white/80 font-medium">
                              {selectedFileName || 'Chọn ảnh nền'}
                            </p>
                            <p className="text-xs text-white/60 mt-1">
                              {selectedFileName
                                ? 'Nhấn để thay đổi'
                                : 'PNG, JPG, GIF tối đa 10MB'}
                            </p>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setFormData((prev) => ({
                                  ...prev,
                                  [field.id]: file,
                                }));
                                setSelectedFileName(file.name);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setImagePreview(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  );
                }

                return null;
              })}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-sm font-semibold text-white shadow-lg transition-all duration-200 border-0 mt-6 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
               disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:from-gray-600 disabled:hover:to-gray-600"
              >
                {isLoading ? 'Đang tạo' : 'Tạo thiệp mới'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Preview ẩn để sau khi submit thì tạo canva thiệp mời */}
      <div className="absolute inset-0 -z-20 center-both opacity-0">
        <div ref={previewRef} className="relative w-fit overflow-hidden">
          {invitationImage && (
            <Image
              src={invitationImage?.url}
              alt="Invitation background"
              width={1200} // đặt width lớn để Next xử lý responsive
              height={800} // đặt height tạm, sẽ scale theo ảnh thật
              className="w-auto h-[80vh]"
            />
          )}

          {/* Render text theo từng field */}
          {invitation.fields.map((field: any) => {
            const value = formData[field.id];
            if (!value) return null;

            const baseStyle: React.CSSProperties = {
              position: 'absolute',
              left: `${field.position.x}%`,
              top: `${field.position.y}%`,
              transform: 'translate(-50%, -50%)',
              ...(field.id === 'name' && {
                fontFamily: "'DFVN Menata', sans-serif",
              }),
              fontSize: `${field.size}px`,
              color: '#2c2c2c',
              textShadow: '1px 1px 3px rgba(255,255,255,0.7)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            };

            if (field.type === 'text') {
              return (
                <div key={field.id} style={baseStyle}>
                  {value}
                </div>
              );
            }

            if (field.type === 'image') {
              // Tạo previewUrl ngay tại đây
              let previewUrl = '';
              if (typeof value === 'string') {
                previewUrl = value;
              } else if (value instanceof File) {
                previewUrl = URL.createObjectURL(value);
              }

              if (!previewUrl) return null;

              return (
                <div key={field.id} style={baseStyle}>
                  <Image
                    src={previewUrl}
                    alt={field.label || field.id}
                    width={0}
                    height={0}
                    style={{
                      maxWidth: `${field.size}px`,
                      maxHeight: `${field.size}px`,
                      width: 'auto',
                      height: 'auto',
                    }}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </main>
  );
}
