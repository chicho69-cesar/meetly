export interface CalendarEvent {
  id: string
  title: string
  description: string
  start: Date
  end: Date
  meetingLink: string | undefined
  tags: string[]
  color: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
