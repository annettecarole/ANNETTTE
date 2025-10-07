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

const BloodDonationList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps } = useTable({
    resource: "blood_donation",
  });
  return (
    <div>
      <List
        title="Dons de sang"
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: "blood_donation",
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
            dataIndex="quantity"
            title="Quantité"
            render={(_, blood_bag) => <Text>{blood_bag.quantity}</Text>}
          />

          <Table.Column
            dataIndex="blood_bank"
            title="Banque de sang"
            render={(_, blood_bag) => <Text>{blood_bag.blood_bank.name}</Text>}
          />

          <Table.Column
            dataIndex="donor"
            title="Donneur"
            render={(_, blood_bag) => (
              <Text>
                {blood_bag.donor.name} {blood_bag.donor.surname}
              </Text>
            )}
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

export default BloodDonationList;
