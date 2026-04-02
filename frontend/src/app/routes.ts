import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { LineupBuilder } from "./pages/LineupBuilder";
import { Leaderboard } from "./pages/Leaderboard";
import { Races } from "./pages/Races";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/lineup",
    Component: LineupBuilder,
  },
  {
    path: "/leaderboard",
    Component: Leaderboard,
  },
  {
    path: "/races",
    Component: Races,
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);