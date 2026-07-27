import { Layout, Button } from "antd";
import { useAppDispatch } from "../../state/hooks";

import { logout } from "../../state/auth/authSlice";

import { useNavigate } from "react-router-dom";
const { Header: AntHeader } = Layout;
function Header() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };
  return (
    <>
      <AntHeader
        style={{
          padding: "0 24px",
          background: "#fff",
        }}
      >
        Admin Dashboard
      </AntHeader>
      <Button danger onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
export default Header;
