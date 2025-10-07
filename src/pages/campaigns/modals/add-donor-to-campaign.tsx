import { Modal, Form, Select } from "antd";
import { useSelect } from "@refinedev/antd";
import { useState } from "react";
import { dataProvider as appDataProvider } from "../../../providers/data";
import { API_BASE_URL } from "../../../providers/data";

type Props = {
  open: boolean;
  campaignId?: string;
  onClose: () => void;
};

// Update this function to match your backend route
// Example: POST /v1/Campaign/:id/add_donor/
const addDonorToCampaign = async (campaignId: string, donorId: string) => {
  // Uses the same axios instance/config as the app's dataProvider
  return appDataProvider.custom?.({
    url: `${API_BASE_URL}/Affiliation/`,
    method: "post",
    payload: { donor: donorId, campaign: campaignId },
  });
};

export const AddDonorToCampaignModal = ({
  open,
  onClose,
  campaignId,
}: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm<{ donor_id: string }>();

  const { selectProps: donorSelectProps, query: donorQuery } = useSelect({
    optionLabel: "name",
    optionValue: "id",
    resource: "donor",
  });

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!campaignId) return;
      setSubmitting(true);
      await addDonorToCampaign(campaignId, values.donor_id);
      onClose();
      form.resetFields();
    } catch (e) {
      // Validation or request error; keep modal open
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleOk}
      confirmLoading={submitting}
      okText="Ajouter"
      cancelText="Annuler"
      title="Ajouter un donneur à la campagne"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="donor_id"
          label="Donneur"
          rules={[{ required: true, message: "Veuillez choisir un donneur" }]}
        >
          <Select
            options={donorQuery.data?.data || []}
            {...donorSelectProps}
            size="large"
            placeholder="Sélectionnez un donneur"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
