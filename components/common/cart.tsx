'use client';

import { CheckCircle, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { useState } from 'react';
import { OrderFormDialog } from '@/app/(main)/merchandise/components/OrderFormDialog';
import { Badge } from '@/components/ui/badge';

export function Cart({ isDark }: any) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'relative hover:bg-orange-300/10 dark:hover:bg-orange-900/20 bg-transparent',
            isDark
              ? 'text-white border-white/60 hover:text-white'
              : 'text-black dark:text-white border-black/30 dark:border-white/60'
          )}
        >
          <ShoppingCart className="h-[1.2rem] w-[1.2rem] transition-all" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 px-1.5 center-both bg-orange-600 text-white text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="md:min-w-[400px] bg-card mt-6"
      >
        <div className="p-4 border-b">
          <h3 className="font-semibold">Giỏ hàng ({totalItems} sản phẩm)</h3>
        </div>

        {items.length === 0 ? (
          <div className="p-6 text-center">
            <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-sm">Giỏ hàng trống</p>
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto">
              {items.map((item: any) => (
                <div key={item.id} className="p-3 border-b last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <img
                      src={item.images[0] || '/placeholder.svg'}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
                      <div>
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-orange-600">
                          {item.price.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-2">
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() =>
                              updateQuantity?.(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1} // disable khi số lượng <= 1
                          >
                            <Minus className="w-3 h-3" />
                          </Button>

                          <input
                            type="number"
                            min={1}
                            className="text-center text-sm border rounded-md dark:bg-transparent px-2"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              if (value > 0) updateQuantity?.(item.id, value);
                            }}
                            style={{
                              width: `calc(${Math.max(1, String(item.quantity ?? '').length)}ch + 2rem)`,
                              maxWidth: '3rem',
                            }}
                          />

                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() =>
                              updateQuantity?.(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= 999} // ví dụ giới hạn tối đa 999
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => removeFromCart?.(item.id)}
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-foreground">
                  Tổng cộng:
                </span>
                <span className="font-bold text-orange-600">
                  {totalPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>
              <Button
                onClick={() => setShowOrderForm(true)}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Thanh toán
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>

      <OrderFormDialog
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
        cart={items}
        onOrderSuccess={clearCart}
      />
    </DropdownMenu>
  );
}
