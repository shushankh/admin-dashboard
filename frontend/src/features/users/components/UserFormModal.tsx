import { Button, Form, Input, Modal, Select, Space } from "antd";

import { PlusCircleOutlined } from "@ant-design/icons";

import { useEffect } from "react";

import type { User, UserRole, UserStatus } from "../../../types/user";

interface UserFormValues {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

interface UserFormModalProps {
  open: boolean;
  editingUser: User | null;
  onSubmit: (values: UserFormValues) => void;
  onClose: () => void;
}

function UserFormModal({
  open,
  editingUser,
  onSubmit,
  onClose,
}: UserFormModalProps) {
  const [form] = Form.useForm<UserFormValues>();

  useEffect(() => {
    // If editing a user
    if (editingUser) {
      form.setFieldsValue({
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        status: editingUser.status,
      });
    }

    // If adding a new user
    else {
      form.resetFields();
    }
  }, [editingUser, form]);

  const handleFinish = (values: UserFormValues) => {
    onSubmit(values);

    // Clear form after submit
    form.resetFields();
  };

  const handleCancel = () => {
    // Clear all values
    form.resetFields();

    // Tell parent to close
    onClose();
  };

  return (
    <Modal
      title={editingUser ? "Edit User" : "Add New User"}
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form<UserFormValues>
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the user's name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter the email",
            },
            {
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: "Please select a role",
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Admin",
                value: "admin",
              },
              {
                label: "Manager",
                value: "manager",
              },
              {
                label: "Staff",
                value: "staff",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please select a status",
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Active",
                value: "active",
              },
              {
                label: "Inactive",
                value: "inactive",
              },
            ]}
          />
        </Form.Item>

        <Space>
          <Button onClick={handleCancel}>Cancel</Button>

          <Button
            type="primary"
            htmlType="submit"
            icon={!editingUser ? <PlusCircleOutlined /> : undefined}
          >
            {editingUser ? "Update User" : "Add User"}
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}

export default UserFormModal;
