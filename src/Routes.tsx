import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { retry } from "./utils/CommonFunction";

const SignIn = lazy(() => retry(() => import("./Pages/SignIn")));
const SignUp = lazy(() => retry(() => import("./Pages/SignUp")));
const HomePage = lazy(() => retry(() => import("./Pages/HomePage")));
const FourOhFour = lazy(() => retry(() => import("./Pages/FourOhFour")));

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
