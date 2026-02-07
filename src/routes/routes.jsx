import { createBrowserRouter } from "react-router-dom";
import Doctor from "../Pages/Doctor";
import Tasks from "../Components/Tasks";
import AiFilterLayout from "../Pages/AiFilterLayout";
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
          {
            path: "team",
            element: <div>Team Content</div>,
          },
        ],
      },
    ],
  },
]);
