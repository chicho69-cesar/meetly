import { Timestamp } from "firebase/firestore"
import type { Event } from "../../domain/entities/event.entity"
import type { EventDto } from "../dtos/event.dto"

export class EventMapper {
  static toEntity(dto: EventDto): Event {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      startDate: dto.startDate.toDate(),
      endDate: dto.endDate.toDate(),
      meetingLink: dto.meetingLink,
      tags: dto.tags,
      color: dto.color,
      userId: dto.userId,
      createdAt: dto.createdAt.toDate(),
      updatedAt: dto.updatedAt.toDate()
    }
  }

  static toDto(entity: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Omit<EventDto, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      title: entity.title,
      description: entity.description,
      startDate: Timestamp.fromDate(entity.startDate),
      endDate: Timestamp.fromDate(entity.endDate),
      meetingLink: entity.meetingLink,
      tags: entity.tags,
      color: entity.color,
      userId: entity.userId,
    }
  }
}
