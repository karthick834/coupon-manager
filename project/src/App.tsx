import React, { useState } from 'react';
import { CouponForm } from './components/CouponForm';
import { CouponList } from './components/CouponList';
import { Cart } from './components/Cart';
import type { Coupon, CartItem } from './types';

// Sample cart items
const sampleItems: CartItem[] = [
  { id: '1', name: 'Product 1', price: 99.99, quantity: 1 },
  { id: '2', name: 'Product 2', price: 49.99, quantity: 2 },
  { id: '3', name: 'Product 3', price: 29.99, quantity: 1 },
];

function App() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const handleAddCoupon = (newCoupon: Omit<Coupon, 'id'>) => {
    setCoupons([
      ...coupons,
      {
        ...newCoupon,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  const handleToggleCoupon = (id: string) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === id ? { ...coupon, isActive: !coupon.isActive } : coupon
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Coupon Manager</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CouponForm onAddCoupon={handleAddCoupon} />
            <CouponList
              coupons={coupons}
              onDeleteCoupon={handleDeleteCoupon}
              onToggleCoupon={handleToggleCoupon}
            />
          </div>
          
          <div>
            <Cart items={sampleItems} coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;