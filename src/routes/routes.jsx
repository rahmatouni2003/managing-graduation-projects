// import { createBrowserRouter } from "react-router-dom";

// import Layout from "../Pages/Layouts/StudentLayout";
// import NoTeamRoute from "../Components/NoTeamRoute";
// import { Outlet } from "react-router-dom";
// import AdminRoute from "../context/AdminRoute.jsx";
// import ForgetPassword from "../Pages/ForgetPassword";
// import VerifyOTP from "../Pages/VerifyOTP";
// import ResetPassword from "../Pages/ResetPassword";
// import Doctor from "../Pages/Doctor";
// import Tasks from "../Components/Tasks";
// import AiFilterLayout from "../Pages/AiFilterLayout";
// import MilestoneDetails from "../pages/MilestoneDetails";
// import ProjectsManagedTeams from "../Pages/ProjectsManagedTeams";
// import FavoritesPage from "../Pages/FavoritesPage";
// import ProjectDetails from "../Pages/ProjectDetails";
// import FinalDiscussion from "../pages/FinalDiscussion";
// import PreviousProjectDetails from "../Pages/PreviuosProjectDetails";
// import JoinRequests from "../Pages/JoinRequests";
// import StudentDashboard from "../Pages/studentDashboard";

// import NotificationsPage from "../Pages/Notifications";
// import ProjectTypes from "../Pages/projectType";
// import UploadProjectIdea from "../Pages/UploadProjectIdea";
// import Login from "../Pages/auth/Login";
// import HomeRoute from "../context/HomeRoute.jsx";
// import GuestRoute from "../context/GuestRoute.jsx";

// import EditStudentProfile from "../Pages/EditStudentProfile.jsx";
// import StudentsSuggestedProjectDetails from "../Pages/StudentsSuggestedProjectDetails";
// import ProtectedRoute from "../Components/ProtectedRoute";
// import AddMilestone from "../Pages/AddMilestone";
// import AllDiscussion from "../pages/AllDiscussion";
// import RequestsPageNotInTeam from "../Pages/RequestsPageNotInTeam";
// import PoliciesPage from "../Pages/PoliciesPage";
// import TimelinePage from "../Pages/TimelinePage";
// import ReportProblemPage from "../Pages/ReportProblemPage.jsx";
// import GuestHomePage from "../Pages/GuestHomePage";
// import Home from "../Pages/Home";
// import NewRequestPage from "../Pages/NewRequestPage";
// import GuestTimelinePage from "../Pages/GuestTimelinePage"; 
// import SentRequestsPage from "../pages/SentRequestsPage";
// import ProjectsLiberary from "../Pages/ProjectsLiberary";
// import ReceivedRequests from "../pages/ReceivedRequests";
// import AllProjectsPage from "../Pages/AllProjectsPage";
// import TeamPage from "../Pages/TeamPage";
// import Management from "../Pages/Management.jsx";
// import SuggestedProjects from "../Pages/SuggestedProjects";
// import FinalDiscussionDetails from "../pages/FinalDiscussionDetails";
// import AllMilestoneCommittees from "../Pages/AllMilestoneCommittees";
// import MilestoneCommittee from "../Pages/MilestoneCommittee";
// import AllTeams from "../pages/AllTeams";
// import TeamDetails from "../Pages/TeamDetails";
// import MilestonesSetup from "../Pages/Milestonessetup";
// import MyReports from "../Pages/MyReports";
// import EditMilestone from "../Pages/EditMilestone";
// import Rules from "../Pages/Rules.jsx";
// import ReportDetails from "../pages/ReportDetails";

// export const router = createBrowserRouter([
//   // ================= AUTH =================
//   {
//     path: "admin",
//     element: (
//       <AdminRoute>
//         <Outlet />
//       </AdminRoute>
//     ),
//     children: [
//       {
//         path: "rules",
//         element: <Rules />,
//       },
//       {
//         path: "/admin/reports/:id",
//         element: <ReportDetails />,
//       },
//       {
//         path: "discussion-details/:id",
//         element: <FinalDiscussionDetails />,
//       },
//       {
//         path: "all-teams",
//         element: <AllTeams />,
//       },
//       {
//         path: "milestone-committee",
//         element: <MilestoneCommittee />,
//       },
//       {
//         path: "all-milestone-committees",
//         element: <AllMilestoneCommittees />,
//       },
//       {
//         path: "all-milestone-committees-details/:id",
//         element: <AllMilestoneCommittees />,
//       },
//       {
//         path: "suggested-projects",
//         element: <SuggestedProjects />,
//       },
//       {
//         path: "milestones-setup",
//         element: <MilestonesSetup />,
//       },
//       {
//         path: "/admin/milestones/add",
//         element: <AddMilestone />,
//       },
//       {
//         path: "my-reports",
//         element: <MyReports />,
//       },
//       {
//         path: "final-discussions",
//         element: <FinalDiscussion />,
//       },
//       {
//         path: "all-discussions",
//         element: <AllDiscussion />,
//       },
//       {
//         path: "milestones/edit/:id",
//         element: <EditMilestone />,
//       },
//       {
//         path: "management",
//         element: <Management />,
//       },
//     ],
//   },
//   {
//     path: "/team-details/:id",
//     element: (
//       <AdminRoute>
//         <TeamDetails />
//       </AdminRoute>
//     ),
//   },
//   {
//     path: "login",
//     element: <Login />,
//   },

//   {
//     path: "/forget-password",
//     element: <ForgetPassword />,
//   },

//   {
//     path: "/verify-otp",
//     element: <VerifyOTP />,
//   },

//   {
//     path: "/reset-password",
//     element: <ResetPassword />,
//   },


//   {
//     path: "/doctor",

//     element: (
//       <ProtectedRoute>
//         <Doctor />
//       </ProtectedRoute>
//     ),

//     children: [
//       {
//         index: true,
//         element: <HomeRoute />,
//       },

//       {
//         path: "ai-filter",

//         element: <AiFilterLayout />,

//         children: [
//           {
//             index: true,
//             element: <div></div>,
//           },

//           {
//             path: "milestones",
//             element: <div>Milestone Content</div>,
//           },

//           {
//             path: "team",
//             element: <div>Team Content</div>,
//           },
//         ],
//       },

//       {
//         path: "projects",
//         element: <ProjectsManagedTeams />,
//       },

//       {
//         path: "project-details",
//         element: <ProjectDetails />,
//       },

//       {
//         path: "join-requests",
//         element: <JoinRequests />,
//       },
//     ],
//   },

//   // ================= GENERAL =================

//   {
//     path: "notifications",
//     element: <NotificationsPage />,
//   },

//   {
//     path: "project-types",
//     element: <ProjectTypes />,
//   },

//   // ================= STUDENT LAYOUT =================

//   {
//     path: "/",

//     element: <Layout />,

//     children: [
// {
//   index: true,
//   element: <HomeRoute />,
// },

//       // Upload Idea
//       {
//         path: "Upload-Project-Idea",
//         element: <UploadProjectIdea />,
//       },

//       // Notifications
//       {
//         path: "student/notifications",
//         element: <NotificationsPage />,
//       },

//       // Project Types
//       {
//         path: "project-types",
//         element: <ProjectTypes />,
//       },

//       // User

//       {
//         path: "user/profile",
//         element: <EditStudentProfile />,
//       },

//       {
//         path: "policies",
//         element: <PoliciesPage />,
//       },

//       {
//         path: "student/inteam/report-problem",
//         element: <ReportProblemPage />,
//       },

//       // Projects Main Page
//       {
//         path: "projectsLiberary",
//         element: <ProjectsLiberary />,
//       },

//       // All Projects
//       {
//         path: "projectsLiberary/projects/:type",
//         element: <AllProjectsPage />,
//       },
//       {
//         path: "inteam/team",
//         element: <TeamPage />,
//       },
//       {
//         path: "student/inteam/received",
//         element: <ReceivedRequests />,
//       },
//       {
//         path: "student/inteam/sent-requests",
//         element: <SentRequestsPage />,
//       },
//       // {
//       //   path: "user/inteam/new-request",
//       //   element: <NewRequestPage />,
//       // },
//       {
//         path: "/guestHomePage",
//         element: <GuestHomePage />,
//       },
//       {
//         path: "student/inteam/supervision/requests",
//         element: <SentRequestsPage />,
//       },
//       {
//         path: "student/inteamsupervision/new-requests",
//         element: <NewRequestPage />,
//       },

//       // ================= PROJECT DETAILS =================

//       {
//         path: "/projectsLiberary/project-details/:id",

//         element: <PreviousProjectDetails />,
//       },
//       {
//         path: "projectsLiberary/suggested-project-details/:id",

//         element: <StudentsSuggestedProjectDetails />,
//       },
//       {
//         path: "student/inteam/projectsLiberary/favorites",

//         element: <FavoritesPage />,
//       },
// {
//   path: "timeline",
//   element: (
//     <GuestRoute>
//       <GuestTimelinePage />
//     </GuestRoute>
//   ),
// },
// {
//   path: "student/inteam/timeline",
//   element: (
//     <NoTeamRoute>
//       <TimelinePage />
//     </NoTeamRoute>
//   ),
// },
//       {
//         path: "student/inteam/milestones/:id",
//         element: <MilestoneDetails />,
//       },
//       {
//         path: "receivedNotInTeam",
//         element: <RequestsPageNotInTeam />,
//       },
//     ],
//   },
// ]);
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
import HomeRoute from "../context/HomeRoute.jsx";
import GuestRoute from "../context/GuestRoute.jsx";

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
import GuestTimelinePage from "../Pages/GuestTimelinePage"; 
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
import ReportDetails from "../pages/ReportDetails";
import NotInTeam from "../Pages/NotInTeam";

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
        path: "/admin/reports/:id",
        element: <ReportDetails />,
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
        element: <HomeRoute />,
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
{
  index: true,
  element: <HomeRoute />,
},

      // Upload Idea
      {
        path: "Upload-Project-Idea",
        element: <UploadProjectIdea />,
      },

      // Notifications
      {
        path: "student/notifications",
        element: <NotificationsPage />,
      },

      // Project Types
      {
        path: "project-types",
        element: <ProjectTypes />,
      },

      // User

      {
        path: "student/profile",
        element: <EditStudentProfile />,
      },

      {
        path: "policies",
        element: <PoliciesPage />,
      },

      {
        path: "student/inteam/report-problem",
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
        path: "inteam/team",
        element: <TeamPage />,
      },
      {
        path: "student/inteam/received",
        element: <ReceivedRequests />,
      },
      {
        path: "student/inteam/sent-requests",
        element: <SentRequestsPage />,
      },
      // {
      //   path: "user/inteam/new-request",
      //   element: <NewRequestPage />,
      // },
                  {
        path: "student/notinteam/notinteam",

        element: <NotInTeam />,
      },
      {
        path: "/guestHomePage",
        element: <GuestHomePage />,
      },
      {
        path: "student/inteam/supervision/requests",
        element: <SentRequestsPage />,
      },
      {
        path: "student/inteamsupervision/new-requests",
        element: <NewRequestPage />,
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
        path: "student/inteam/projectsLiberary/favorites",

        element: <FavoritesPage />,
      },
           

{
  path: "timeline",
  element: (
    <GuestRoute>
      <GuestTimelinePage />
    </GuestRoute>
  ),
},
{
  path: "student/inteam/timeline",
  element: (
      <TimelinePage />
  ),
},
      {
        path: "student/inteam/milestones/:id",
        element: <MilestoneDetails />,
      },
      {
        path: "receivedNotInTeam",
        element: <RequestsPageNotInTeam />,
      },
    ],
  },
]);
