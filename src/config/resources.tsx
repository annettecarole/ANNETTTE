import {
  BankOutlined,
  DashOutlined,
  ExperimentOutlined,
  NotificationOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashOutlined />,
    },
  },
  {
    name: "donor",
    list: "/donor",
    create: "/donor/new",
    meta: {
      label: "Personnes",
      icon: <TeamOutlined />,
    },
  },
  {
    name: "campaign",
    list: "/campaign",
    create: "/campaign/new",
    show: "/campaign/:id/show",
    meta: {
      label: "Campagnes",
      icon: <NotificationOutlined />,
    },
  },
  {
    name: "blood_type",
    list: "/blood_type",
    create: "/blood_type/new",
    meta: {
      label: "Groupes sanguin",
      icon: <ExperimentOutlined />,
    },
  },
  {
    name: "blood_bank",
    list: "/blood_bank",
    create: "/blood_bank/new",
    edit: "/blood_bank/:id/edit",
    meta: {
      label: "Banques de sang",
      icon: <BankOutlined />,
    },
  },
  {
    name: "blood_bag",
    list: "/blood_bag",
    create: "/blood_bag/new",
    meta: {
      label: "Poches de sang",
      icon: <ShoppingOutlined />,
    },
  },
  {
    name: "blood_donation",
    list: "/blood_donation",
    create: "/blood_donation/new",
    meta: {
      label: "Dons de sang",
      icon: <UserSwitchOutlined />,
    },
  },
];
