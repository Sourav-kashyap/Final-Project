export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export interface Brand {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  categoryId: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  stock: number;
  images?: string[];
  categoryId: string;
  brandId: string;
}
