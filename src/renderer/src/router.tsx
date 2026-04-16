import { CreateContainerPageComponent } from "./modules/home/pages/createContainer/createContainer.page";
import { DockerErrorPage } from "./modules/home/pages/dockerError/dockerError.page";
import { DashboardPage } from "./modules/home/pages/dashboard/dashboard.page";
import { SettingsPage } from "./modules/settings/pages/settings/settings.page";
import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "./modules/shared/layouts/app/app.layout";

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
      {
        element: <CreateContainerPageComponent />,
        path: "/containers/new",
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
