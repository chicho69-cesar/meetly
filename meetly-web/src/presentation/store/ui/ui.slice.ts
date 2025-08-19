import { createSlice } from "@reduxjs/toolkit"
import { THEME_STORAGE_KEY } from "../../../config/constants/storage.constant"
import { THEMES_OPTIONS } from "../../../config/constants/themes.constant"
import type { Theme } from "../../../infrastructure/interfaces/theme.interface"

interface UIState {
  modal: null | "bell" | "settings" | "user"
  theme: Theme
}

const initialState: UIState = (() => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)

  if (storedTheme == null) {
    localStorage.setItem(THEME_STORAGE_KEY, "indigo")
    return { modal: null, theme: "indigo" }
  }

  if (THEMES_OPTIONS.includes(storedTheme)) {
    return { modal: null, theme: storedTheme as UIState["theme"] }
  }

  localStorage.setItem(THEME_STORAGE_KEY, "indigo")
  return { modal: null, theme: "indigo" }
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
  },
})

export const {
  openModal,
  closeModal,
  setTheme,
} = uiSlice.actions

export default uiSlice.reducer
