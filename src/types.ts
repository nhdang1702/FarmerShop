import { Database } from "./database.types";
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
  export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];



export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
  description: string | null;
  farm_id: number | null;

};

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  quantity: number;
  farm_id: number | null;
};

export const OrderStatusList: OrderStatus[] = [
  'New',
  'Shipping',
  'Completed',
];

export type FarmItem ={
  id: number,
  name: string,
  image: string,
  address: string,
  description: string,
  user_id: number,
  product_item?: Product[];

}

export type OrderStatus = 'New' | 'Shipping' | 'Completed';

export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: number;
  status: OrderStatus;

  order_items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  quantity: number;
};

export type Profile = {
  id: number;
  group: string;
};
