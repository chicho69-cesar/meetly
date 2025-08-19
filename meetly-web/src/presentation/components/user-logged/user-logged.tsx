
import useAuthStore from "../../hooks/use-auth-store"

export default function UserLogged() {
  const { user, handleLogout } = useAuthStore()
  const avatar = user.avatarUrl || "/user-placeholder.png"

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6">
      <img
        src={avatar}
        alt={user.fullName || user.name || user.email}
        className="w-32 h-32 rounded-full object-cover border-4 border-primary mb-4 shadow"
      />

      <h2 className="text-2xl font-bold text-primary mb-1 text-center">
        {user.fullName || user.name || "Usuario"}
      </h2>

      <p className="text-secondary text-center mb-2">
        {user.email}
      </p>

      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition cursor-pointer hover:scale-95"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
