import React from 'react';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';
import type { Coupon } from '../types';

interface CouponListProps {
  coupons: Coupon[];
  onDeleteCoupon: (id: string) => void;
  onToggleCoupon: (id: string) => void;
}

export function CouponList({ coupons, onDeleteCoupon, onToggleCoupon }: CouponListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Available Coupons</h2>
        <div className="space-y-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`border rounded-lg p-4 ${
                coupon.isActive ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onToggleCoupon(coupon.id)}
                    className={`p-1 rounded-full ${
                      coupon.isActive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {coupon.isActive ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <XCircle className="w-6 h-6" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-medium">{coupon.code}</h3>
                    <p className="text-sm text-gray-600">{coupon.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => onDeleteCoupon(coupon.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Discount: </span>
                  {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                </div>
                <div>
                  <span className="font-medium">Valid Until: </span>
                  {new Date(coupon.validUntil).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
          {coupons.length === 0 && (
            <p className="text-center text-gray-500">No coupons available</p>
          )}
        </div>
      </div>
    </div>
  );
}