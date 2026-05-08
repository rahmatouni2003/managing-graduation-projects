import { createBrowserRouter } from "react-router-dom";
import Doctor from "../Pages/Doctor";
import Tasks from "../Components/Tasks";
import AiFilterLayout from "../Pages/AiFilterLayout";
import ProjectsManagedTeams from "../Pages/ProjectsManagedTeams";
import ProjectDetails from "../Pages/ProjectDetails";
import JoinRequests from "../Pages/JoinRequests";
import StudentDashboard from "../Pages/studentDashboard";
import NotificationsPage from "../Pages/Notifications";
import ProjectTypes from "../Pages/projectType";
import UploadProjectIdea from "../Pages/UploadProjectIdea";
import Login from "../Pages/auth/Login";
import EditProfile from "../Pages/EditProfile";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Doctor />,
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
            path: "milestones",
            element: <div>Milestone Content</div>,
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

  // 👇 دول برا root route
  {
    path: "student-dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "notifications",
    element: <NotificationsPage />,
  },
  {
    path: "project-types",
    element: <ProjectTypes />,
  },
  {
    path: "Upload-Project-Idea",
    element: <UploadProjectIdea />,
  },
    {
    path: "login",
    element: <Login />,
  },
    {
    path: "/profile",
    element: <EditProfile />,
  },
]);