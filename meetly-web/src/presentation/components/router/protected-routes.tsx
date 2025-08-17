import type { PropsWithChildren } from "react"
import { Navigate } from "react-router"
import useAuthStore from "../../hooks/use-auth-store"
import LoadingScreen from "../ui/loading-screen"

export function AuthenticatedRoute({ children }: PropsWithChildren) {
  const { status } = useAuthStore()

  if (status === "checking") return <LoadingScreen />
  if (status === "unauthenticated") return <Navigate to="/auth/login" replace />

  return <>{children}</>
}

export function UnauthenticatedRoute({ children }: PropsWithChildren) {
  const { status } = useAuthStore()

  if (status === "checking") return <LoadingScreen />
  if (status === "authenticated") return <Navigate to="/" replace />

  return <>{children}</>
}
