export interface IProduct {
  id?: number;
  title: string;
  description?: string;
  price: number;
  discount?: number;
  quantity: number;
  image_url: string;
  created_at?: Date;
  updated_at?: Date;
  vendor?: string;
  product_type?: string;
}