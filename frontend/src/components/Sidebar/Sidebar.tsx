import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useLocation, NavLink } from "react-router-dom";

const { Sider } = Layout;
function Sidebar() {
  const location = useLocation();
  const menuItems = [
    {
      key: "/",
      label: <NavLink to="/">Dashboard</NavLink>,
      icon: <DashboardOutlined />,
    },
    {
      key: "/users",
      label: <NavLink to="/users">Users</NavLink>,
      icon: <UserOutlined />,
    },
    {
      key: "/products",
      label: <NavLink to="/products">Products</NavLink>,
      icon: <ShoppingOutlined />,
    },
    {
      key: "/orders",
      label: <NavLink to="/orders">Orders</NavLink>,
      icon: <ShoppingCartOutlined />,
    },
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
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </Sider>
  );
}

export default Sidebar;
