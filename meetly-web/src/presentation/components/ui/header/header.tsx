import { Bell, Search, Settings, User } from "lucide-react"
import { Link } from "react-router"
import useUI from "../../../hooks/use-ui"

export default function Header() {
  const { openModal } = useUI()

  return (
    <header className="w-full py-4">
      <nav className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center justify-center space-x-4">
          <Link to="/" className="group flex items-center space-x-2">
            <img
              src="/favicon.png"
              alt="Meetly Logo"
              className="w-12 h-12 mx-auto group-hover:scale-95 transition-transform duration-200"
            />

            <h1 className="text-2xl font-bold text-center text-primary group-hover:text-primary/80 transition-colors duration-200">
              Meetly
            </h1>
          </Link>
        </div>

        <div className="flex items-stretch bg-surface/70 rounded-full border border-primary/20 overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-all">
          <input
            type="text"
            name="search"
            placeholder="Buscar..."
            aria-label="Search"
            autoComplete="off"
            autoCorrect="off"
            className="flex-1 px-5 py-2 bg-transparent outline-none text-base text-color placeholder:text-secondary"
          />

          <button
            className="px-4 py-2 text-primary flex items-center justify-center rounded-r-full focus:outline-none cursor-pointer font-bold"
            aria-label="Buscar"
            type="button"
          >
            <Search className="size-5 font-bold" />
          </button>
        </div>

        <div className="flex items-center justify-end space-x-1">
          <button
            className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200 cursor-pointer group"
            onClick={() => openModal("bell")}
          >
            <Bell className="w-6 h-6 text-secondary group-hover:rotate-12 group-hover:text-primary transition" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200 cursor-pointer group"
            onClick={() => openModal("settings")}
          >
            <Settings className="w-6 h-6 text-secondary group-hover:rotate-12 group-hover:text-primary transition" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200 cursor-pointer group"
            onClick={() => openModal("user")}
          >
            <User className="w-6 h-6 text-secondary group-hover:rotate-12 group-hover:text-primary transition" />
          </button>
        </div>
      </nav>
    </header>
  )
}
