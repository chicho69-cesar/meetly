import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../../config/firebase/firebase-config"
import type { AuthResponse, ErrorResponse } from "../../../infrastructure/interfaces/auth.response"
import { fromUserToEntity } from "../../../infrastructure/mappers/user.mapper"

interface RegisterActionParams {
  email: string
  password: string
  fullName: string
}

export async function registerAction({ email, password, fullName }: RegisterActionParams): Promise<AuthResponse> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = fromUserToEntity(result.user)

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
    const { code: errorCode, message: errorMessage } = error as ErrorResponse

    return {
      ok: false,
      user: null,
      errorCode,
      errorMessage
    }
  }
}
