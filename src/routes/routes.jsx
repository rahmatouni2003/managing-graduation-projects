import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/ForgetPassword";
import VerifyOTP from "../Pages/VerifyOTP";
import ResetPassword from "../Pages/ResetPassword";
import Doctor from "../Pages/Doctor";
import Tasks from "../Components/Tasks";
import AiFilterLayout from "../Pages/AiFilterLayout";
export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/verify-otp", element: <VerifyOTP /> },
  { path: "/reset-password", element: <ResetPassword /> },
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
    ],
  },
]);
