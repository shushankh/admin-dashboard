import { Button, Form, Input, Card } from "antd";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../state/hooks";

import { login } from "../../state/auth/authSlice";

interface LoginFormValues {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogin = (values: LoginFormValues) => {
    console.log("Login values:", values);

    dispatch(
      login({
        id: 1,
        name: "John Doe",
        email: values.email,
        role: "admin",
      }),
    );

    // Navigate to dashboard
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title="Admin Dashboard Login"
        style={{
          width: 400,
        }}
      >
        <Form<LoginFormValues> layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
