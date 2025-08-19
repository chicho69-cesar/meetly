import Calendar from "../../components/calendar/calendar/calendar"
import useAuthStore from "../../hooks/use-auth-store"

export default function DashboardPage() {
  const { handleLogout } = useAuthStore()

  return (
    <main className="w-full mx-auto max-w-6xl my-12">
      <h1 className="text-3xl font-bold text-primary mb-4">
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

      <Calendar />
    </main>
  )
}
