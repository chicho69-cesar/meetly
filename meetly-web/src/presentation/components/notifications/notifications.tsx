import { useEffect, useState } from "react"

import { getWeeklyActivitySummaryAction } from "../../../domain/actions/dashboard/get-weekly-activity-summary.action"
import type { WeeklyActivitySummary } from "../../../infrastructure/interfaces/summary.interface"
import useAuthStore from "../../hooks/use-auth-store"

export default function Notifications() {
  const { user } = useAuthStore()

  const [summary, setSummary] = useState<WeeklyActivitySummary>({
    completedTasks: 0,
    pendingTasks: 0,
    upcomingEvents: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true)
      setError(null)

      const res = await getWeeklyActivitySummaryAction(user.id)

      if (res.success && res.data) {
        setSummary(res.data)
      } else {
        setError(res.error || "No se pudo obtener el resumen")
      }

      setLoading(false)
    }

    if (user.id) fetchSummary()
  }, [user.id])

  return (
    <section className="w-full max-w-xl mx-auto p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Resumen semanal
      </h2>

      <div className="w-full bg-surface rounded-2xl shadow-lg p-6 flex flex-col gap-6">
        {loading ? (
          <div className="text-center text-secondary animate-pulse">
            Cargando resumen...
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center bg-primary/10 rounded-xl p-4">
              <span className="text-4xl font-bold text-primary mb-1">
                {summary.completedTasks}
              </span>

              <span className="text-sm text-primary font-semibold">
                Tareas completadas
              </span>
            </div>

            <div className="flex flex-col items-center justify-center bg-accent/10 rounded-xl p-4">
              <span className="text-4xl font-bold text-accent mb-1">
                {summary.pendingTasks}
              </span>

              <span className="text-sm text-accent font-semibold">
                Tareas pendientes
              </span>
            </div>

            <div className="flex flex-col items-center justify-center bg-secondary/10 rounded-xl p-4">
              <span className="text-4xl font-bold text-secondary mb-1">
                {summary.upcomingEvents}
              </span>

              <span className="text-sm text-secondary font-semibold">
                Próximos eventos
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
