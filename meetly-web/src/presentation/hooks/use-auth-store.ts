import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"

import { auth } from "../../config/firebase/firebase-config"
import { fromUserToEntity } from "../../infrastructure/mappers/user.mapper"
import { login, logout } from "../store/auth/auth.slice"
import { useMeetlyDispatch, useMeetlySelector } from "./use-store"

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

  const handleLogin = async () => { }

  const handleRegister = async () => { }

  const handleCheckAuth = async () => { }

  const handleLogout = async () => { }

  return {
    status,
    user,
    error: errorMessage,

    handleLogin,
    handleRegister,
    handleCheckAuth,
    handleLogout,
  }
}
