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

const BloodTypeList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps } = useTable({
    resource: "blood_type",
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
                  resource: "blood_type",
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
            title="Code"
            render={(_, blood_type) => <Text>{blood_type.code}</Text>}
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

export default BloodTypeList;
