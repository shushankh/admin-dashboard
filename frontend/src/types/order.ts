export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  createdAt: string;
}
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
