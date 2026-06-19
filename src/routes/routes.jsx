import { createBrowserRouter } from "react-router-dom";

import Layout from "../Pages/Layouts/StudentLayout";
import NoTeamRoute from "../Components/NoTeamRoute";
import { Outlet } from "react-router-dom";
import AdminRoute from "../context/AdminRoute.jsx";
import ForgetPassword from "../Pages/ForgetPassword";
import VerifyOTP from "../Pages/VerifyOTP";
import ResetPassword from "../Pages/ResetPassword";

import Doctor from "../Pages/Doctor";

import Tasks from "../Components/Tasks";

import AiFilterLayout from "../Pages/AiFilterLayout";
import MilestoneDetails from "../pages/MilestoneDetails";
import ProjectsManagedTeams from "../Pages/ProjectsManagedTeams";
import FavoritesPage from "../Pages/FavoritesPage";

import ProjectDetails from "../Pages/ProjectDetails";

import FinalDiscussion from "../pages/FinalDiscussion";
import PreviousProjectDetails from "../Pages/PreviuosProjectDetails";

import JoinRequests from "../Pages/JoinRequests";

import StudentDashboard from "../Pages/studentDashboard";

import NotificationsPage from "../Pages/Notifications";

import ProjectTypes from "../Pages/projectType";

import UploadProjectIdea from "../Pages/UploadProjectIdea";

import Login from "../Pages/auth/Login";

import EditStudentProfile from "../Pages/EditStudentProfile.jsx";
import StudentsSuggestedProjectDetails from "../Pages/StudentsSuggestedProjectDetails";
import ProtectedRoute from "../Components/ProtectedRoute";
import AddMilestone from "../Pages/AddMilestone";
import AllDiscussion from "../pages/AllDiscussion";
import RequestsPageNotInTeam from "../Pages/RequestsPageNotInTeam";
import PoliciesPage from "../Pages/PoliciesPage";
import TimelinePage from "../Pages/TimelinePage";
import ReportProblemPage from "../Pages/ReportProblemPage.jsx";
import GuestHomePage from "../Pages/GuestHomePage";
import Home from "../Pages/Home";
import NewRequestPage from "../Pages/NewRequestPage";

import SentRequestsPage from "../pages/SentRequestsPage";
import ProjectsLiberary from "../Pages/ProjectsLiberary";
import ReceivedRequests from "../pages/ReceivedRequests";
import AllProjectsPage from "../Pages/AllProjectsPage";
import TeamPage from "../Pages/TeamPage";
import Management from "../Pages/Management.jsx";
import SuggestedProjects from "../Pages/SuggestedProjects";
import FinalDiscussionDetails from "../pages/FinalDiscussionDetails";
import AllMilestoneCommittees from "../Pages/AllMilestoneCommittees";
import MilestoneCommittee from "../Pages/MilestoneCommittee";
import AllTeams from "../pages/AllTeams";
import TeamDetails from "../Pages/TeamDetails";
import MilestonesSetup from "../Pages/Milestonessetup";
import MyReports from "../Pages/MyReports";
import EditMilestone from "../Pages/EditMilestone";
import Rules from "../Pages/Rules.jsx";
export const router = createBrowserRouter([
  // ================= AUTH =================
    {
  path: "admin",
  element: (
    <AdminRoute>
      <Outlet />
    </AdminRoute>
  ),
  children: [
    {
      path: "rules",
      element: <Rules />,
    },
    {
      path: "discussion-details/:id",
      element: <FinalDiscussionDetails />,
    },
    {
      path: "all-teams",
      element: <AllTeams />,
    },
    {
      path: "milestone-committee",
      element: <MilestoneCommittee />,
    },
    {
      path: "all-milestone-committees",
      element: <AllMilestoneCommittees />,
    },
    {
      path: "all-milestone-committees-details/:id",
      element: <AllMilestoneCommittees />,
    },
    {
      path: "suggested-projects",
      element: <SuggestedProjects />,
    },
    {
      path: "milestones-setup",
      element: <MilestonesSetup />,
    },
    {
      path: "/admin/milestones/add",
      element: <AddMilestone />,
    },
    {
      path: "my-reports",
      element: <MyReports />,
    },
    {
      path: "final-discussions",
      element: <FinalDiscussion />,
    },
    {
      path: "all-discussions",
      element: <AllDiscussion />,
    },
    {
      path: "milestones/edit/:id",
      element: <EditMilestone />,
    },
    {
      path: "management",
      element: <Management />,
    },
  ],
},
{
  path: "/team-details/:id",
  element: (
    <AdminRoute>
      <TeamDetails />
    </AdminRoute>
  ),
},
  {
    path: "login",
    element: <Login />,
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
            path: "profile",
            element: <EditStudentProfile />,
          },

          {
            path: "policies",
            element: <PoliciesPage />,
          },

          {
            path: "report-problem",
            element: <ReportProblemPage />,
          },

          

        

      // Projects Main Page
      {
        path: "projectsLiberary",
        element: <ProjectsLiberary />,
      },

      // All Projects
      {
        path: "projectsLiberary/projects/:type",
        element: <AllProjectsPage />,
      },
      {
        path: "team",
        element: <TeamPage />,
      }, {
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
        path: "/projectsLiberary/project-details/:id",

        element: <PreviousProjectDetails />,
      },
            {
        path: "projectsLiberary/suggested-project-details/:id",

        element: <StudentsSuggestedProjectDetails />,
      },
                  {
        path: "/projectsLiberary/favorites",

        element: <FavoritesPage /> ,
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
          <RequestsPageNotInTeam />

        ),
      },

    ],
  },
]);
