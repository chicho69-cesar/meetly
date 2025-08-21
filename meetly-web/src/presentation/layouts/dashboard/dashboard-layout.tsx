import { Outlet } from "react-router"

import Notifications from "../../components/notifications/notifications"
import Settings from "../../components/settings/settings"
import Header from "../../components/ui/header/header"
import Modal from "../../components/ui/modal/modal"
import UserLogged from "../../components/user-logged/user-logged"
import useUI from "../../hooks/use-ui"

export default function DashboardLayout() {
  const { modal, closeModal } = useUI()

  return (
    <div>
      <div className="min-h-screen fixed top-0 bottom-0 right-0 left-0 -z-50 bg-gradient-to-b from-primary/30 to-background"></div>

      <Header />
      <Outlet />

      <Modal open={!!modal} onClose={closeModal}>
        {modal === "bell" && <Notifications />}
        {modal === "settings" && <Settings />}
        {modal === "user" && <UserLogged />}
      </Modal>
    </div>
  )
}
