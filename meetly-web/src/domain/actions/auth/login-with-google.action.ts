import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../../config/firebase/firebase-config"
import type { AuthResponse, ErrorResponse } from "../../../infrastructure/interfaces/auth.response"
import { fromUserToEntity } from "../../../infrastructure/mappers/user.mapper"

const googleProvider = new GoogleAuthProvider()

export async function loginWithGoogleAction(): Promise<AuthResponse> {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = fromUserToEntity(result.user)

    return {
      ok: true,
      user,
      errorCode: null,
      errorMessage: null
    }
  } catch (error: unknown) {
    console.error("Error during Google login:", error)
    const { code: errorCode, message: errorMessage } = error as ErrorResponse

    return {
      ok: false,
      user: null,
      errorCode,
      errorMessage
    }
  }
}
