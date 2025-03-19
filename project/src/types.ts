export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validUntil: string;
  description: string;
  isActive: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}