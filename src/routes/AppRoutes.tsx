import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/layout/Layout";
import { Navigation_Routes } from "./routes.constant";
import Meeting from "../pages/meeting/Meeting";
import Member from "../pages/member/Member";
import Setup from "../pages/setup/Setup";
import Calendar from "../pages/Calendar";
import Organization from "../pages/setup/Organization";

const AppRoutes = () => {
  const routes = [
    {
      path: Navigation_Routes.DASHBOARD,
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
    },
    {
      path: Navigation_Routes.MEETING,
      element: (
        <Layout>
          <Meeting />
        </Layout>
      ),
    },
    {
      path: Navigation_Routes.MEMBER,
      element: (
        <Layout>
          <Member />
        </Layout>
      ),
    },
    {
      path: Navigation_Routes.ORGANIZATION,
      element: (
        <Layout>
          <Setup>
            <Organization />
          </Setup>
        </Layout>
      ),
    },
    {
      path: Navigation_Routes.CALENDAR,
      element: (
        <Layout>
          <Calendar />
        </Layout>
      ),
    },
  ];

  const route = useRoutes(routes);

  return route;
};
export default AppRoutes;
