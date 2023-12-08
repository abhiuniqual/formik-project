import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { retry } from "./utils/CommonFunction";
import SignIn from "./Pages/SignIn";
import SignUp from "../src/Pages/SignUp";
import HomePage from "./Pages/HomePage";
import FourOhFour from "./Pages/FourOhFour";

const Home = lazy(() => retry(() => import("./Pages/HomePage")));
const FohF = lazy(() => retry(() => import("./Pages/FourOhFour")));

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/*",
      element: <Navigate to="/404" />,
    },
    {
      path: "/404",
      element: <FourOhFour />,
    },
  ]);

  return routes;
};

export default Routes;
