import type { Event } from "../../domain/entities/event.entity"
import type { CalendarEvent } from "../interfaces/calendar.interface"

export class CalendarMapper {
  static toEntity(event: CalendarEvent): Event {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      startDate: event.start,
      endDate: event.end,
      meetingLink: event.meetingLink,
      tags: event.tags,
      color: event.color,
      userId: event.userId,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    }
  }

  static toCalendar(event: Event): CalendarEvent {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      meetingLink: event.meetingLink,
      tags: event.tags,
      color: event.color,
      userId: event.userId,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    }
  }
}
