import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore"
import { FIRESTORE_EVENTS_COLLECTION, FIRESTORE_TASKS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"
import type { WeeklyActivitySummary } from "../../../infrastructure/interfaces/summary.interface"

export async function getWeeklyActivitySummaryAction(userId: string): Promise<ApiResponse<WeeklyActivitySummary>> {
  try {
    const now = new Date()
    const weekStart = new Date(now)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 7)
    weekEnd.setHours(23, 59, 59, 999)

    // Semana anterior para comparación
    const lastWeekStart = new Date(weekStart)
    lastWeekStart.setDate(lastWeekStart.getDate() - 7)

    const lastWeekEnd = new Date(lastWeekStart)
    lastWeekEnd.setDate(lastWeekEnd.getDate() + 7)
    lastWeekEnd.setHours(23, 59, 59, 999)

    // Consultas para la semana actual
    const completedTasksQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("status", "==", "completed"),
      where("updatedAt", ">=", Timestamp.fromDate(weekStart)),
      where("updatedAt", "<=", Timestamp.fromDate(weekEnd))
    )

    const allTasksThisWeekQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("updatedAt", ">=", Timestamp.fromDate(weekStart)),
      where("updatedAt", "<=", Timestamp.fromDate(weekEnd))
    )

    const pendingTasksQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("status", "in", ["pending", "in-progress"])
    )

    const inProgressTasksQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("status", "==", "in-progress")
    )

    const overdueTasksQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("status", "in", ["pending", "in-progress"]),
      where("dueDate", "<", Timestamp.fromDate(now))
    )

    const nearestTaskQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("status", "in", ["pending", "in-progress"]),
      where("dueDate", ">=", Timestamp.fromDate(now)),
      orderBy("dueDate", "asc")
    )

    const upcomingEventsQuery = query(
      collection(firestore, FIRESTORE_EVENTS_COLLECTION),
      where("userId", "==", userId),
      where("startDate", ">=", Timestamp.fromDate(weekStart)),
      where("startDate", "<=", Timestamp.fromDate(weekEnd))
    )

    const pastEventsQuery = query(
      collection(firestore, FIRESTORE_EVENTS_COLLECTION),
      where("userId", "==", userId),
      where("startDate", ">=", Timestamp.fromDate(weekStart)),
      where("startDate", "<", Timestamp.fromDate(now))
    )

    const nearestEventQuery = query(
      collection(firestore, FIRESTORE_EVENTS_COLLECTION),
      where("userId", "==", userId),
      where("startDate", ">=", Timestamp.fromDate(now)),
      orderBy("startDate", "asc")
    )

    const highPriorityTasksQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("priority", "==", "high")
    )

    const mediumPriorityTasksQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("priority", "==", "medium")
    )

    const lowPriorityTasksQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("priority", "==", "low")
    )

    // Consultas para la semana anterior (para comparación)
    const lastWeekCompletedTasksQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("status", "==", "completed"),
      where("updatedAt", ">=", Timestamp.fromDate(lastWeekStart)),
      where("updatedAt", "<=", Timestamp.fromDate(lastWeekEnd))
    )

    // Ejecutar todas las consultas en paralelo
    const [
      completedTasksSnapshot,
      allTasksThisWeekSnapshot,
      pendingTasksSnapshot,
      inProgressTasksSnapshot,
      overdueTasksSnapshot,
      nearestTaskSnapshot,
      upcomingEventsSnapshot,
      pastEventsSnapshot,
      nearestEventSnapshot,
      highPriorityTasksSnapshot,
      mediumPriorityTasksSnapshot,
      lowPriorityTasksSnapshot,
      lastWeekCompletedTasksSnapshot
    ] = await Promise.all([
      getDocs(completedTasksQuery),
      getDocs(allTasksThisWeekQuery),
      getDocs(pendingTasksQuery),
      getDocs(inProgressTasksQuery),
      getDocs(overdueTasksQuery),
      getDocs(nearestTaskQuery),
      getDocs(upcomingEventsQuery),
      getDocs(pastEventsQuery),
      getDocs(nearestEventQuery),
      getDocs(highPriorityTasksQuery),
      getDocs(mediumPriorityTasksQuery),
      getDocs(lowPriorityTasksQuery),
      getDocs(lastWeekCompletedTasksQuery)
    ])

    // Calcular progreso semanal
    const totalTasksThisWeek = allTasksThisWeekSnapshot.size
    const completedTasksThisWeek = completedTasksSnapshot.size
    const weeklyProgress = totalTasksThisWeek > 0
      ? Math.round((completedTasksThisWeek / totalTasksThisWeek) * 100)
      : 0

    // Calcular tendencia respecto a la semana anterior
    const lastWeekCompletedTasks = lastWeekCompletedTasksSnapshot.size
    let trendComparedToLastWeek = 0

    if (lastWeekCompletedTasks > 0) {
      trendComparedToLastWeek = Math.round(
        ((completedTasksThisWeek - lastWeekCompletedTasks) / lastWeekCompletedTasks) * 100
      )
    } else if (completedTasksThisWeek > 0) {
      trendComparedToLastWeek = 100 // No había tareas la semana pasada, pero sí esta semana
    }

    // Calcular promedio diario de tareas completadas
    const daysPassedThisWeek = Math.min(now.getDay() + 1, 7) // +1 porque getDay() devuelve 0-6 (dom-sáb)
    const dailyAverageCompleted = daysPassedThisWeek > 0
      ? parseFloat((completedTasksThisWeek / daysPassedThisWeek).toFixed(1))
      : 0

    // Obtener tarea más próxima a vencer
    let nearestTask = undefined
    if (!nearestTaskSnapshot.empty) {
      const taskData = nearestTaskSnapshot.docs[0].data()
      nearestTask = {
        title: taskData.title,
        dueDate: taskData.dueDate.toDate()
      }
    }

    // Obtener evento más próximo
    let nearestEvent = undefined
    if (!nearestEventSnapshot.empty) {
      const eventData = nearestEventSnapshot.docs[0].data()
      nearestEvent = {
        title: eventData.title,
        startDate: eventData.startDate.toDate()
      }
    }

    // Crear el resumen completo
    const summary: WeeklyActivitySummary = {
      completedTasks: completedTasksThisWeek,
      pendingTasks: pendingTasksSnapshot.size,
      upcomingEvents: upcomingEventsSnapshot.size,
      weeklyProgress,
      overdueTasks: overdueTasksSnapshot.size,
      nearestTask,
      nearestEvent,
      priorityDistribution: {
        high: highPriorityTasksSnapshot.size,
        medium: mediumPriorityTasksSnapshot.size,
        low: lowPriorityTasksSnapshot.size
      },
      trendComparedToLastWeek,
      dailyAverageCompleted,
      inProgressTasks: inProgressTasksSnapshot.size,
      pastEvents: pastEventsSnapshot.size
    }

    return {
      success: true,
      data: summary,
      error: null,
    }
  } catch (error) {
    console.error("Error getting weekly summary:", error)
    return {
      success: false,
      data: {
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
      },
      error: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
