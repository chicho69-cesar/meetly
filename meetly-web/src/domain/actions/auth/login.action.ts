import { signInWithEmailAndPassword } from "firebase/auth"
import type { AuthResponse, ErrorResponse } from "../../../infrastructure/interfaces/auth.response"
import { auth } from "../../../config/firebase/firebase-config"
import { fromUserToEntity } from "../../../infrastructure/mappers/user.mapper"

interface LoginActionParams {
  email: string
  password: string
}

export async function loginAction({ email, password }: LoginActionParams): Promise<AuthResponse> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const user = fromUserToEntity(result.user)

    return {
      ok: true,
      user,
      errorCode: null,
      errorMessage: null
    }
  } catch (error: unknown) {
    console.error("Error during login:", error)
    const { code: errorCode, message: errorMessage } = error as ErrorResponse

    return {
      ok: false,
      user: null,
      errorCode,
      errorMessage
    }
  }
}
