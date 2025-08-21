import { deleteDoc, doc } from "firebase/firestore"

import { FIRESTORE_TASKS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"

export async function deleteTaskAction(taskId: string): Promise<ApiResponse<void>> {
  try {
    const taskRef = doc(firestore, FIRESTORE_TASKS_COLLECTION, taskId)
    await deleteDoc(taskRef)

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
