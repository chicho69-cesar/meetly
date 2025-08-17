export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/30 to-background">
      <img
        src="/favicon.png"
        alt="Loading..."
        className="w-48 h-48 animate-bounce mb-2 drop-shadow-lg"
      />

      <span className="text-4xl font-bold text-primary animate-pulse">Cargando...</span>
    </div>
  )
}
