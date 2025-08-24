import { Timestamp } from "firebase/firestore"

export interface TaskDto {
  id: string
  title: string
  description: string
  dueDate: Timestamp
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  userId: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CreateUpdateTaskDto {
  title: string
  description: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  userId: string
}
