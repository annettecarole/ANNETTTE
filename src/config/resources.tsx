import {
  BankOutlined,
  DashOutlined,
  ExperimentOutlined,
  NotificationOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined,
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
      label: "Doneurs",
      icon: <UserOutlined />,
    },
  },
  {
    name: "campaign",
    list: "/campaign",
    create: "/campaign/new",
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
      label: "Groupes sanguins",
      icon: <ExperimentOutlined />,
    },
  },
  {
    name: "blood_bank",
    list: "/blood_bank",
    create: "/blood_bank/new",
    meta: {
      label: "Banque de sang",
      icon: <BankOutlined />,
    },
  },
  {
    name: "blood_bag",
    list: "/blood_bag",
    create: "/blood_bag/new",
    meta: {
      label: "Poche de sang",
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
