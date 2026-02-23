import { createBrowserRouter } from "react-router-dom";
import Doctor from "../Pages/Doctor";
import Tasks from "../Components/Tasks";
import AiFilterLayout from "../Pages/AiFilterLayout";
import ProjectsManagedTeams from "../Pages/ProjectsManagedTeams";
import ProjectDetails from "../Pages/ProjectDetails";
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
            index: true,
            element: <div></div>
          },
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
        path: "project-details", // 👈 الصفحة الجديدة
        element: <ProjectDetails />,
      },
    ],
  },
]);
