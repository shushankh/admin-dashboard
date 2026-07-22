import { Button, Input, Space } from "antd";

import { useState } from "react";

import type { User } from "../../types/user";

import { mockUsers } from "../../features/users/mockUsers";

import UserTable from "../../features/users/components/UserTable";

import UserFormModal from "../../features/users/components/UserFormModal";

function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
  };

  const handleSubmitUser = (values: {
    name: string;
    email: string;
    role: User["role"];
    status: User["status"];
  }) => {
    if (editingUser) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...values,
              }
            : user,
        ),
      );
    } else {
      const newUser: User = {
        id: Date.now(),
        ...values,
        createdAt: new Date().toISOString(),
      };

      setUsers((currentUsers) => [...currentUsers, newUser]);
    }

    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

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
