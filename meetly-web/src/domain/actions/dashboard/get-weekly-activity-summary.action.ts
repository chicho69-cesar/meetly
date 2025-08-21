import { collection, getDocs, query, Timestamp, where } from "firebase/firestore"

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

    const completedTasksQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("status", "==", "completed"),
      where("updatedAt", ">=", Timestamp.fromDate(weekStart)),
      where("updatedAt", "<=", Timestamp.fromDate(weekEnd))
    )

    const pendingTasksQuery = query(
      collection(firestore, FIRESTORE_TASKS_COLLECTION),
      where("userId", "==", userId),
      where("status", "in", ["pending", "in-progress"])
    )

    const upcomingEventsQuery = query(
      collection(firestore, FIRESTORE_EVENTS_COLLECTION),
      where("userId", "==", userId),
      where("startDate", ">=", Timestamp.fromDate(weekStart)),
      where("startDate", "<=", Timestamp.fromDate(weekEnd))
    )

    const [completedTasksSnapshot, pendingTasksSnapshot, upcomingEventsSnapshot] = await Promise.all([
      getDocs(completedTasksQuery),
      getDocs(pendingTasksQuery),
      getDocs(upcomingEventsQuery)
    ])

    const summary = {
      completedTasks: completedTasksSnapshot.size,
      pendingTasks: pendingTasksSnapshot.size,
      upcomingEvents: upcomingEventsSnapshot.size
    }

    return {
      success: true,
      data: summary,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: {
        completedTasks: 0,
        pendingTasks: 0,
        upcomingEvents: 0,
      },
      error: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
