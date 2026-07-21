
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdAt: string;
  category: ProductCategory;
  status: ProductStatus;
}
export type ProductCategory = "electronics" | "clothing" | "food" | "other";
export type ProductStatus = "active" | "inactive";

