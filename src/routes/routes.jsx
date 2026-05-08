import { createBrowserRouter } from "react-router-dom";
import ForgetPassword from "../Pages/ForgetPassword";
import VerifyOTP from "../Pages/VerifyOTP";
import ResetPassword from "../Pages/ResetPassword";
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
import EditStudentProfile from "../Pages/EditStudentProfile";
import ProtectedRoute from "../Components/ProtectedRoute";
import EditProfile from "../Pages/EditStudentProfile";
export const router = createBrowserRouter([
  { path: "login", element: <Login /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/verify-otp", element: <VerifyOTP /> },
  { path: "/reset-password", element: <ResetPassword /> },

  {
    path: "/edit-profile",
    element: (
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/doctor",
    element: (
      <ProtectedRoute>
        <Doctor />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Tasks /> },

      {
        path: "ai-filter",
        element: <AiFilterLayout />,
        children: [
          { index: true, element: <div></div> },
          { path: "milestones", element: <div>Milestone Content</div> },
          { path: "team", element: <div>Team Content</div> },
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
    path: "/profile",
    element: <EditProfile />,
  },
]);