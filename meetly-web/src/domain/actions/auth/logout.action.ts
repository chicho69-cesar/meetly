import { auth } from "../../../config/firebase/firebase-config"

export async function logoutAction(): Promise<void> {
  try {
    return await auth.signOut()
  } catch (error: unknown) {
    console.error("Error during logout:", error)
  }
}
