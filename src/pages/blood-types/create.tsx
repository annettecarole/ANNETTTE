import React from "react";
import DonorList from "./list";
import { Form, Input, Modal } from "antd";
import { useModalForm } from "@refinedev/antd";
import { useGo } from "@refinedev/core";

const BloodTypeCreate = () => {
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: "blood_type", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "blood_type/",
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
  });

  return (
    <DonorList>
      <Modal
        {...modalProps}
        mask
        onCancel={goToListPage}
        title="Ajouter un groupe sanguin"
        width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            style={{ flex: 1 }}
            name="code"
            label="Code"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le Code",
              },
            ]}
          >
            <Input placeholder="Code" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </DonorList>
  );
};

export default BloodTypeCreate;
