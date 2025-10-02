import DonorList from "./list";
import { Form, InputNumber, Modal, Select } from "antd";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";

const BloodDonationCreate = () => {
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: "blood_donation", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "blood_donation/",
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
  });

  const { selectProps: donorSelectProps, query: donorQuery } = useSelect({
    optionLabel: "name",
    optionValue: "id",
    resource: "donor",
  });

  const { selectProps: bloodBankSelectProps, query: bloodBankQuery } =
    useSelect({
      optionLabel: "name",
      optionValue: "id",
      resource: "blood_bank",
    });

  return (
    <DonorList>
      <Modal
        {...modalProps}
        mask
        onCancel={goToListPage}
        title="Ajouter une poche de sang"
        width={712}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            style={{ flex: 1 }}
            name="quantity"
            label="Quantité"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre quantité",
              },
            ]}
          >
            <InputNumber
              placeholder="Quantité"
              min={1}
              max={150}
              style={{ width: "100%" }}
              size="large"
            />
          </Form.Item>

          <Form.Item
            style={{ flex: 1 }}
            name="donor"
            label="Donneur"
            rules={[
              {
                required: true,
                message: "Veuillez entrer un donneur",
              },
            ]}
          >
            <Select
              options={donorQuery.data?.data || []}
              {...donorSelectProps}
              size="large"
            />
          </Form.Item>

          <Form.Item
            style={{ flex: 1 }}
            name="blood_bank"
            label="Banque de sang"
            rules={[
              {
                required: true,
                message: "Veuillez entrer une banque de sang",
              },
            ]}
          >
            <Select
              options={bloodBankQuery.data?.data || []}
              {...bloodBankSelectProps}
              size="large"
            />
          </Form.Item>
        </Form>
      </Modal>
    </DonorList>
  );
};

export default BloodDonationCreate;
