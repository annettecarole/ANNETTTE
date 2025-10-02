import React from "react";
import DonorList from "./list";
import { DatePicker, Flex, Form, Input, Modal } from "antd";
import { useModalForm } from "@refinedev/antd";
import { useGo } from "@refinedev/core";

const CampaignCreate = () => {
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: "campaign", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "Campaign/",
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
          <Flex gap={16}>
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
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre email",
                },
                {
                  type: "email",
                  message: "Veuillez entrer un email valide",
                },
              ]}
            >
              <Input type="email" placeholder="Email" size="large" />
            </Form.Item>
          </Flex>

          <Flex gap={16}>
            <Form.Item
              style={{ flex: 1 }}
              name="start_date"
              label="Date de début"
              rules={[
                {
                  required: true,
                  message: "Veuillez sélectionner une date",
                },
              ]}
            >
              <DatePicker
                placeholder="Sélectionnez une date"
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                size="large"
              />
            </Form.Item>

            <Form.Item
              style={{ flex: 1 }}
              name="end_date"
              label="Date de fin"
              rules={[
                {
                  required: true,
                  message: "Veuillez sélectionner une date",
                },
              ]}
            >
              <DatePicker
                placeholder="Sélectionnez une date"
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                size="large"
              />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </DonorList>
  );
};

export default CampaignCreate;
