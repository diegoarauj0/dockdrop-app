import { createBrowserRouter, Navigate } from "react-router";
import { DashboardPage } from "./pages/dashboard/dashboard";
import { AppLayout } from "./layouts/app/app";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <DashboardPage />,
        path: "/dashboard",
      },
      {
        element: <DashboardPage />,
        path: "/settings",
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/dashboard"} replace />,
  },
]);
