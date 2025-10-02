import { ThemedTitle } from "@refinedev/antd";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Card,
} from "antd";
import { useRegister } from "@refinedev/core";
import { Donor } from "@/types";

export const Register = () => {
  const { mutate: register, isPending } = useRegister();

  const onFinish = (values: Donor) => {
    // Convertir la date en ISO string si nécessaire
    const formattedValues = {
      ...values,
      date: values.date ? values.date.toISOString() : null,
    };

    register(formattedValues);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      <Card style={{ maxWidth: 500, width: "100%" }}>
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <ThemedTitle collapsed={false} />
          <h2 style={{ marginTop: 16 }}>Inscription</h2>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: "",
            surname: "",
            sex: "",
            age: undefined,
            phone_number: undefined,
            date: null,
            email: "",
            password: "",
          }}
        >
          <Form.Item
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

          <Form.Item
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

          <Form.Item
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
            name="date"
            label="Date"
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
            name="password"
            label="Mot de passe"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre mot de passe",
              },
              {
                min: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères",
              },
            ]}
          >
            <Input.Password placeholder="Mot de passe" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              block
              size="large"
            >
              S'inscrire
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
