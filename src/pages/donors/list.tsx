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

const DonorList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "donor",
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
                  resource: "donor",
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
            render={(_, donor) => (
              <Text>
                {donor.name} {donor.surname}
              </Text>
            )}
          />
          <Table.Column
            dataIndex="phone_number"
            title="Numéro de téléphone"
            render={(_, donor) => <Text>{donor.phone_number}</Text>}
          />
          <Table.Column
            dataIndex="age"
            title="Age"
            render={(_, donor) => <Text>{donor.age}</Text>}
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

export default DonorList;
