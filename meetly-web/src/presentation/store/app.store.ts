import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./auth/auth.slice"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // immutableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
