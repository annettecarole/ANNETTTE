import BloodBankList from "./list";
import { Form, Input, Modal, Select } from "antd";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { useParams } from "react-router";

const BloodBankEdit = () => {
  const { id } = useParams<{ id: string }>();
  const go = useGo();

  const goToListPage = () => {
    go({
      to: { resource: "blood_bank", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "edit",
    defaultVisible: true,
    resource: "blood_bank",
    mutationMode: "pessimistic",
    id,
    onMutationSuccess: goToListPage,
  });

  const { selectProps: bloodGoupSelectProps, query: bloodGroupQuery } =
    useSelect({
      optionLabel: "code",
      optionValue: "code",
      resource: "blood_type",
    });

  return (
    <BloodBankList>
      <Modal
        {...modalProps}
        mask
        okText="Mettre à jour"
        cancelText="Annuler"
        onCancel={goToListPage}
        title="Modifier une banque de sang"
        width={712}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            style={{ flex: 1 }}
            name="name"
            label="Nom"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre nom",
              },
            ]}
          >
            <Input placeholder="Nom" size="large" />
          </Form.Item>
          <Form.Item
            style={{ flex: 1 }}
            name="code"
            label="Code"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le code",
              },
            ]}
          >
            <Input placeholder="Code" size="large" />
          </Form.Item>
          <Form.Item
            style={{ flex: 1 }}
            name="blood_group"
            label="Groupe sanguin"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le type de sang",
              },
            ]}
          >
            <Select
              options={bloodGroupQuery.data?.data || []}
              {...bloodGoupSelectProps}
              size="large"
            />
          </Form.Item>
        </Form>
      </Modal>
    </BloodBankList>
  );
};

export default BloodBankEdit;
