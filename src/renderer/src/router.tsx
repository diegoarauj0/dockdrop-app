import { createBrowserRouter, Navigate } from "react-router";
import { DashboardPage } from "./pages/dashboard/dashboard";
import { DockerErrorPage } from "./pages/dockerError/dockerError";
import { AppLayout } from "./layouts/app/app";
import { SettingsPage } from "./pages/settings/settings";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <DashboardPage />,
        path: "/dashboard",
      },
      {
        element: <SettingsPage />,
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
