import { getDate } from "../../utilities/helpers";
import { Text } from "../../components/text";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  useTable,
} from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { Space, Table } from "antd";

const CampaignList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps } = useTable({
    resource: "Campaign",
  });
  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: "campaign",
                  action: "create",
                },
                options: {
                  keepQuery: true,
                },
                type: "replace",
              });
            }}
          />
        )}
      >
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
          }}
        >
          <Table.Column
            dataIndex="name"
            title="Nom"
            render={(_, campaign) => <Text>{campaign.name}</Text>}
          />
          <Table.Column
            dataIndex="date"
            title="Période"
            render={(_, campaign) => (
              <Text>{getDate(campaign.start_date, campaign.end_date)}</Text>
            )}
          />
          <Table.Column
            dataIndex="email"
            title="Email"
            render={(_, campaign) => <Text>{campaign.email}</Text>}
          />
          <Table.Column
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};

export default CampaignList;
