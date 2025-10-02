import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { authProvider, dataProvider } from "./providers";
import { resources } from "./config";
import { Login } from "./pages/login";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import { Register } from "./pages/register";
import DonorList from "./pages/donors/list";
import DonorCreate from "./pages/donors/create";
import CampaignList from "./pages/campaigns/list";
import CampaignCreate from "./pages/campaigns/create";
import BloodTypeList from "./pages/blood-types/list";
import BloodTypeCreate from "./pages/blood-types/create";
import BloodBank from "./pages/blood-bank/list";
import BloodBankCreate from "./pages/blood-bank/create";
import BloodBag from "./pages/blood-bag/list";
import BloodBagCreate from "./pages/blood-bag/create";
import BloodDonationList from "./pages/blood-donation/list";
import BloodDonationCreate from "./pages/blood-donation/create";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                authProvider={authProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "bF9nLz-CUMyBW-oTCzQw",
                }}
              >
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  {/* <Route path="/register" element={<Register />} /> */}

                  <Route
                    element={
                      <Authenticated
                        key="authenticated-layout"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    {/* <Route path="/patients" element={<PatientsDashboard />} /> */}
                    <Route path="/donor">
                      <Route index element={<DonorList />} />
                      <Route path="new" element={<DonorCreate />} />
                    </Route>
                    <Route path="/campaign">
                      <Route index element={<CampaignList />} />
                      <Route path="new" element={<CampaignCreate />} />
                    </Route>
                    <Route path="/blood_type">
                      <Route index element={<BloodTypeList />} />
                      <Route path="new" element={<BloodTypeCreate />} />
                    </Route>
                    <Route path="/blood_bank">
                      <Route index element={<BloodBank />} />
                      <Route path="new" element={<BloodBankCreate />} />
                    </Route>
                    <Route path="/blood_bag">
                      <Route index element={<BloodBag />} />
                      <Route path="new" element={<BloodBagCreate />} />
                    </Route>
                    <Route path="/blood_donation">
                      <Route index element={<BloodDonationList />} />
                      <Route path="new" element={<BloodDonationCreate />} />
                    </Route>
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
