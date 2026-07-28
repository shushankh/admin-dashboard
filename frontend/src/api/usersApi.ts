import api from "./axios";
import type { User } from "../types/user";

export interface CreateUserData {
  name: string;
  email: string;
  role: User["role"];
  status: User["status"];
}
export interface UpdateUserData {
  name: string;
  email: string;
  role: User["role"];
  status: User["status"];
}

export const updateUser = async (
  id: number,
  user: UpdateUserData,
): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, user);

  return response.data;
};
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");

  return response.data;
};

export const createUser = async (user: CreateUserData): Promise<User> => {
  const response = await api.post<User>("/users", user);

  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
