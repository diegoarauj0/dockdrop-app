import { createBrowserRouter, Navigate } from "react-router";
import { DashboardPage } from "./pages/dashboard/dashboard";
import { DockerErrorPage } from "./pages/dockerError/dockerError";
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
    path: "/docker-error",
    element: <DockerErrorPage />,
  },
  {
    path: "/",
    element: <Navigate to={"/dashboard"} replace />,
  },
  {
    path: "*",
    element: <Navigate to={"/dashboard"} replace />,
  },
]);
