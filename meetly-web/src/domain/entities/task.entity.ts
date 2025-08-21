export interface Task {
  id: string
  title: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  userId: string
  createdAt: Date
  updatedAt: Date
}
