import useAuthStore from "../../hooks/use-auth-store"

export default function DashboardPage() {
  const { handleLogout } = useAuthStore()

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary text-center mb-4">
        Dashboard
      </h1>

      <p className="text-lg text-secondary mb-4">
        Bienvenido al panel de control.
      </p>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
