import DonorList from "./list";
import { Form, Input, Modal } from "antd";
import { useModalForm } from "@refinedev/antd";
import { useGo } from "@refinedev/core";

const BloodBankCreate = () => {
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: "blood_bank", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "blood_bank/",
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
  });

  return (
    <DonorList>
      <Modal
        {...modalProps}
        mask
        onCancel={goToListPage}
        title="Ajouter une campagne"
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
            <Input type="email" placeholder="Groupe sanguin" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </DonorList>
  );
};

export default BloodBankCreate;
