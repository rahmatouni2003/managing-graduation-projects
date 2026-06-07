import { createBrowserRouter } from "react-router-dom";

import Layout from "../Pages/Layouts/StudentLayout";
import NoTeamRoute from "../Components/NoTeamRoute";
import ForgetPassword from "../Pages/ForgetPassword";
import VerifyOTP from "../Pages/VerifyOTP";
import ResetPassword from "../Pages/ResetPassword";

import Doctor from "../Pages/Doctor";

import Tasks from "../Components/Tasks";

import AiFilterLayout from "../Pages/AiFilterLayout";
import MilestoneDetails from "../pages/MilestoneDetails";
import ProjectsManagedTeams from "../Pages/ProjectsManagedTeams";

import ProjectDetails from "../Pages/ProjectDetails";

import PreviousProjectDetails from "../Pages/PreviuosProjectDetails";

import JoinRequests from "../Pages/JoinRequests";

import StudentDashboard from "../Pages/studentDashboard";

import NotificationsPage from "../Pages/Notifications";

import ProjectTypes from "../Pages/projectType";

import UploadProjectIdea from "../Pages/UploadProjectIdea";

import Login from "../Pages/auth/Login";

import EditStudentProfile from "../Pages/EditStudentProfile";

import ProtectedRoute from "../Components/ProtectedRoute";

import EditProfile from "../Pages/EditStudentProfile";
import RequestsPageNotInTeam from "../Pages/RequestsPageNotInTeam";
import PoliciesPage from "../Pages/PoliciesPage";
import TimelinePage from "../Pages/TimelinePage";
import ReportProblem from "../Pages/ReporProblem";
import GuestHomePage from "../Pages/GuestHomePage";
import Home from "../Pages/Home";
import NewRequestPage from "../Pages/NewRequestPage";
import UserInfo from "../Pages/UserInfo";
import SentRequestsPage from "../pages/SentRequestsPage";
import ProjectsPage from "../Pages/ProjectsLiberary";
import ReceivedRequests from "../pages/ReceivedRequests";
import AllProjectsPage from "../Pages/AllProjectsPage";
import TeamPage from "../Pages/TeamPage";
import StudentsManagement from "../Pages/StudentsManagement";
export const router = createBrowserRouter([
  // ================= AUTH =================

  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/StudentsManagement",
    element: <StudentsManagement />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },

  {
    path: "/verify-otp",
    element: <VerifyOTP />,
  },

  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  // ================= PROFILE =================

  {
    path: "/edit-profile",

    element: (
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    ),
  },

  // ================= DOCTOR =================

  {
    path: "/doctor",

    element: (
      <ProtectedRoute>
        <Doctor />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Tasks />,
      },

      {
        path: "ai-filter",

        element: <AiFilterLayout />,

        children: [
          {
            index: true,
            element: <div></div>,
          },

          {
            path: "milestones",
            element: <div>Milestone Content</div>,
          },

          {
            path: "team",
            element: <div>Team Content</div>,
          },
        ],
      },

      {
        path: "projects",
        element: <ProjectsManagedTeams />,
      },

      {
        path: "project-details",
        element: <ProjectDetails />,
      },

      {
        path: "join-requests",
        element: <JoinRequests />,
      },
    ],
  },

  // ================= GENERAL =================

  {
    path: "notifications",
    element: <NotificationsPage />,
  },

  {
    path: "project-types",
    element: <ProjectTypes />,
  },

  // ================= STUDENT LAYOUT =================

  {
    path: "/",

    element: <Layout />,

    children: [
      // HOME
      {
        index: true,
        element: <Home />,
      },

      // Upload Idea
      {
        path: "Upload-Project-Idea",
        element: <UploadProjectIdea />,
      },

      // Notifications
      {
        path: "notifications",
        element: <NotificationsPage />,
      },

      // Project Types
      {
        path: "project-types",
        element: <ProjectTypes />,
      },

      // User
      {
        path: "user",

        element: <UserInfo />,

        children: [
          {
            path: "profile",
            element: <EditStudentProfile />,
          },

          {
            path: "policies",
            element: <PoliciesPage />,
          },

          {
            path: "report-problem",
            element: <ReportProblem />,
          },
        ],
      },

      // Projects Main Page
      {
        path: "ProjectsPage",
        element: <ProjectsPage />,
      },

      // All Projects
      {
        path: "projects/:type",
        element: <AllProjectsPage />,
      },
      {
        path: "team",
        element: <TeamPage />,
      },    {
        path: "received",
        element: <ReceivedRequests />,
      },
       {
        path: "sent-requests",
        element: <SentRequestsPage />,
      },
             {
        path: "/new-request",
        element: <NewRequestPage />,
      },
                   {
        path: "/guestHomePage",
        element: <GuestHomePage />,
      },
      // ================= PROJECT DETAILS =================

      {
        path: "project-details/:id",

        element: <PreviousProjectDetails />,
      },
      {
  path: "timeline",
  element: <TimelinePage />,
},
      {
  path: "/milestones/:id",
  element: <MilestoneDetails />,
},
{
  path: "receivedNotInTeam",
  element: (
    <NoTeamRoute>
      <RequestsPageNotInTeam />
    </NoTeamRoute>
  ),
},

    ],
  },
]);
