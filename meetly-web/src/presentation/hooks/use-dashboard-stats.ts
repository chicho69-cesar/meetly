import { useEffect, useState } from "react"

import { getNextMeetingAction } from "../../domain/actions/dashboard/get-next-meeting.action"
import { getTodayPendingTasksAction } from "../../domain/actions/dashboard/get-today-pending-tasks.action"
import { getWeeklyActivitySummaryAction } from "../../domain/actions/dashboard/get-weekly-activity-summary.action"
import type { Event } from "../../domain/entities/event.entity"
import type { Task } from "../../domain/entities/task.entity"
import type { WeeklyActivitySummary } from "../../infrastructure/interfaces/summary.interface"
import useAuthStore from "./use-auth-store"

const initialSummary: WeeklyActivitySummary = {
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
}

export default function useDashboardStats() {
  const { user } = useAuthStore()

  const [summary, setSummary] = useState<WeeklyActivitySummary>(initialSummary)
  const [nextMeeting, setNextMeeting] = useState<Event | null>(null)
  const [todayPendingTasks, setTodayPendingTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true)
      setError(null)

      const [
        weeklyRes,
        nextMeetingRes,
        todayTasksRes
      ] = await Promise.all([
        getWeeklyActivitySummaryAction(user.id),
        getNextMeetingAction(user.id),
        getTodayPendingTasksAction(user.id)
      ])

      const errors: string[] = []

      if (weeklyRes.success && weeklyRes.data) setSummary(weeklyRes.data)
      else errors.push(weeklyRes.error || "No se pudo obtener el resumen semanal")

      if (nextMeetingRes.success) setNextMeeting(nextMeetingRes.data)
      else errors.push(nextMeetingRes.error || "No se pudo obtener la próxima reunión")

      if (todayTasksRes.success && todayTasksRes.data) setTodayPendingTasks(todayTasksRes.data)
      else errors.push(todayTasksRes.error || "No se pudieron obtener las tareas pendientes de hoy")

      if (errors.length > 0) {
        setError(errors.join(" | "))
      }

      setLoading(false)
    }

    if (user.id) {
      fetchSummary()
    }
  }, [user.id])

  return {
    summary,
    nextMeeting,
    todayPendingTasks,
    loading,
    error
  }
}
