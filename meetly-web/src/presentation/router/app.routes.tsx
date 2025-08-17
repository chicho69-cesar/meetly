import { createBrowserRouter } from "react-router"

import { AuthenticatedRoute, UnauthenticatedRoute } from '../components/router/protected-routes'
import AuthLayout from "../layouts/auth/auth-layout"
import DashboardLayout from "../layouts/dashboard/dashboard-layout"
import LoginPage from "../pages/auth/login/login-page"
import RegisterPage from "../pages/auth/register/register-page"
import DashboardPage from "../pages/dashboard/dashboard-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <DashboardLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />
      }
    ]
  },
  {
    path: "/auth",
    element: (
      <UnauthenticatedRoute>
        <AuthLayout />
      </UnauthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      }
    ]
  }
])
