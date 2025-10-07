import { getDate } from "../../utilities/helpers";
import { Text } from "../../components/text";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { Button, Space, Table } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { AddDonorToCampaignModal } from "./modals/add-donor-to-campaign";

const CampaignList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps } = useTable({
    resource: "Campaign",
  });

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeCampaignId, setActiveCampaignId] = useState<string | undefined>(
    undefined
  );
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
          >
            Ajouter
          </CreateButton>
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
            dataIndex="location"
            title="Lieu"
            render={(_, campaign) => <Text>{campaign.location}</Text>}
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
                <ShowButton
                  hideText
                  size="small"
                  recordItemId={value}
                  resource="campaign"
                  meta={{}}
                  onClick={() => {
                    go({
                      to: { resource: "campaign", action: "show", id: value },
                      type: "push",
                      options: { keepQuery: true },
                    });
                  }}
                />
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setActiveCampaignId(value);
                    setAddModalOpen(true);
                  }}
                >
                  Ajouter une personne
                </Button>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      <AddDonorToCampaignModal
        open={addModalOpen}
        campaignId={activeCampaignId}
        onClose={() => {
          setAddModalOpen(false);
          setActiveCampaignId(undefined);
        }}
      />
      {children}
    </div>
  );
};

export default CampaignList;
