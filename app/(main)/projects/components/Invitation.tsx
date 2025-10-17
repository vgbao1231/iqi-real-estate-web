'use client';

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Header from '@/app/(main)/layout/header';
import { useGetPublicProjectTabByIdQuery } from '@/features/project/projectApi';
import { FileUpload } from '@/components/ui/file-upload';
import { domToPng } from 'modern-screenshot';
import { Plus } from 'lucide-react';

export default function Invitation() {
  const [exportedImage, setExportedImage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [scaleFactor, setScaleFactor] = useState<number>(1);

  const params = useParams();
  const { data: other = {} } = useGetPublicProjectTabByIdQuery({
    id: params.id as string,
    tab: 'other',
  });

  const { invitation = {} } = other as any;
  const invitationImage = invitation?.invitationImage ?? null;

  // State lưu dữ liệu form
  const [formData, setFormData] = useState<Record<string, any>>({
    name: 'Võ Gia Bảo',
    phone: '0911095800',
    title: 'Lập trình viên',
  });

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

  useEffect(() => {
    const calculateScale = () => {
      if (imageRef.current) {
        const referenceWidth = 800;
        const displayedWidth = imageRef.current.clientWidth;
        const scale = displayedWidth / referenceWidth;
        setScaleFactor(scale);
      }
    };

    if (invitation.invitationImage) {
      const img = imageRef.current;
      if (img) {
        if (img.complete) {
          calculateScale();
        } else {
          img.addEventListener('load', calculateScale);
        }
      }

      window.addEventListener('resize', calculateScale);

      return () => {
        window.removeEventListener('resize', calculateScale);
        if (img) {
          img.removeEventListener('load', calculateScale);
        }
      };
    }
  }, [invitation.invitationImage]);

  // Export ra ảnh
  const handleExport = async () => {
    if (!previewRef.current) return;

    setIsLoading(true);
    try {
      await document.fonts.ready;
      const dataUrl = await domToPng(previewRef.current, {
        scale: 3,
        quality: 1,
        backgroundColor: '#fff',
      });
      setExportedImage(dataUrl);
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
        <div className="relative overflow-hidden center-both mt-20">
          <Image
            src={exportedImage}
            alt="Invitation background"
            width={800} // đặt width lớn để Next xử lý responsive
            height={800} // đặt height tạm, sẽ scale theo ảnh thật
            className="object-contain max-h-[80vh]"
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
                    <FileUpload
                      key={field.id}
                      placeholder={
                        <div className="text-center">
                          <p className="text-sm text-white/80 font-medium">
                            {formData.image?.name || field.label}
                          </p>
                          <p className="text-xs text-white/60 mt-1">
                            {formData.image?.name
                              ? 'Nhấn để thay đổi'
                              : 'PNG, JPG, GIF tối đa 10MB'}
                          </p>
                        </div>
                      }
                      value={formData[field.id]}
                      className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg p-4 hover:bg-white/20 transition-all duration-200 border-solid"
                      onChange={(file) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.id]: file,
                        }))
                      }
                    />
                  );
                }

                return null;
              })}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-sm font-semibold text-white shadow-lg transition-all mt-6 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:from-gray-600 disabled:hover:to-gray-600"
              >
                {isLoading ? 'Đang tạo' : 'Tạo thiệp mới'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Preview ẩn để sau khi submit thì tạo canva thiệp mời */}
      {/* <div className="absolute inset-0 z-20 center-both opacity-1"> */}
      <div className="absolute inset-0 -z-20 center-both opacity-0">
        <div ref={previewRef} className="relative w-fit overflow-hidden">
          {invitationImage && (
            <Image
              ref={imageRef}
              src={invitationImage?.url}
              alt="Invitation background"
              width={800}
              height={800}
              priority
              className="object-contain w-auto max-h-[80vh]"
            />
          )}

          {/* Render text theo từng field */}
          {invitation.fields.map((field: any) => {
            return (
              <FieldPreview
                key={field.id}
                field={field}
                scaleFactor={scaleFactor}
                formData={formData}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

const FieldPreview = memo(function FieldPreview({
  field,
  scaleFactor,
  formData,
}: any) {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${field.position.x}%`,
    top: `${field.position.y}%`,
    transform: 'translate(-50%, -50%)',
    fontFamily: field.fontFamily,
    fontSize: `${field.size * scaleFactor}px`,
    color: '#2c2c2c',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  };

  if (field.type === 'image') {
    return (
      <Image
        src={
          formData[field.id] instanceof File
            ? URL.createObjectURL(formData[field.id])
            : formData[field.id]
        }
        alt={field.label ?? 'image'}
        width={0}
        height={0}
        priority
        className="object-contain w-full"
        style={{
          ...baseStyle,
          maxWidth: `${field.size * scaleFactor}px`,
        }}
      />
    );
  }

  return <div style={baseStyle}>{formData[field.id]}</div>;
});
