import { Outlet } from "react-router"
import Header from "../../components/ui/header"

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 to-background">
      <Header />
      <Outlet />
    </div>
  )
}
