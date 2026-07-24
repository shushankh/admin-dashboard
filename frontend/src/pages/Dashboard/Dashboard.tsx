import { Card, Col, Row, Statistic } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

function Dashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={1250}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Products"
              value={320}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Orders"
              value={890}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={125000}
              prefix={<DollarOutlined />}
              suffix="NPR"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Dashboard;
