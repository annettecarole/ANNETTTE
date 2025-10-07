import { useLogin } from "@refinedev/core";
import { Button, Card, Form, Input, Typography } from "antd";
import React from "react";

export const Login: React.FC = () => {
  const { mutate: login, isLoading } = useLogin();

  const onFinish = (values: { email: string; password: string }) => {
    login(values);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Card style={{ width: 360 }}>
        <Typography.Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Blood Manager
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Adresse e-mail"
            rules={[{ required: true, message: "Veuillez entrer votre e-mail" }]}
          >
            <Input placeholder="Entrez votre e-mail" type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mot de passe"
            rules={[{ required: true, message: "Veuillez entrer votre mot de passe" }]}
          >
            <Input.Password placeholder="Entrez votre mot de passe" />
          </Form.Item>
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Se connecter
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
