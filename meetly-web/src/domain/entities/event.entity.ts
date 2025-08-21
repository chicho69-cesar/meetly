export interface Event {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  meetingLink?: string
  tags: string[]
  color: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export type EventPriority = "low" | "medium" | "high"
