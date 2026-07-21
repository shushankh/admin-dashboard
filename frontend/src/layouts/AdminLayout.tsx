import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const { Content } = Layout;
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

 function AdminLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header />
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
