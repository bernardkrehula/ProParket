import { createBrowserRouter } from "react-router-dom";
import MainLayout from "#/layouts/MainLayout";
import Dashboard from "#/pages/dashboard";
import Jobs from "#/pages/jobs";
import ComingSoon from "#/pages/ComingSoon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "poslovi", element: <Jobs /> },
      { path: "cjenik", element: <ComingSoon title="Cjenik" /> },
      { path: "postavke", element: <ComingSoon title="Postavke" /> },
    ],
  },
]);

export default router;
