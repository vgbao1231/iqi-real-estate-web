'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import {
  Award,
  TrendingUp,
  Users,
  Globe,
  MapPin,
  DollarSign,
  Check,
  ArrowRight,
  Upload,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import OutroSection from '@/app/(main)/components/outro-section';
import { useTheme } from 'next-themes';
import Header from '@/app/(main)/layout/header';
import { useGetAllJobQuery } from '@/features/job/jobApi';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';

export default function CareersPage() {
  const { data: jobs = [], isLoading } = useGetAllJobQuery();
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState<any>({
    fullName: '',
    email: '',
    phone: '',
    cvFile: null, // Đây là đối tượng File gốc (hiện tại)
    cvBase64Data: null, // THÊM: Chuỗi Base64 đã chuyển đổi
    cvFileName: null, // THÊM: Tên file
    cvMimeType: null, // THÊM: Loại MIME
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleApplicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplicationData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64DataUrl: any = await toBase64(file);

        // Phân tích Data URL (data:mime/type;base64,DATA)
        const base64Content = base64DataUrl.split(',')[1];
        const mimeTypeMatch = base64DataUrl.match(/:(.*?);/);
        const mimeType = mimeTypeMatch
          ? mimeTypeMatch[1]
          : 'application/octet-stream';

        setApplicationData((prev: any) => ({
          ...prev,
          cvFile: file, // Giữ lại đối tượng File gốc để hiển thị tên và xóa
          cvBase64Data: base64Content, // Lưu Base64
          cvFileName: file.name, // Lưu Tên File
          cvMimeType: mimeType, // Lưu MIME Type
        }));
      } catch (error) {
        console.error('Lỗi khi chuyển file sang Base64:', error);
        // Xử lý lỗi nếu cần
      }
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !applicationData.fullName ||
      !applicationData.email ||
      !applicationData.phone ||
      !applicationData.cvFile
    ) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setIsSubmitting(true);

    try {
      try {
        // 1. Tạo Payload cơ bản
        const payload: any = {
          fullName: applicationData.fullName,
          email: applicationData.email,
          phone: applicationData.phone,
          job: selectedJob.title,

          // Dữ liệu Base64 đã xử lý
          fileData: applicationData.cvBase64Data, // ⬅️ Dùng các key này để khớp với e.parameter
          fileName: applicationData.cvFileName,
          mimeType: applicationData.cvMimeType,
        };

        // 2. Chuyển Payload thành URLSearchParams
        const params = new URLSearchParams();
        for (const key in payload) {
          // Đảm bảo Base64 (có thể rất dài) được gửi đi
          if (payload[key] !== null && payload[key] !== undefined) {
            params.append(key, payload[key]);
          }
        }

        // 2. Cập nhật fetch để sử dụng FormData
        const response = await fetch(
          process.env.NEXT_PUBLIC_WEB_APP_URL_JOB as string,
          {
            method: 'POST',
            body: params,
          }
        );

        // ... (Phần xử lý response giữ nguyên)
        if (response.ok) {
          const result = await response.json();
          if (result.result === 'success') {
            toast.success(
              'Gửi thông tin thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.'
            );

            setApplicationData({
              fullName: '',
              phone: '',
              email: '',
              cvFile: null,
            });
            setShowApplicationForm(false);
          } else {
            throw new Error(result.message || 'Lỗi từ Google Script.');
          }
        } else {
          throw new Error('Kết nối máy chủ thất bại.');
        }
      } catch (error) {
        console.error('Lỗi gửi form:', error);
        alert('Đã xảy ra lỗi. Vui lòng kiểm tra console hoặc thử lại sau.');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header heroId="intro" />

      <section className="w-full relative overflow-hidden pt-16 md:pt-24">
        <div
          className={`absolute inset-0 bg-gradient-to-br dark:from-slate-900 dark:via-orange-900 dark:to-slate-900 from-orange-50 via-orange-100 to-amber-50"`}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient
                id="waveGrad1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={isDark ? '#ff6b35' : '#f97316'}
                  stopOpacity={isDark ? '0.8' : '0.6'}
                />
                <stop
                  offset="50%"
                  stopColor={isDark ? '#f7931e' : '#fb923c'}
                  stopOpacity={isDark ? '0.6' : '0.5'}
                />
                <stop
                  offset="100%"
                  stopColor={isDark ? '#c1272d' : '#ea580c'}
                  stopOpacity={isDark ? '0.4' : '0.3'}
                />
              </linearGradient>
              <linearGradient
                id="waveGrad2"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor={isDark ? '#f7931e' : '#fb923c'}
                  stopOpacity={isDark ? '0.5' : '0.4'}
                />
                <stop
                  offset="100%"
                  stopColor={isDark ? '#ff6b35' : '#f97316'}
                  stopOpacity={isDark ? '0.3' : '0.2'}
                />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Animated wavy lines creating 3D effect */}
            <g opacity={isDark ? '0.9' : '0.7'}>
              <path
                d="M 0,150 Q 150,100 300,150 T 600,150 T 900,150 T 1200,150"
                stroke="url(#waveGrad1)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
                className="animate-pulse"
              />
              <path
                d="M 0,200 Q 150,250 300,200 T 600,200 T 900,200 T 1200,200"
                stroke="url(#waveGrad2)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#glow)"
                opacity={isDark ? '0.7' : '0.5'}
              />
              <path
                d="M 0,250 Q 200,200 400,250 T 800,250 T 1200,250"
                stroke="url(#waveGrad1)"
                strokeWidth="2"
                fill="none"
                filter="url(#glow)"
                opacity={isDark ? '0.5' : '0.4'}
              />
              <path
                d="M 0,300 Q 150,350 300,300 T 600,300 T 900,300 T 1200,300"
                stroke="url(#waveGrad2)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
                opacity={isDark ? '0.6' : '0.5'}
              />
              <path
                d="M 0,350 Q 200,300 400,350 T 800,350 T 1200,350"
                stroke="url(#waveGrad1)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#glow)"
                opacity={isDark ? '0.4' : '0.3'}
              />
              <path
                d="M 0,400 Q 150,450 300,400 T 600,400 T 900,400 T 1200,400"
                stroke="url(#waveGrad2)"
                strokeWidth="2"
                fill="none"
                filter="url(#glow)"
                opacity={isDark ? '0.5' : '0.4'}
              />
            </g>

            {/* Geometric accent shapes */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="url(#waveGrad1)"
              opacity={isDark ? '0.15' : '0.1'}
            />
            <circle
              cx="1100"
              cy="500"
              r="120"
              fill="url(#waveGrad2)"
              opacity={isDark ? '0.1' : '0.08'}
            />
            <rect
              x="600"
              y="50"
              width="150"
              height="150"
              fill="url(#waveGrad1)"
              opacity={isDark ? '0.08' : '0.06'}
              transform="rotate(45 675 125)"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-6 pb-8">
              <div>
                <h2
                  className={`text-4xl md:text-5xl font-bold  mb-4 text-balance`}
                >
                  Tại sao chọn IQI Vietnam?
                </h2>
                <p className={`text-lg leading-relaxed`}>
                  Gia nhập IQI Vietnam và trở thành một phần của cộng đồng
                  chuyên gia bất động sản hàng đầu. Chúng tôi cung cấp đào tạo
                  toàn diện, hỗ trợ liên tục, và cơ hội phát triển sự nghiệp
                  không giới hạn.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <p className="text-base flex items-center gap-2">
                    <Check /> Đào tạo chuyên nghiệp và hỗ trợ 24/7 từ các chuyên
                    gia
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="text-base flex items-center gap-2">
                    <Check /> Cơ hội kiếm thu nhập cao với hoa hồng cạnh tranh
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <p className="text-base flex items-center gap-2">
                    <Check /> Môi trường làm việc năng động và đầy cơ hội phát
                    triển
                  </p>
                </div>
                <Button
                  className={`${isDark ? 'bg-white text-orange-600 hover:bg-orange-50' : 'bg-orange-600 text-white hover:bg-orange-700'} font-semibold px-8 py-4 text-base rounded-full`}
                >
                  Ứng tuyển ngay
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:justify-end self-end">
              <div className="relative w-full max-w-sm">
                <Image
                  src="/leaders/vo-thanh-truc.png"
                  alt="IQI Professional"
                  width={400}
                  height={500}
                  className="w-full md:h-[60vh] h-[40vh] object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose IQI */}
      <section className="py-16 md:px-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Đào tạo chuyên nghiệp',
                desc: 'Chương trình đào tạo 6 tháng với chứng chỉ quốc tế, mentor 1-1',
                color: 'text-orange-600',
                bg: 'bg-orange-100 dark:bg-orange-900/30',
              },
              {
                icon: TrendingUp,
                title: 'Thu nhập hấp dẫn',
                desc: 'Lương cơ bản + hoa hồng cao + thưởng hiệu suất + phụ cấp',
                color: 'text-green-600',
                bg: 'bg-green-100 dark:bg-green-900/30',
              },
              {
                icon: Users,
                title: 'Môi trường năng động',
                desc: 'Đội ngũ trẻ, sáng tạo, văn hóa hỗ trợ và phát triển lẫn nhau',
                color: 'text-blue-600',
                bg: 'bg-blue-100 dark:bg-blue-900/30',
              },
              {
                icon: Globe,
                title: 'Cơ hội quốc tế',
                desc: 'Làm việc với dự án quốc tế, cơ hội du lịch và học hỏi',
                color: 'text-purple-600',
                bg: 'bg-purple-100 dark:bg-purple-900/30',
              },
            ].map((item, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${item.bg} rounded-full center-both mx-auto mb-4`}
                      >
                        <item.icon className={`w-8 h-8 ${item.color}`} />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Training Program */}
      <section className="py-16 md:px-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-7 gap-12 items-center">
            <SlideIn direction="left" className="col-span-3">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  PHÚC LỢI & CƠ HỘI ĐỘC QUYỀN
                </h2>
                <p className="text-muted-foreground mb-6">
                  IQI Vietnam Cam Kết Cung Cấp Môi Trường Phát Triển Bền Vững
                  Với Những Lợi Ích Khác Biệt Dẫn Đầu Ngành:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full center-both flex-shrink-0">
                      <span className="text-orange-600 font-bold text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Phát Triển Kỹ Năng Bứt Phá
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Hệ thống đào tạo toàn diện, truy cập hơn 500+ khóa học
                        miễn phí qua IQI Academy 24/7.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full center-both flex-shrink-0">
                      <span className="text-orange-600 font-bold text-sm">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Ghi Nhận Xứng Tầm Thế Giới
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Trải nghiệm đẳng cấp với các chuyến du lịch nước ngoài
                        5* phong cách &quot;IQI&quot; dành cho các cá nhân xuất
                        sắc.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full center-both flex-shrink-0">
                      <span className="text-orange-600 font-bold text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Tốc Độ Thanh Toán Kỷ Lục
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Cam kết thanh toán hoa hồng trong VÒNG 07 NGÀY ngay sau
                        khi giao dịch thành công – Tối ưu dòng tiền cho Agent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right" className="col-span-4">
              <div className="center-both">
                <Image
                  src="/why-iqi-1.jpg"
                  alt="Training Program"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="jobs" className="py-16 md:px-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vị trí đang tuyển dụng
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Khám phá các cơ hội nghề nghiệp hấp dẫn tại IQI Vietnam
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <ScaleIn key={job.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {job.title}
                          </CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {job.department}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {job.description}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <DollarSign className="w-4 h-4 mr-2 text-orange-600" />
                          <span className="font-semibold text-orange-600">
                            {job.salary}
                          </span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">
                          YÊU CẦU:
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                          {job.requirements
                            .slice(0, 2)
                            .map((req: any, i: any) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          {job.requirements.length > 2 && (
                            <li className="text-orange-600 font-semibold">
                              +{job.requirements.length - 2} yêu cầu khác
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="w-full bg-orange-600 hover:bg-orange-700 group"
                          onClick={() => {
                            setSelectedJob(job);
                            setShowJobDetail(true);
                          }}
                        >
                          Xem chi tiết
                          <ArrowRight className="w-4 h-4 ml-0 group-hover:ml-2 transition-all" />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedJob(job);
                            setShowApplicationForm(true);
                          }}
                        >
                          Ứng tuyển
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Job Details Dialog */}
      <Dialog
        open={!!showJobDetail}
        onOpenChange={(open) => !open && setShowJobDetail(false)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedJob.title}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {selectedJob.department}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Job Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">
                        ĐỊA ĐIỂM
                      </p>
                      <p className="font-medium">{selectedJob.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">
                        MỨC LƯƠNG
                      </p>
                      <p className="font-medium text-orange-600">
                        {selectedJob.salary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Mô tả công việc</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="font-semibold mb-3">Yêu cầu</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req: any, i: any) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-orange-600 font-bold flex-shrink-0">
                          •
                        </span>
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="font-semibold mb-3">Quyền lợi</h3>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((benefit: any, i: any) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-green-600 font-bold flex-shrink-0">
                          ✓
                        </span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Ứng tuyển ngay
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowJobDetail(false)}
                  >
                    Đóng
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Form Dialog */}
      <Dialog
        open={showApplicationForm}
        onOpenChange={(open) => !open && setShowApplicationForm(false)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ứng tuyển vị trí</DialogTitle>
            <DialogDescription>{selectedJob?.title}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Họ và tên *
              </label>
              <Input
                placeholder="Nhập họ và tên"
                name="fullName"
                value={applicationData.fullName}
                onChange={handleApplicationChange}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Số điện thoại *
              </label>
              <Input
                type="tel"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={applicationData.phone}
                onChange={handleApplicationChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-2 block">Email *</label>
              <Input
                type="email"
                placeholder="Nhập email"
                name="email"
                value={applicationData.email}
                onChange={handleApplicationChange}
              />
            </div>

            {/* CV File Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Tải lên CV *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="cv-upload"
                />
                <label
                  htmlFor="cv-upload"
                  className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-orange-600 transition-colors"
                >
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {applicationData.cvFile
                      ? applicationData.cvFile.name
                      : 'Chọn file CV (PDF, DOC, DOCX)'}
                  </span>
                </label>
              </div>
              {applicationData.cvFile && (
                <div className="mt-2 flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded">
                  <span className="text-sm text-muted-foreground truncate">
                    {applicationData.cvFile.name}
                  </span>
                  <button
                    onClick={() =>
                      setApplicationData((prev: any) => ({
                        ...prev,
                        cvFile: null,
                      }))
                    }
                    className="text-muted-foreground hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                className="flex-1 bg-orange-600 hover:bg-orange-700"
                onClick={handleApplicationSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi ứng tuyển'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowApplicationForm(false);
                  setApplicationData({
                    fullName: '',
                    email: '',
                    phone: '',
                    cvFile: null,
                  });
                }}
              >
                Hủy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact CTA */}
      <OutroSection
        title="Sẵn sàng gia nhập IQI Vietnam?"
        subtitle="Gửi CV của bạn hoặc liên hệ với chúng tôi để tìm hiểu thêm về các cơ hội nghề nghiệp"
        primary={{
          label: 'Gửi CV ngay',
          href: '/career',
        }}
        secondary={{
          label: 'Liên hệ HR',
          href: '/contact',
        }}
      />
    </div>
  );
}
