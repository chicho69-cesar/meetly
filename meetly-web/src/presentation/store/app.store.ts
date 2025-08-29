import { configureStore, type Middleware } from "@reduxjs/toolkit"

import { THEME_STORAGE_KEY } from "../../config/constants/storage.constant"
import { authSlice } from "./auth/auth.slice"
import { eventsSlice } from "./events/events.slice"
import { tasksSlice } from "./tasks/tasks.slice"
import { uiSlice } from "./ui/ui.slice"

const persistenceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)

  const currentTheme = store.getState().ui.theme

  window.localStorage.setItem(THEME_STORAGE_KEY, currentTheme)
  document.documentElement.setAttribute("data-theme", currentTheme)
}

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    events: eventsSlice.reducer,
    tasks: tasksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(persistenceLocalStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
