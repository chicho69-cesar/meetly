import { createSlice } from "@reduxjs/toolkit"
import { Views, type View } from "react-big-calendar"
import { CALENDAR_VIEW_STORAGE_KEY, TASK_VIEW_STORAGE_KEY, THEME_STORAGE_KEY } from "../../../config/constants/storage.constant"
import { THEMES_OPTIONS } from "../../../config/constants/themes.constant"
import type { Theme } from "../../../infrastructure/interfaces/theme.interface"

interface UIState {
  modal: null | "bell" | "settings" | "user"
  theme: Theme
  calendarView: View
  taskView: "list" | "kanban"
}

const initialState: UIState = (() => {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  const storedCalendarView = window.localStorage.getItem(CALENDAR_VIEW_STORAGE_KEY) as View || Views.WEEK
  const storedTaskView = window.localStorage.getItem(TASK_VIEW_STORAGE_KEY) || "list"

  if (!storedTheme) {
    window.localStorage.setItem(THEME_STORAGE_KEY, "indigo")

    return {
      modal: null,
      theme: "indigo",
      taskView: storedTaskView as "list" | "kanban",
      calendarView: storedCalendarView as View,
    }
  }

  return {
    modal: null,
    theme: storedTheme as Theme || "indigo",
    calendarView: storedCalendarView as View,
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
    setCalendarView: (state, action) => {
      const newView = action.payload

      if (Object.values(Views).includes(newView)) {
        state.calendarView = newView
        window.localStorage.setItem(CALENDAR_VIEW_STORAGE_KEY, newView)
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
  setCalendarView,
  setTaskView,
} = uiSlice.actions

export default uiSlice.reducer
