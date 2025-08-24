import { createSlice } from "@reduxjs/toolkit"
import type { Task } from "../../../domain/entities/task.entity"

export interface TasksState {
  tasks: Task[]
  loading: boolean
  error?: string
  editingTask: Task | null
}

export const initialTasksState: TasksState = {
  tasks: [],
  loading: false,
  error: undefined,
  editingTask: null,
}

export const tasksSlice = createSlice({
  initialState: initialTasksState,
  name: 'tasks',
  reducers: {
    onFetchingTasks: (state) => {
      state.loading = true
      state.error = undefined
      state.tasks = []
    },

    fetchTasks: (state, action) => {
      state.loading = false
      state.error = undefined
      state.tasks = action.payload as Task[]
    },

    onError: (state, action) => {
      state.loading = false
      state.error = action.payload as string
      state.tasks = []
    },

    addTask: (state, action) => {
      state.tasks.push(action.payload as Task)
    },

    updateTask: (state, action) => {
      const updatedTask = action.payload as Task
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id)

      if (index === -1) {
        state.error = "Error, la tarea no existe"
        return
      }

      state.tasks[index] = updatedTask
    },

    deleteTask: (state, action) => {
      const taskId = action.payload as string
      const index = state.tasks.findIndex((task) => task.id === taskId)

      if (index === -1) {
        state.error = "Error, la tarea no existe"
        return
      }

      state.tasks = state.tasks.filter((task) => task.id !== taskId)
    },

    onEditTask: (state, action) => {
      const task = action.payload as Task | null
      state.editingTask = task
    },
  }
})

export const {
  onFetchingTasks,
  fetchTasks,
  onError,
  addTask,
  updateTask,
  deleteTask,
  onEditTask,
} = tasksSlice.actions

export default tasksSlice.reducer
