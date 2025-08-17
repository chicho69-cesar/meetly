import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"

import { showErrorAlert } from "../../config/adapters/alerts"
import { auth } from "../../config/firebase/firebase-config"
import { loginAction } from "../../domain/actions/auth/login.action"
import { fromUserToEntity } from "../../infrastructure/mappers/user.mapper"
import { login, logout } from "../store/auth/auth.slice"
import { useMeetlyDispatch, useMeetlySelector } from "./use-store"
import { registerAction } from "../../domain/actions/auth/register.action"
import { logoutAction } from "../../domain/actions/auth/logout.action"
import { loginWithGoogleAction } from "../../domain/actions/auth/login-with-google.action"

export default function useAuthStore() {
  const { status, user, errorMessage } = useMeetlySelector((state) => state.auth)
  const dispatch = useMeetlyDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(logout(undefined))
        return
      }

      const user = fromUserToEntity(firebaseUser)
      dispatch(login(user))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (email: string, password: string) => {
    const data = await loginAction({ email, password })

    if (data.ok) {
      dispatch(login(data.user))
    } else {
      showErrorAlert(data.errorMessage || "Error al iniciar sesión")
      dispatch(logout(data.errorMessage))
    }

    return data
  }

  const handleRegister = async (name: string, email: string, password: string, confirm: string) => {
    if (password !== confirm) {
      showErrorAlert("Las contraseñas no coinciden")
      return
    }

    const data = await registerAction({ fullName: name, email, password })

    if (data.ok) {
      dispatch(login(data.user))
    } else {
      showErrorAlert(data.errorMessage || "Error al registrarse")
      dispatch(logout(data.errorMessage))
    }

    return data
  }

  const handleGoogleLogin = async () => {
    const data = await loginWithGoogleAction()

    if (data.ok) {
      dispatch(login(data.user))
    } else {
      showErrorAlert(data.errorMessage || "Error al iniciar sesión con Google")
      dispatch(logout(data.errorMessage))
    }

    return data
  }

  const handleLogout = async () => {
    await logoutAction()
    dispatch(logout(undefined))
  }

  return {
    status,
    user,
    error: errorMessage,

    handleLogin,
    handleRegister,
    handleGoogleLogin,
    handleLogout,
  }
}
