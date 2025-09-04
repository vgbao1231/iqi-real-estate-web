'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '@/features/cart/cartSlice';

export function useCart() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return {
    items,
    totalItems,
    totalPrice,
    addToCart: (item: any) => dispatch(addToCart(item)),
    updateQuantity: (id: string, quantity: number) =>
      dispatch(updateQuantity({ id, quantity })),
    removeFromCart: (id: string) => dispatch(removeFromCart(id)),
    clearCart: () => dispatch(clearCart()),
  };
}
