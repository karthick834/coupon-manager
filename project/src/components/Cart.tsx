import React, { useState } from 'react';
import { ShoppingCart, Tag } from 'lucide-react';
import type { CartItem, Coupon } from '../types';

interface CartProps {
  items: CartItem[];
  coupons: Coupon[];
}

export function Cart({ items, coupons }: CartProps) {
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [error, setError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const appliedCoupon = coupons.find(
    (coupon) => coupon.code === appliedCouponCode && coupon.isActive
  );

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percentage') {
      return (subtotal * appliedCoupon.discount) / 100;
    }
    return appliedCoupon.discount;
  };

  const discount = calculateDiscount();
  const total = subtotal - discount;

  const applyCoupon = () => {
    const coupon = coupons.find((c) => c.code === couponInput.toUpperCase());
    if (!coupon) {
      setError('Invalid coupon code');
      return;
    }
    if (!coupon.isActive) {
      setError('This coupon is inactive');
      return;
    }
    if (new Date(coupon.validUntil) < new Date()) {
      setError('This coupon has expired');
      return;
    }
    setAppliedCouponCode(coupon.code);
    setCouponInput('');
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <ShoppingCart className="w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-2 border-b">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        
        <div className="pt-4">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5" />
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Apply
            </button>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {appliedCoupon && (
            <p className="text-green-600 text-sm mt-2">
              Coupon {appliedCoupon.code} applied successfully!
            </p>
          )}
        </div>
        
        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}