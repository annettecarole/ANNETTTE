import React from "react";
import { ThemedLayout, ThemedTitle, ThemedSider } from "@refinedev/antd";
import { useLogout } from "@refinedev/core";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Header from "./header";

const CustomSider: React.FC<any> = (props) => {
  const { mutate: logout } = useLogout();
  return (
    <ThemedSider
      {...props}
      render={({ items, collapsed }) => (
        <>
          {items}
          {collapsed ? (
            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={() => logout()}
              block
            ></Button>
          ) : (
            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={() => logout()}
              block
            >
              Se déconnecter
            </Button>
          )}
        </>
      )}
    />
  );
};

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayout
      Header={Header}
      Sider={(siderProps) => <CustomSider {...siderProps} />}
      Title={(titleProps) => (
        <ThemedTitle {...titleProps} text="Blood Manager" />
      )}
    >
      {children}
    </ThemedLayout>
  );
};

export default Layout;
