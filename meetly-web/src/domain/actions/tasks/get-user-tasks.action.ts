import { collection, getDocs, orderBy, query, where } from "firebase/firestore"

import { FIRESTORE_TASKS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { TaskDto } from "../../../infrastructure/dtos/task.dto"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"
import { TaskMapper } from "../../../infrastructure/mappers/task.mapper"
import type { Task } from "../../entities/task.entity"

export async function getUserTasksAction(userId: string): Promise<ApiResponse<Task[]>> {
  try {
    const tasksRef = collection(firestore, FIRESTORE_TASKS_COLLECTION)
    const q = query(tasksRef, where("userId", "==", userId), orderBy("dueDate", "asc"))
    const querySnapshot = await getDocs(q)

    const tasks: Task[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const taskData = { ...data, id: doc.id } as TaskDto
      tasks.push(TaskMapper.toEntity(taskData))
    })

    return {
      success: true,
      data: tasks,
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
