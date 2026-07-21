import type { User } from "../../types/user";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Ram",
    email: "ram123@example.com",
    role: "admin",
    status: "active",
    createdAt: "2023-05-09",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "manager",
    status: "active",
    createdAt: "2026-07-05",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "staff",
    status: "inactive",
    createdAt: "2026-07-10",
  },
];
