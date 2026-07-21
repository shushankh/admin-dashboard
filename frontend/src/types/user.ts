export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}
export type UserRole = "admin" | "manager" | "staff";
export type UserStatus = "active" | "inactive" | "banned";
