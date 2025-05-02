export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  images?: string[];
  categoryId: string;
  brandId: string;
}
