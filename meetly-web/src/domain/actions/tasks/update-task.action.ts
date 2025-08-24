import { doc, Timestamp, updateDoc } from "firebase/firestore"

import { FIRESTORE_TASKS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { CreateUpdateTaskDto } from "../../../infrastructure/dtos/task.dto"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"

export async function updateTaskAction(
  taskId: string,
  task: Partial<CreateUpdateTaskDto>
): Promise<ApiResponse<void>> {
  try {
    const taskRef = doc(firestore, FIRESTORE_TASKS_COLLECTION, taskId)

    const updatedData = {
      ...task,
      updatedAt: Timestamp.now(),
      dueDate: task.dueDate instanceof Date ? Timestamp.fromDate(task.dueDate) : task.dueDate,
    }

    await updateDoc(taskRef, updatedData)

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
