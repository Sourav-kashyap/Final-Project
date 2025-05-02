export interface Login {
  email: string;
  password: string;
}

export interface Signup {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Token {
  token: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions?: string[];
}

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export interface Product {
  id: string;
  description: string;
  price: number;
  image: string[];
  categotyId: string;
  category: Category;
}

export interface Order {
  id: string;
  date: string;
  items: string[];
  status: number;
}

export interface Wishlist {
  id: string;
  userId: string;
  productsId: string[];
}

export interface Cart {
  id: string;
  userId: string;
  productsId: string[];
}

export interface Brand {
  id: string;
  name: string;
}
