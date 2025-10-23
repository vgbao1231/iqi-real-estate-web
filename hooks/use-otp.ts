'use client';

import { useState, useEffect } from 'react';

export function useOTP() {
  const [otpCountdown, setOtpCountdown] = useState(0);

  // OTP countdown timer
  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  const resetOTP = () => {
    setOtpCountdown(0);
  };

  return {
    otpCountdown,
    resetOTP,
  };
}
