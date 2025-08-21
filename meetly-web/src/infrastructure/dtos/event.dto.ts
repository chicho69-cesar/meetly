import { Timestamp } from "firebase/firestore"

export interface EventDto {
  id: string
  title: string
  description: string
  startDate: Timestamp
  endDate: Timestamp
  meetingLink?: string
  tags: string[]
  color: string
  userId: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
