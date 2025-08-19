import { configureStore, type Middleware } from "@reduxjs/toolkit"
import { THEME_STORAGE_KEY } from "../../config/constants/storage.constant"
import { authSlice } from "./auth/auth.slice"
import { uiSlice } from "./ui/ui.slice"

const persistenceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)

  window.localStorage.setItem(
    THEME_STORAGE_KEY,
    JSON.stringify(store.getState().ui.theme)
  )
}

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(persistenceLocalStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
