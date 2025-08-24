import { DatesHelper } from "../../../config/helpers/dates.helper"
import useDashboardStats from "../../hooks/use-dashboard-stats"

export default function Notifications() {
  const {
    summary,
    // nextMeeting,
    // todayPendingTasks,
    loading,
    error
  } = useDashboardStats()

  return (
    <section className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold text-primary mb-4">
        Resumen semanal
      </h2>

      {loading ? (
        <div className="w-full bg-surface rounded-2xl p-6 text-center text-secondary animate-pulse">
          Cargando resumen...
        </div>
      ) : error ? (
        <div className="w-full bg-surface rounded-2xl p-6 text-center text-red-500">
          {error}
        </div>
      ) : (
        <div className="w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center bg-primary/10 rounded-xl p-2">
              <span className="text-4xl font-bold text-primary">
                {summary.completedTasks}
              </span>

              <span className="text-sm text-primary font-semibold">
                Tareas completadas
              </span>
            </div>

            <div className="flex flex-col items-center justify-center bg-accent/10 rounded-xl p-2">
              <span className="text-4xl font-bold text-accent">
                {summary.pendingTasks}
              </span>

              <span className="text-sm text-accent font-semibold">
                Tareas pendientes
              </span>
            </div>

            <div className="flex flex-col items-center justify-center bg-secondary/10 rounded-xl p-2">
              <span className="text-4xl font-bold text-secondary">
                {summary.upcomingEvents}
              </span>

              <span className="text-sm text-secondary font-semibold">
                Próximos eventos
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface rounded-xl p-2 border border-primary/20">
              <h3 className="font-semibold text-lg mb-2 text-secondary">
                Progreso semanal
              </h3>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${summary.weeklyProgress}%` }}
                ></div>
              </div>

              <p className="mt-2 text-xs">
                {summary.weeklyProgress}% completado
              </p>
            </div>

            <div className="bg-surface rounded-xl p-2 border border-primary/20">
              <h3 className="font-semibold text-lg mb-2 text-secondary">
                Tendencia semanal
              </h3>

              <div className="flex items-center">
                <span className={`text-xl font-bold ${summary.trendComparedToLastWeek >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {summary.trendComparedToLastWeek >= 0 ? '↑' : '↓'} {Math.abs(summary.trendComparedToLastWeek)}%
                </span>

                <span className="ml-2 text-xs">
                  {summary.trendComparedToLastWeek >= 0 ? 'más que la semana pasada' : 'menos que la semana pasada'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.nearestTask && (
              <div className="bg-surface rounded-xl p-2 border border-primary/20">
                <h3 className="font-semibold text-lg mb-2 text-secondary">
                  Tarea más próxima
                </h3>

                <p className="font-medium text-accent text-base">
                  {summary.nearestTask.title}
                </p>

                <p className="text-xs text-gray-600">
                  Vence: {DatesHelper.formatDate(summary.nearestTask.dueDate)}
                </p>
              </div>
            )}

            {summary.nearestEvent && (
              <div className="bg-surface rounded-xl p-2 border border-primary/20">
                <h3 className="font-semibold text-lg mb-2 text-secondary">
                  Evento más próximo
                </h3>

                <p className="font-medium text-accent text-base">
                  {summary.nearestEvent.title}
                </p>

                <p className="text-xs text-gray-600">
                  Inicia: {DatesHelper.formatDate(summary.nearestEvent.startDate)}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface rounded-xl p-2 border border-primary/20">
              <h3 className="font-semibold text-lg mb-2 text-secondary">
                Distribución por prioridad
              </h3>

              <section className="grid grid-cols-3 gap-4">
                <article className="text-center">
                  <p className="text-2xl font-bold text-red-500">
                    {summary.priorityDistribution.high}
                  </p>

                  <p className="text-xs">Alta</p>
                </article>

                <article className="text-center">
                  <p className="text-2xl font-bold text-yellow-500">
                    {summary.priorityDistribution.medium}
                  </p>

                  <p className="text-xs">Media</p>
                </article>

                <article className="text-center">
                  <p className="text-2xl font-bold text-green-500">
                    {summary.priorityDistribution.low}
                  </p>

                  <p className="text-xs">Baja</p>
                </article>
              </section>
            </div>

            <div className="bg-surface rounded-xl p-2 border border-primary/20">
              <h3 className="font-semibold text-lg mb-2 text-secondary">
                Otras métricas
              </h3>

              <section className="grid grid-cols-3 gap-4">
                <article className="text-center">
                  <p className="text-2xl font-bold text-orange-500">
                    {summary.overdueTasks}
                  </p>

                  <p className="text-xs">Tareas vencidas</p>
                </article>

                <article className="text-center">
                  <p className="text-2xl font-bold text-blue-500">
                    {summary.inProgressTasks}
                  </p>

                  <p className="text-xs">En progreso</p>
                </article>

                <article className="text-center">
                  <p className="text-2xl font-bold text-purple-500">
                    {summary.pastEvents}
                  </p>

                  <p className="text-xs">Eventos pasados</p>
                </article>
              </section>
            </div>
          </div>

          {/*  */}
        </div>
      )}
    </section>
  )
}
