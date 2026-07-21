import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
function Sidebar() {
  const navigate = useNavigate();
  const menuItems = [
    { key: "/", label: "Dashboard", icon: <DashboardOutlined /> },
    { key: "/users", label: "Users", icon: <UserOutlined /> },
    { key: "/products", label: "Products", icon: <ShoppingOutlined /> },
    { key: "/orders", label: "Orders", icon: <ShoppingCartOutlined /> },
  ];
  return (
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
  );
}

export default Sidebar;
