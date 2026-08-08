import { createBrowserRouter } from "react-router-dom";
import MainLayout from "#/layouts/MainLayout";
import Dashboard from "#/pages/dashboard";
import Jobs from "#/pages/jobs";
import Schedule from "#/pages/schedule";
import Login from "#/pages/login";
import PrivateRoutes from "#/routes/PrivateRoutes";
import PublicRoutes from "#/routes/PublicRoutes";
import PriceList from "#/pages/priceList/index.tsx";
import Investments from "#/pages/investments";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      { path: "/login", element: <Login /> },
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
          { path: "cjenik", element: <PriceList /> },
          { path: "ulaganja", element: <Investments /> },
        ],
      },
    ],
  },
]);

export default router;
