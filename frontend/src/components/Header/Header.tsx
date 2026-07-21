import { Layout } from "antd";
const { Header: AntHeader } = Layout;
function Header() {
  return (
    <AntHeader
      style={{
        padding: "0 24px",
        background: "#fff",
      }}
    >
      Admin Dashboard
    </AntHeader>
  );
}
export default Header;
