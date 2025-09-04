'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useOTP() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // OTP countdown timer
  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  const sendOTP = async (email: string) => {
    if (!email) {
      toast.error('Vui lòng nhập email');
      return;
    }

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setOtpCountdown(300); // 5 minutes
        toast.success(`${data.message}. OTP demo: ${data.otp}`);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi gửi OTP');
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    if (!otp) {
      toast.error('Vui lòng nhập mã OTP');
      return false;
    }

    setIsVerifyingOtp(true);

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Xác thực email thành công!');
        return true;
      } else {
        toast.error(data.error);
        return false;
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xác thực OTP');
      return false;
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const resetOTP = () => {
    setOtpSent(false);
    setOtpCountdown(0);
  };

  return {
    otpSent,
    otpCountdown,
    isVerifyingOtp,
    sendOTP,
    verifyOTP,
    resetOTP,
  };
}
