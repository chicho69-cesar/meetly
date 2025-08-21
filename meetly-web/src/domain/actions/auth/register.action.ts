import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../../config/firebase/firebase-config"
import type { AuthResponse, ErrorResponse } from "../../../infrastructure/interfaces/auth.response"
import { UserMapper } from "../../../infrastructure/mappers/user.mapper"

interface RegisterActionParams {
  email: string
  password: string
  fullName: string
}

export async function registerAction({ email, password, fullName }: RegisterActionParams): Promise<AuthResponse> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = UserMapper.fromUserToEntity(result.user)

    await updateProfile(auth.currentUser!, { displayName: fullName })

    return {
      ok: true,
      user: {
        ...user,
        name: fullName,
        fullName
      },
      errorCode: null,
      errorMessage: null
    }
  } catch (error: unknown) {
    console.error("Error during registration:", error)
    const { code: errorCode } = error as ErrorResponse

    const customError: {
      [key: string]: string
    } = {
      "auth/email-already-in-use": "El correo electrónico ya está en uso",
      "auth/invalid-email": "Correo electrónico inválido",
      "auth/operation-not-allowed": "Operación no permitida",
      "auth/weak-password": "La contraseña es demasiado débil",
      "auth/network-request-failed": "Error de red, por favor, verifica tu conexión a Internet",
    }

    return {
      ok: false,
      user: null,
      errorCode,
      errorMessage: customError[errorCode] || "Error desconocido al registrarse"
    }
  }
}
