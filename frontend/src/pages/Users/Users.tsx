import type { User } from "../../types/user";
import { mockUsers } from "../../features/users/mockUsers";
import type { ColumnType } from "antd/es/table";
import { Space, Button, Tag, Table, Input } from "antd";
import { useState } from "react";

function Users() {
  const [search, setSearch] = useState("");
  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );
  const columns: ColumnType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: User["status"]) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary">Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Users</h1>
      <Button type="primary" style={{ marginBottom: "16px" }}>
        Add User
      </Button>
      <Input
        placeholder="Search Users"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table<User> rowKey="id" columns={columns} dataSource={filteredUsers} />
    </div>
  );
}
export default Users;
