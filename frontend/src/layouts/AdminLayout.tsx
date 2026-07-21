import { Outlet, useNavigate } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
const { Header, Content, Sider } = Layout;

function AdminLayout() {
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "/",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: "Users",
    },
    {
      key: "/products",
      icon: <ShoppingOutlined />,
      label: "Products",
    },
    {
      key: "/orders",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          style={{
            color: "white",
            fontSize: "20px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        {" "}
        <Header
          style={{
             padding: "0 24px",
            background: "#fff",
          }}
        >
          Admin Dashboard
        </Header>
        <Content
          style={{ margin: "24px", padding: "24px", background: "#fff" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
export default AdminLayout;
