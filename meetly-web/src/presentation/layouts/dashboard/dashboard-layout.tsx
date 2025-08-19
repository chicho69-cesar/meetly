import { Outlet } from "react-router"
import Header from "../../components/ui/header/header"
import Modal from "../../components/ui/modal/modal"
import useUI from "../../hooks/use-ui"

export default function DashboardLayout() {
  const { modal, closeModal } = useUI()

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 to-background">
      <Header />
      <Outlet />

      <Modal open={!!modal} onClose={closeModal}>
        {modal === "bell" && <div>Notificaciones aquí</div>}
        {modal === "settings" && <div>Opciones de configuración aquí</div>}
        {modal === "user" && <div>Opciones de usuario aquí</div>}
      </Modal>
    </div>
  )
}
