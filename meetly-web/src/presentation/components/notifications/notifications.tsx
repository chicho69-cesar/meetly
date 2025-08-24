import "./notifications.styles.css"

import { DatesHelper } from "../../../config/helpers/dates.helper"
import useDashboardStats from "../../hooks/use-dashboard-stats"

export default function Notifications() {
  const {
    summary,
    todayPendingTasks,
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

          <div className={`grid grid-cols-1 gap-4 ${summary.nearestTask ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            <div className="bg-surface rounded-xl p-2 border border-primary/20">
              <h3 className="font-semibold text-lg mb-1 text-secondary">
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
              <h3 className="font-semibold text-lg mb-1 text-secondary">
                Tendencia semanal
              </h3>

              <div className="flex items-center">
                <span className={`text-lg font-bold ${summary.trendComparedToLastWeek >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {summary.trendComparedToLastWeek >= 0 ? '↑' : '↓'} {Math.abs(summary.trendComparedToLastWeek)}%
                </span>

                <span className="ml-2 text-xs text-secondary">
                  {summary.trendComparedToLastWeek >= 0 ? 'más que la semana pasada' : 'menos que la semana pasada'}
                </span>
              </div>
            </div>

            {summary.nearestTask && (
              <div className="bg-surface rounded-xl p-2 border border-primary/20">
                <h3 className="font-semibold text-lg mb-1 text-secondary">
                  Tarea más próxima
                </h3>

                <p className="font-medium text-accent text-sm">
                  {summary.nearestTask.title}
                </p>

                <p className="text-xs text-gray-600">
                  Vence: {DatesHelper.formatDate(summary.nearestTask.dueDate)}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface rounded-xl p-2 border border-primary/20">
              <h3 className="font-semibold text-lg mb-1 text-secondary">
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
              <h3 className="font-semibold text-lg mb-1 text-secondary">
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

          <div>
            <h3 className="font-semibold text-lg mb-2 text-secondary">
              Tareas pendientes de hoy
            </h3>

            {todayPendingTasks.length === 0 ? (
              <div className="text-secondary text-base text-center py-4">
                No tienes tareas pendientes para hoy 🎉
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar custom-scrollbar">
                {todayPendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="min-w-[260px] bg-surface rounded-xl p-2 border border-primary/20 flex flex-col justify-between"
                  >
                    <h4 className="font-bold text-primary text-sm mb-0.5">
                      {task.title}
                    </h4>

                    <p className="text-secondary text-xs mb-2">
                      {task.description}
                    </p>

                    <div className="flex gap-3 justify-between text-xs text-secondary mb-1">
                      <p className="flex flex-col">
                        <span className="font-semibold">Vence: </span>
                        <span>{DatesHelper.formatDate(task.dueDate)}</span>
                      </p>

                      <p className="flex flex-col">
                        <span className="font-semibold">Prioridad: </span>

                        <span
                          className={
                            task.priority === 'high'
                              ? 'text-red-500'
                              : task.priority === 'medium'
                                ? 'text-yellow-500'
                                : 'text-green-500'
                          }
                        >
                          {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
