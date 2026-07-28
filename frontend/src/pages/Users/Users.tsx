import { Button, Input, Space } from "antd";
import { useState } from "react";

import type { User } from "../../types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import UserTable from "../../features/users/components/UserTable";
import UserFormModal from "../../features/users/components/UserFormModal";

import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../../api/usersApi";

function Users() {
  // Get users from backend
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const queryClient = useQueryClient();

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      // Tell TanStack Query to fetch users again
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      // Close modal
      setEditingUser(null);
      setIsModalOpen(false);
    },
  });
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
  const updateUserMutation = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: number;
      values: {
        name: string;
        email: string;
        role: User["role"];
        status: User["status"];
      };
    }) => updateUser(id, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      setEditingUser(null);
      setIsModalOpen(false);
    },
  });
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Search users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Delete -
  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  // Submit add/edit form
  const handleSubmitUser = (values: {
    name: string;
    email: string;
    role: User["role"];
    status: User["status"];
  }) => {
    if (editingUser) {
      updateUserMutation.mutate({
        id: editingUser.id,
        values,
      });
    } else {
      createUserMutation.mutate(values);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>Failed to load users.</div>;
  }

  return (
    <div>
      <h1
        style={{
          marginBottom: "24px",
        }}
      >
        Users
      </h1>

      <Space
        style={{
          marginBottom: "16px",
        }}
      >
        <Input
          placeholder="Search users"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{
            width: 300,
          }}
        />

        <Button type="primary" onClick={handleOpenAddModal}>
          Add User
        </Button>
      </Space>

      <UserTable
        users={filteredUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <UserFormModal
        open={isModalOpen}
        editingUser={editingUser}
        onSubmit={handleSubmitUser}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Users;
