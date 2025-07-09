'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Building,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - redirect to dashboard
    window.location.href = '/admin/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-20 w-16 h-16 bg-orange-200/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-20 right-20 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"
      />

      <div className="w-full max-w-md relative z-10">
        <FadeIn>
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Building className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">IQI Admin Portal</h1>
            <p className="text-muted-foreground">
              Đăng nhập để quản lý hệ thống
            </p>
          </div>
        </FadeIn>

        <ScaleIn delay={0.2}>
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2 text-orange-600" />
                Đăng nhập
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Nhập thông tin đăng nhập của bạn
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="email"
                        placeholder="admin@iqi.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Mật khẩu</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          rememberMe: checked as boolean,
                        })
                      }
                    />
                    <label htmlFor="remember" className="text-sm">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <Link
                    href="/admin/forgot-password"
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    size="lg"
                  >
                    Đăng nhập
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </form>

              {/* Demo Accounts */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="text-sm font-semibold mb-2">Demo Accounts:</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Admin:</span>
                    <span className="font-mono">admin@iqi.com / admin123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Manager:</span>
                    <span className="font-mono">
                      manager@iqi.com / manager123
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Staff:</span>
                    <span className="font-mono">staff@iqi.com / staff123</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScaleIn>

        {/* Footer */}
        <FadeIn delay={0.4}>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Cần hỗ trợ?{' '}
              <Link
                href="/contact"
                className="text-orange-600 hover:text-orange-700"
              >
                Liên hệ IT Support
              </Link>
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <Badge variant="outline" className="text-xs">
                v2.1.0
              </Badge>
              <Badge variant="outline" className="text-xs">
                Secure
              </Badge>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
