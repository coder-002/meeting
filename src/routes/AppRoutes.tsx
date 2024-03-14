import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/layout/Layout";
import { Navigation_Routes } from "./routes.constant";
import Meeting from "../pages/meeting/Meeting";
import Member from "../pages/member/Member";
import Setup from "../pages/setup/Setup";
import Calendar from "../pages/Calendar";
import Organization from "../pages/setup/Organization";
import Branch from "../pages/setup/Branch";
import Unit from "../pages/setup/Unit";
import Committee from "../pages/setup/Committee";
import Designation from "../pages/setup/Designation";
import Deduction from "../pages/setup/Deduction";
import MemberDetails from "../pages/member/MemberDetails";
import MeetingDetails from "../pages/meeting/MeetingDetails";
import CommitteeMember from "../pages/setup/CommitteeMember";
import Participants from "../pages/meeting/Participants";
import Profile from "../pages/Profile";

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
      path: Navigation_Routes.PROFILE,
      element: (
        <Layout>
          <Profile />
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
      path: Navigation_Routes.MEETING_DETAILS,
      element: (
        <Layout>
          <MeetingDetails />
        </Layout>
      ),
    },
    {
      path: Navigation_Routes.PARTICIPANTS_DETAILS,
      element: (
        <Layout>
          <Participants id="" />
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
      path: Navigation_Routes.MEMBER_DETAILS,
      element: (
        <Layout>
          <MemberDetails />
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
      path: Navigation_Routes.BRANCH,
      element: (
        <Layout>
          <Setup>
            <Branch />
          </Setup>
        </Layout>
      ),
    },
    {
      path: Navigation_Routes.UNIT,
      element: (
        <Layout>
          <Setup>
            <Unit />
          </Setup>
        </Layout>
      ),
    },
    {
      path: Navigation_Routes.COMMITTEE,
      element: (
        <Layout>
          <Setup>
            <Committee />
          </Setup>
        </Layout>
      ),
    },
    {
      path: Navigation_Routes.COMMITTEE_DETAILS,
      element: (
        <Layout>
          <CommitteeMember />
        </Layout>
      ),
    },
    {
      path: Navigation_Routes.DESIGNATION,
      element: (
        <Layout>
          <Setup>
            <Designation />
          </Setup>
        </Layout>
      ),
    },
    {
      path: Navigation_Routes.DEDUCTION,
      element: (
        <Layout>
          <Setup>
            <Deduction />
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
