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

export interface Token {
  token: string;
}

export interface SignupPayload {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface Cart {
  id: string;
  userId: string;
  productsId: string[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}
