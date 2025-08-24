import { createSlice } from "@reduxjs/toolkit"
import { TASK_VIEW_STORAGE_KEY, THEME_STORAGE_KEY } from "../../../config/constants/storage.constant"
import { THEMES_OPTIONS } from "../../../config/constants/themes.constant"
import type { Theme } from "../../../infrastructure/interfaces/theme.interface"

interface UIState {
  modal: null | "bell" | "settings" | "user"
  theme: Theme
  taskView: "list" | "kanban"
}

const initialState: UIState = (() => {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  const storedTaskView = window.localStorage.getItem(TASK_VIEW_STORAGE_KEY) || "list"

  if (!storedTheme) {
    window.localStorage.setItem(THEME_STORAGE_KEY, "indigo")

    return {
      modal: null,
      theme: "indigo",
      taskView: storedTaskView as "list" | "kanban",
    }
  }

  return {
    modal: null,
    theme: storedTheme as Theme || "indigo",
    taskView: storedTaskView as "list" | "kanban",
  }
})()

export const uiSlice = createSlice({
  initialState: initialState,
  name: "ui",
  reducers: {
    openModal: (state, action) => {
      state.modal = action.payload
    },
    closeModal: (state) => {
      state.modal = null
    },
    setTheme: (state, action) => {
      const newTheme = action.payload

      if (THEMES_OPTIONS.includes(newTheme)) {
        state.theme = newTheme
      }
    },
    setTaskView: (state, action) => {
      const newView = action.payload

      if (newView === "list" || newView === "kanban") {
        state.taskView = newView
        window.localStorage.setItem(TASK_VIEW_STORAGE_KEY, newView)
      }
    },
  },
})

export const {
  openModal,
  closeModal,
  setTheme,
  setTaskView,
} = uiSlice.actions

export default uiSlice.reducer
