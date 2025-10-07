import React, { useEffect, useMemo, useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Alert,
  Spin,
  message,
  Card,
  Space,
  Table,
  Button,
} from "antd";
import { TeamOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Text } from "../../components/text";
import { useParams } from "react-router";
import dayjs from "dayjs";
import { API_BASE_URL, dataProvider } from "../../providers/data";

const CampaignShow: React.FC = () => {
  const { id } = useParams();
  const campaignId = useMemo(() => (id ? id : undefined), [id]);

  const { form, saveButtonProps, formLoading } = useForm({
    resource: "Campaign",
    action: "edit",
    id: campaignId,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [affLoading, setAffLoading] = useState(false);
  const [affiliations, setAffiliations] = useState<any[]>([]);
  const [affTotal, setAffTotal] = useState<number>(0);
  const [affPage, setAffPage] = useState<number>(1);
  const [affPageSize] = useState<number>(10);

  const load = async () => {
    if (!campaignId) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await dataProvider.custom({
        url: `${API_BASE_URL}/Campaign/${campaignId}/`,
        method: "get",
        headers: {},
      });
      form.setFieldsValue({
        name: data?.name,
        email: data?.email,
        location: data?.location,
        start_date: data?.start_date ? dayjs(data.start_date) : undefined,
        end_date: data?.end_date ? dayjs(data.end_date) : undefined,
        description: data?.description,
      });
    } catch (e: any) {
      setError(e?.message || "Erreur de chargement de la campagne");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId]);

  useEffect(() => {
    const loadAffiliations = async () => {
      if (!campaignId) return;
      setAffLoading(true);
      try {
        const { data } = await dataProvider.custom({
          url: `${API_BASE_URL}/Affiliation/?campaign_id=${campaignId}&page=${affPage}&page_size=${affPageSize}`,
          method: "get",
          headers: {},
        });
        const results = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
          ? data
          : [];
        setAffiliations(results);
        setAffTotal(
          typeof data?.count === "number" ? data.count : results.length
        );
      } finally {
        setAffLoading(false);
      }
    };
    loadAffiliations();
  }, [campaignId, affPage, affPageSize]);

  const onFinish = async (values: any) => {
    if (!campaignId) return;
    setSaving(true);
    try {
      const payload = {
        ...values,
        start_date: values?.start_date
          ? values.start_date.format("YYYY-MM-DD")
          : null,
        end_date: values?.end_date
          ? values.end_date.format("YYYY-MM-DD")
          : null,
      };
      await dataProvider.custom({
        url: `${API_BASE_URL}/Campaign/${campaignId}/`,
        method: "patch",
        headers: {},
        payload,
      });
      message.success("Campagne mise à jour");
      await load();
    } catch (e: any) {
      message.error(e?.message || "Échec de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
        <Spin />
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            breadcrumb={false}
            isLoading={formLoading || loading}
            saveButtonProps={{
              ...saveButtonProps,
              loading: saving,
              children: "Enregistrer",
            }}
            title="Modifier la campagne"
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                label="Nom"
                rules={[{ required: true, message: "Veuillez entrer le nom" }]}
              >
                <Input
                  placeholder="Nom de la campagne"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="location"
                label="Lieu"
                rules={[{ required: true, message: "Veuillez entrer le lieu" }]}
              >
                <Input
                  placeholder="Lieu de la campagne"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Veuillez entrer l'email" },
                  { type: "email", message: "Veuillez entrer un email valide" },
                ]}
              >
                <Input
                  placeholder="Email"
                  type="email"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="start_date"
                label="Date de début"
                rules={[
                  { required: true, message: "Veuillez sélectionner une date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>

              <Form.Item
                name="end_date"
                label="Date de fin"
                rules={[
                  { required: true, message: "Veuillez sélectionner une date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
        <Col xs={24} xl={12}>
          <Card
            styles={{
              header: {
                borderBottom: "1px solid #D9D9D9",
                marginBottom: "1px",
              },
              body: { borderBottom: "1px solid #D9D9D9", marginBottom: "1px" },
            }}
            title={
              <Space size="middle">
                <TeamOutlined />
                <Text>Donneurs</Text>
              </Space>
            }
            extra={
              <>
                <Text className="tertiary">Total donneurs: </Text>
                <Text strong>{affTotal}</Text>
              </>
            }
          >
            <Table
              dataSource={affiliations}
              loading={affLoading}
              rowKey={(r: any) => r.id ?? `${r.donor_id}-${r.campaign_id}`}
              pagination={{
                current: affPage,
                pageSize: affPageSize,
                total: affTotal,
                showSizeChanger: false,
                onChange: (page) => setAffPage(page),
              }}
            >
              <Table.Column
                title="Nom"
                render={(_, record) => (
                  <Text style={{ whiteSpace: "nowrap" }}>
                    {record.donor?.name} {record.donor?.surname}
                  </Text>
                )}
              />
              <Table.Column
                dataIndex="blood_group"
                title="Groupe sanguin"
                render={(_, record) => <Text>{record.donor?.blood_group}</Text>}
              />
              <Table.Column
                dataIndex="sex"
                title="Sexe"
                render={(_, record) => (
                  <Text>
                    {record.donor?.sex === "M" ? "Masculin" : "Feminin"}
                  </Text>
                )}
              />
              <Table.Column
                dataIndex="id"
                width={112}
                render={(_: any, record: any) => {
                  const dn = record?.donor || record;
                  const email = dn?.email;
                  const phone = dn?.phone || dn?.phone_number;
                  return (
                    <Space>
                      <Button
                        size="small"
                        href={email ? `mailto:${email}` : undefined}
                        icon={<MailOutlined />}
                      />
                      <Button
                        size="small"
                        href={phone ? `tel:${phone}` : undefined}
                        icon={<PhoneOutlined />}
                      />
                    </Space>
                  );
                }}
              />
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CampaignShow;
