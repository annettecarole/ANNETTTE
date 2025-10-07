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

const BloodBank = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps } = useTable({
    resource: "blood_bank",
  });
  return (
    <div>
      <List
        title="Banques de sang"
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: "blood_bank",
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
            render={(_, blood_bank) => <Text>{blood_bank.name}</Text>}
          />

          {/* <Table.Column
            dataIndex="code"
            title="Code"
            render={(_, blood_bank) => <Text>{blood_bank.code}</Text>}
          /> */}

          <Table.Column
            dataIndex="blood_group"
            title="Groupe sanguin"
            render={(_, blood_bank) => <Text>{blood_bank.blood_group}</Text>}
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

export default BloodBank;
