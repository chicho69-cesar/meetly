import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../config/firebase/firebase-config"
import type { AuthResponse, ErrorResponse } from "../../../infrastructure/interfaces/auth.response"
import { UserMapper } from "../../../infrastructure/mappers/user.mapper"

interface LoginActionParams {
  email: string
  password: string
}

export async function loginAction({ email, password }: LoginActionParams): Promise<AuthResponse> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const user = UserMapper.fromUserToEntity(result.user)

    return {
      ok: true,
      user,
      errorCode: null,
      errorMessage: null
    }
  } catch (error: unknown) {
    console.error("Error during login:", error)
    const { code: errorCode } = error as ErrorResponse

    const customError: {
      [key: string]: string
    } = {
      "auth/invalid-credential": "Credenciales inválidas",
      "auth/user-not-found": "Usuario no encontrado",
      "auth/wrong-password": "Contraseña incorrecta",
      "auth/too-many-requests": "Demasiados intentos fallidos, por favor, inténtalo más tarde",
      "auth/network-request-failed": "Error de red, por favor, verifica tu conexión a Internet",
    }

    return {
      ok: false,
      user: null,
      errorCode,
      errorMessage: customError[errorCode] || "Error desconocido al iniciar sesión"
    }
  }
}
