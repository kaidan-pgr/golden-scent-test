export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  notes: string[];
  gender: "Damskie" | "Męskie" | "Unisex";
  brand: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export interface OrderItem {
  id: number;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}
