import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
function App() {
    console.log("APP IS RUNNING");
  return <RouterProvider router={router} />;
}
export default App;
