import { createBrowserRouter } from "react-router-dom";
import MainLayout from "#/layouts/MainLayout";
import Dashboard from "#/pages/dashboard";
import Jobs from "#/pages/jobs";
import Schedule from "#/pages/schedule";
import Login from "#/pages/login";
import ComingSoon from "#/pages/ComingSoon";
import PrivateRoutes from "#/routes/PrivateRoutes";
import PublicRoutes from "#/routes/PublicRoutes";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <ComingSoon title="Registracija" /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {index: true, element: <Dashboard />},
          { path: "poslovi", element: <Jobs /> },
          { path: "raspored", element: <Schedule /> },
          { path: "postavke", element: <ComingSoon title="Postavke" /> },
        ],
      },
    ],
  },
]);

export default router;
