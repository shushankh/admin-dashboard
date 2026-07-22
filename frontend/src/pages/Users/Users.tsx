import type { User, UserStatus, UserRole } from "../../types/user";
import { mockUsers } from "../../features/users/mockUsers";
import type { ColumnsType } from "antd/es/table";
import { Space, Button, Tag, Table, Input, Form, Modal, Select } from "antd";
import { useState } from "react";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

interface UserFormValues {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<UserFormValues>();
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );
  const handleCloseModal = () => {
    form.resetFields();
    setEditingUser(null);
    setIsModalOpen(false);
  };
  const handleAddUser = (values: UserFormValues) => {
    if (editingUser) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id == editingUser.id
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
        name: values.name,
        email: values.email,
        role: values.role,
        status: values.status,
        createdAt: new Date().toISOString(),
      };
      setUsers((currrentUsers) => [...currrentUsers, newUser]);
    }
    form.resetFields();
    setEditingUser(null);
    setIsModalOpen(false);
  };
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsModalOpen(true);
  };
  const columns: ColumnsType<User> = [
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
          <Button type="primary" onClick={() => handleEditUser(record)}>
            Edit
          </Button>
          <Button
            danger
            onClick={() => {
              setUsers((currentUsers) =>
                currentUsers.filter((user) => user.id !== record.id),
              );
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Users</h1>
      <Space>
        {" "}
        <Input
          placeholder="Search Users"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{ marginBottom: 16, width: 300 }}
        />
        <Button
          type="primary"
          style={{ marginBottom: "16px" }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add User
        </Button>
      </Space>

      <Table<User> rowKey="id" columns={columns} dataSource={filteredUsers} />
      <Modal
        title={editingUser ? "Edit user" : "Add new user"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form<UserFormValues>
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "please enter the name for the user",
              },
            ]}
          >
            <Input placeholder="ENTER THE NAME " />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "please enter the email of the user",
              },
              {
                type: "email",
                message: "please enter a valid email ",
              },
            ]}
          >
            <Input placeholder="ENTER THE EMAIL " />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "please select a role for the user",
              },
            ]}
          >
            <Select
              placeholder="Select Role"
              options={[
                { label: "Admin", value: "admin" },
                { label: "Manager", value: "manager" },
                { label: "Staff", value: "staff" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "please select a status for the user",
              },
            ]}
          >
            <Select
              placeholder="Select Status"
              options={[
                {
                  label: "Active",
                  value: "active",
                },
                {
                  label: "Inctive",
                  value: "inactive",
                },
              ]}
            />
          </Form.Item>

          <Space>
            <Button type="primary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              icon={!editingUser ? <PlusCircleOutlined /> : <EditOutlined />}
              type="primary"
              htmlType="submit"
            >
              {editingUser ? "update user" : "add user"}
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}
export default Users;
