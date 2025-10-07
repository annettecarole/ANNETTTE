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

const BloodBag = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps } = useTable({
    resource: "blood_bag",
  });
  return (
    <div>
      <List
        title="Poches de sang"
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: "blood_bag",
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
            dataIndex="blood_group"
            title="Groupe sanguin"
            render={(_, blood_bag) => <Text>{blood_bag.blood_type.code}</Text>}
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

export default BloodBag;
