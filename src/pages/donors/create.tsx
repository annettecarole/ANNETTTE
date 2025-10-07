import DonorList from "./list";
import { Flex, Form, Input, InputNumber, Modal, Select } from "antd";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";

const DonorCreate = () => {
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: "donor", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "donor/",
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
  });

  const { selectProps: bloodGoupSelectProps, query: bloodGroupQuery } =
    useSelect({
      optionLabel: "code",
      optionValue: "code",
      resource: "blood_type",
    });

  return (
    <DonorList>
      <Modal
        {...modalProps}
        mask
        okText="Enregistrer"
        cancelText="Annuler"
        onCancel={goToListPage}
        title="Ajouter une personne"
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
              name="surname"
              label="Prénom"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre prénom",
                },
              ]}
            >
              <Input placeholder="Prénom" size="large" />
            </Form.Item>
          </Flex>

          <Flex gap={16}>
            <Form.Item
              style={{ flex: 1 }}
              name="sex"
              label="Sexe"
              rules={[
                {
                  required: true,
                  message: "Veuillez sélectionner votre sexe",
                },
              ]}
            >
              <Select placeholder="Sélectionnez votre sexe" size="large">
                <Select.Option value="M">Masculin</Select.Option>
                <Select.Option value="F">Féminin</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              name="age"
              label="Âge"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre âge",
                },
              ]}
            >
              <InputNumber
                placeholder="Âge"
                min={1}
                max={150}
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>
          </Flex>

          <Flex gap={16}>
            <Form.Item
              style={{ flex: 1 }}
              name="phone_number"
              label="Numéro de téléphone"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre numéro de téléphone",
                },
              ]}
            >
              <InputNumber
                placeholder="Numéro de téléphone"
                style={{ width: "100%" }}
                controls={false}
                size="large"
              />
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
          </Flex>

          <Flex gap={16}>
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

            <Form.Item
              style={{ flex: 1 }}
              name="password"
              label="Mot de passe"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre mot de passe",
                },
                {
                  min: 6,
                  message:
                    "Le mot de passe doit contenir au moins 6 caractères",
                },
              ]}
            >
              <Input.Password placeholder="Mot de passe" size="large" />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </DonorList>
  );
};

export default DonorCreate;
