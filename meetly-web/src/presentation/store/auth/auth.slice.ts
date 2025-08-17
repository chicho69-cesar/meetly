import { createSlice } from "@reduxjs/toolkit"
import type { User } from "../../../domain/entities/user.entity"

export interface AuthState {
  status: 'checking' | 'authenticated' | 'unauthenticated' | 'error'
  user: User
  errorMessage?: string
}

export const initialAuthState: AuthState = {
  status: 'checking',
  user: {
    id: '',
    name: '',
    fullName: '',
    email: '',
    avatarUrl: undefined,
  },
  errorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    onCheckingCredentials: (state) => {
      state.status = 'checking'
      state.user = initialAuthState.user
      state.errorMessage = undefined
    },

    login: (state, action) => {
      const user = action.payload as User

      state.status = 'authenticated'
      state.user = user
      state.errorMessage = undefined
    },

    logout: (state, action) => {
      state.status = 'unauthenticated'
      state.user = initialAuthState.user
      state.errorMessage = action.payload as string | undefined
    },

    onError: (state, action) => {
      state.status = 'error'
      state.errorMessage = action.payload as string
    },

    clearErrorMessage: (state) => {
      state.errorMessage = undefined
    }
  }
})

export const {
  onCheckingCredentials,
  login,
  logout,
  onError,
  clearErrorMessage
} = authSlice.actions
