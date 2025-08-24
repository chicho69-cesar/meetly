import { useCallback, useEffect } from "react"

import { getUserTasksAction } from "../../domain/actions/tasks/get-user-tasks.action"
import type { Task } from "../../domain/entities/task.entity"
import { onError } from "../store/auth/auth.slice"
import { fetchTasks, onFetchingTasks } from "../store/tasks/tasks.slice"
import useAuthStore from "./use-auth-store"
import { useMeetlyDispatch, useMeetlySelector } from "./use-store"

export default function useTasks() {
  const { tasks, loading, error, editingTask } = useMeetlySelector((state) => state.tasks)
  const dispatch = useMeetlyDispatch()
  const { user } = useAuthStore()

  const initTasks = useCallback(async () => {
    if (!user) return
    dispatch(onFetchingTasks())

    const data = await getUserTasksAction(user.id)

    if (data.success) {
      dispatch(fetchTasks(data.data))
    }

    if (!data.success) {
      dispatch(onError(data.error || "Error desconocido"))
    }
  }, [dispatch, user])

  useEffect(() => {
    initTasks()
  }, [initTasks])

  const handleAddTask = (task: Task) => {
    console.log("Add task", task)
  }

  const handleUpdateTask = (task: Task) => {
    console.log("Update task", task)
  }

  const handleDeleteTask = (taskId: string) => {
    console.log("Delete task", taskId)
  }

  return {
    tasks,
    loading,
    error,
    editingTask,

    refetch: initTasks,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
  }
}
