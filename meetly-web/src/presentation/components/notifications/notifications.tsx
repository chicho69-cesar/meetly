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
    weeklyProgress: 0,
    overdueTasks: 0,
    priorityDistribution: { high: 0, medium: 0, low: 0 },
    trendComparedToLastWeek: 0,
    dailyAverageCompleted: 0,
    inProgressTasks: 0,
    pastEvents: 0
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <section className="w-full max-w-4xl mx-auto p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Resumen semanal
      </h2>

      {loading ? (
        <div className="w-full bg-surface rounded-2xl shadow-lg p-6 text-center text-secondary animate-pulse">
          Cargando resumen...
        </div>
      ) : error ? (
        <div className="w-full bg-surface rounded-2xl shadow-lg p-6 text-center text-red-500">
          {error}
        </div>
      ) : (
        <div className="w-full space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface rounded-xl p-4 shadow-md">
              <h3 className="font-semibold text-lg mb-2">Progreso semanal</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full"
                  style={{ width: `${summary.weeklyProgress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm">{summary.weeklyProgress}% completado</p>
            </div>

            <div className="bg-surface rounded-xl p-4 shadow-md">
              <h3 className="font-semibold text-lg mb-2">Tendencia semanal</h3>
              <div className="flex items-center">
                <span className={`text-2xl font-bold ${summary.trendComparedToLastWeek >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {summary.trendComparedToLastWeek >= 0 ? '↑' : '↓'} {Math.abs(summary.trendComparedToLastWeek)}%
                </span>
                <span className="ml-2 text-sm">
                  {summary.trendComparedToLastWeek >= 0
                    ? 'más que la semana pasada'
                    : 'menos que la semana pasada'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.nearestTask && (
              <div className="bg-surface rounded-xl p-4 shadow-md">
                <h3 className="font-semibold text-lg mb-2">Tarea más próxima</h3>
                <p className="font-medium">{summary.nearestTask.title}</p>
                <p className="text-sm text-gray-600">
                  Vence: {formatDate(summary.nearestTask.dueDate)}
                </p>
              </div>
            )}

            {summary.nearestEvent && (
              <div className="bg-surface rounded-xl p-4 shadow-md">
                <h3 className="font-semibold text-lg mb-2">Evento más próximo</h3>
                <p className="font-medium">{summary.nearestEvent.title}</p>
                <p className="text-sm text-gray-600">
                  Inicia: {formatDate(summary.nearestEvent.startDate)}
                </p>
              </div>
            )}
          </div>

          <div className="bg-surface rounded-xl p-4 shadow-md">
            <h3 className="font-semibold text-lg mb-2">Distribución por prioridad</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{summary.priorityDistribution.high}</div>
                <div className="text-sm">Alta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{summary.priorityDistribution.medium}</div>
                <div className="text-sm">Media</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{summary.priorityDistribution.low}</div>
                <div className="text-sm">Baja</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-orange-500">{summary.overdueTasks}</div>
              <div className="text-sm">Tareas vencidas</div>
            </div>
            <div className="bg-surface rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-blue-500">{summary.inProgressTasks}</div>
              <div className="text-sm">En progreso</div>
            </div>
            <div className="bg-surface rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-purple-500">{summary.pastEvents}</div>
              <div className="text-sm">Eventos pasados</div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-4 shadow-md text-center">
            <h3 className="font-semibold text-lg mb-2">Promedio diario de tareas completadas</h3>
            <div className="text-2xl font-bold text-indigo-500">{summary.dailyAverageCompleted}</div>
          </div>
        </div>
      )}
    </section>
  )
}
