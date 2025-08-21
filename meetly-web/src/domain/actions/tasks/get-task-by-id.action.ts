import { doc, getDoc } from "firebase/firestore"

import { FIRESTORE_TASKS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { TaskDto } from "../../../infrastructure/dtos/task.dto"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"
import { TaskMapper } from "../../../infrastructure/mappers/task.mapper"
import type { Task } from "../../entities/task.entity"

export async function getTaskByIdAction(taskId: string): Promise<ApiResponse<Task>> {
  try {
    const taskRef = doc(firestore, FIRESTORE_TASKS_COLLECTION, taskId)
    const taskSnapshot = await getDoc(taskRef)

    if (!taskSnapshot.exists()) {
      return {
        success: false,
        data: null,
        error: "Tarea no encontrada",
      }
    }

    const data = taskSnapshot.data()
    const taskData = { ...data, id: taskSnapshot.id } as TaskDto
    const task = TaskMapper.toEntity(taskData)

    return {
      success: true,
      data: task,
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
