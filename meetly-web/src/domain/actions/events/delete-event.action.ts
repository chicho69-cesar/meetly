import { deleteDoc, doc } from "firebase/firestore"

import { FIRESTORE_EVENTS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"

export async function deleteEventAction(eventId: string): Promise<ApiResponse<void>> {
  try {
    const eventRef = doc(firestore, FIRESTORE_EVENTS_COLLECTION, eventId)
    await deleteDoc(eventRef)

    return {
      success: true,
      data: undefined,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
