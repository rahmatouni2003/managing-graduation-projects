import Home from "../Pages/Home";
import GuestHomePage from "../Pages/GuestHomePage";
import GuestTimelinePage from "../Pages/GuestTimelinePage";
import NotInTeamHome from "../Pages/NotInTeamHome";
export default function HomeRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <GuestHomePage />;
  }

  if (!user.has_team) {
    return <NotInTeamHome />;
  }

  return <Home />;
}