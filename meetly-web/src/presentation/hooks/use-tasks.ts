import { useCallback, useEffect } from "react"

import { createTaskAction } from "../../domain/actions/tasks/create-task.action"
import { deleteTaskAction } from "../../domain/actions/tasks/delete-task.action"
import { getUserTasksAction } from "../../domain/actions/tasks/get-user-tasks.action"
import { updateTaskAction } from "../../domain/actions/tasks/update-task.action"
import type { Task } from "../../domain/entities/task.entity"
import type { CreateUpdateTaskDto } from "../../infrastructure/dtos/task.dto"
import { addTask, deleteTask, fetchTasks, onEditTask, onError, onFetchingTasks, updateTask } from "../store/tasks/tasks.slice"
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

  const handleAddTask = async (task: Omit<CreateUpdateTaskDto, "userId">) => {
    const data = await createTaskAction({
      ...task,
      userId: user?.id || "",
    })

    if (data.success) {
      const newTask: Task = {
        id: data.data || "",
        ...task,
        userId: user?.id || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      dispatch(addTask(newTask))
    }

    if (!data.success) {
      dispatch(onError(data.error || "Error desconocido"))
    }
  }

  const handleUpdateTask = async (task: Task) => {
    const data = await updateTaskAction(task.id, task)

    if (data.success) {
      dispatch(updateTask(task))
    }

    if (!data.success) {
      dispatch(onError(data.error || "Error desconocido"))
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    const data = await deleteTaskAction(taskId)

    if (data.success) {
      dispatch(deleteTask(taskId))
    }

    if (!data.success) {
      dispatch(onError(data.error || "Error desconocido"))
    }
  }

  const handleSetEditingTask = (task: Task | null) => {
    dispatch(onEditTask(task))
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

    handleSetEditingTask,
  }
}
