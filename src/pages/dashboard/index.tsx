import DashboardTotalCountCard from "../../components/total-count-card";
import { Col, Row } from "antd";

export default function Dashboard() {
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resources="companies"
            isLoading={false}
            totalCount={18}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resources="contacts"
            isLoading={false}
            totalCount={25}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resources="deals"
            isLoading={false}
            totalCount={30}
          />
        </Col>
      </Row>
      {/* <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: "460px",
          }}
        >
          <UpcomingEvents />
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: "460px",
          }}
        >
          <DealsChart />
        </Col>
      </Row>

      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      >
        <Col xs={24}>
          <LatestActivities />
        </Col>
      </Row> */}
    </div>
  );
}
