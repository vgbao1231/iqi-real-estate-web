'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, User, Mail, Clock } from 'lucide-react';
import { useOTP } from '@/hooks/use-otp';
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from '@/features/auth/authApi';
import { toast } from 'react-toastify';

interface OrderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: any[];
  onOrderSuccess: () => void;
}

export function OrderFormDialog({
  open,
  onOpenChange,
  cart,
  onOrderSuccess,
}: OrderFormDialogProps) {
  const [orderForm, setOrderForm] = useState<any>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
    otp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { provinces, districts } = useSelector(
  //   (state: RootState) => state.location
  // );
  const [sendOtp, { isLoading: isSendingOtp, isSuccess }] =
    useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

  const { otpCountdown, resetOTP } = useOTP();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSendOtp = async () => {
    try {
      await sendOtp({ email: orderForm.email });
    } catch (e) {
      console.error(e);
      toast.error('Gửi OTP thất bại, vui lòng thử lại');
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await verifyOtp({
        email: orderForm.email,
        otp: orderForm.otp,
      }).unwrap();
    } catch (error) {
      console.error('Lỗi xác thực OTP:', error);
      return;
    }

    if (cart.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        ...orderForm,
        items: cart,
        total: getTotalPrice(),
        orderDate: new Date().toISOString(),
        orderId: `IQI-${Date.now()}`,
      };

      // console.log('Order submitted:', orderData);

      const payload: any = {
        fullName: orderData.fullName,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        note: orderData.note,
        items: JSON.stringify(orderData.items || []),
      };

      const params = new URLSearchParams();
      for (const key in payload) {
        // Kiểm tra nếu giá trị không rỗng thì thêm vào params
        if (payload[key]) {
          params.append(key, payload[key]);
        }
      }

      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_WEB_APP_URL_ORDER as string,
          {
            method: 'POST',
            body: params,
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result.result === 'success') {
            toast.success(
              'Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.'
            );

            // Reset form
            setOrderForm({
              fullName: '',
              phone: '',
              email: '',
              address: '',
              city: '',
              district: '',
              ward: '',
              note: '',
              otp: '',
            });
            resetOTP();
            onOrderSuccess();
            onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] md:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Thông tin đặt hàng
          </DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để chúng tôi có thể liên hệ và giao
            hàng
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleOrderSubmit}
          className="space-y-4 overflow-auto max-h-112 p-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Họ và tên *</Label>
              <Input
                id="fullName"
                value={orderForm.fullName}
                onChange={(e) =>
                  setOrderForm((prev: any) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                type="tel"
                value={orderForm.phone}
                onChange={(e) =>
                  setOrderForm((prev: any) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>

          {/* Email and OTP Section */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            <Label className="flex items-center mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Xác thực email *
            </Label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  name="email"
                  value={orderForm.email}
                  onChange={(e) =>
                    setOrderForm((prev: any) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Nhập email của bạn"
                  required
                  disabled={isSendingOtp}
                />
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!orderForm.email || isSendingOtp}
                  variant="outline"
                >
                  {isSendingOtp ? 'Đang gửi' : 'Gửi OTP'}
                </Button>
              </div>

              {isSuccess && (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      value={orderForm.otp}
                      onChange={(e) =>
                        setOrderForm((prev: any) => ({
                          ...prev,
                          otp: e.target.value,
                        }))
                      }
                      placeholder="Nhập mã OTP (6 số)"
                      maxLength={6}
                      required
                    />
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpCountdown > 0}
                      variant="ghost"
                      size="sm"
                    >
                      {otpCountdown > 0 ? (
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {Math.floor(otpCountdown / 60)}:
                          {(otpCountdown % 60).toString().padStart(2, '0')}
                        </div>
                      ) : (
                        'Gửi lại'
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra hộp
                    thư.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="address">Địa chỉ *</Label>
            <Input
              id="address"
              value={orderForm.address}
              onChange={(e) =>
                setOrderForm((prev: any) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              placeholder="Số nhà, tên đường"
              required
            />
          </div>

          <div>
            <Label htmlFor="note">Ghi chú</Label>
            <Textarea
              id="note"
              value={orderForm.note}
              onChange={(e) =>
                setOrderForm((prev: any) => ({
                  ...prev,
                  note: e.target.value,
                }))
              }
              placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
              rows={3}
            />
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            <h4 className="font-medium mb-3">Tóm tắt đơn hàng</h4>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Tổng cộng:</span>
                <span className="text-orange-600">
                  {getTotalPrice().toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleOrderSubmit}
            disabled={isSubmitting || isVerifyingOtp || isSendingOtp}
            className="min-w-[120px] bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Đặt hàng
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
