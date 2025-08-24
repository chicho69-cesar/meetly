import { Timestamp } from "firebase/firestore"
import type { Task } from "../../domain/entities/task.entity"
import type { TaskDto } from "../dtos/task.dto"

export class TaskMapper {
  static toEntity(dto: TaskDto): Task {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate.toDate(),
      priority: dto.priority,
      status: dto.status,
      userId: dto.userId,
      createdAt: dto.createdAt.toDate(),
      updatedAt: dto.updatedAt.toDate()
    }
  }

  static toDto(entity: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Omit<TaskDto, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      title: entity.title,
      description: entity.description,
      dueDate: Timestamp.fromDate(entity.dueDate),
      priority: entity.priority,
      status: entity.status,
      userId: entity.userId,
    }
  }
}
