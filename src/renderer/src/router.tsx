import { DockerErrorPage } from "./modules/home/pages/dockerError/dockerError.page";
import { DashboardPage } from "./modules/home/pages/dashboard/dashboard.page";
import { SettingsPage } from "./modules/settings/pages/settings/settings.page";
import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "./modules/shared/layouts/app/app";

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
