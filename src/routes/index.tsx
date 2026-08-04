import Dashboard from "@/components/dashboard/Dashboard";
import AuthGuard from "@/guards/AuthGuard";
import DashboardGuard from "@/guards/DashboardGuard";
import DashboardLayout from "@/layouts/DashboardLayout";
import WebsiteLayout from "@/layouts/WebsiteLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { createBrowserRouter, Navigate } from "react-router";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/en"} />,
  },

  {
    path: ":locale",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <DashboardGuard>
                <Dashboard />
              </DashboardGuard>
            ),
          },
        ],
      },
    ],
  },
]);
