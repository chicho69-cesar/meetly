import { addDoc, collection, Timestamp } from "firebase/firestore"

import { FIRESTORE_TASKS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { CreateUpdateTaskDto } from "../../../infrastructure/dtos/task.dto"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"
import { TaskMapper } from "../../../infrastructure/mappers/task.mapper"

export async function createTaskAction(task: CreateUpdateTaskDto): Promise<ApiResponse<string>> {
  try {
    const taskDto = TaskMapper.toDto(task)
    const tasksRef = collection(firestore, FIRESTORE_TASKS_COLLECTION)

    const docRef = await addDoc(tasksRef, {
      ...taskDto,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    return {
      success: true,
      data: docRef.id,
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
