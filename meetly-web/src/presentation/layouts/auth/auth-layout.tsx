import { Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/30 to-background">
      <main className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-hidden">
        <div className="w-full p-8 md:p-12 flex flex-col items-center justify-center">
          <img
            src="/favicon.png"
            alt="Meetly Logo"
            className="w-48 h-48 mb-2 drop-shadow-md select-none"
          />
  
          <h1 className="text-4xl font-bold text-primary mb-4 tracking-tight text-center">
            Bienvenido a Meetly
          </h1>
          
          <p className="text-secondary text-center text-sm font-semibold">
            Inicia sesión o regístrate para continuar
          </p>
        </div>
          
        <div className="w-full bg-accent/10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
