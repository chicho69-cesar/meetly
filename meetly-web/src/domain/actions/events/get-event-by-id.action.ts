import { doc, getDoc } from "firebase/firestore"

import { FIRESTORE_EVENTS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { EventDto } from "../../../infrastructure/dtos/event.dto"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"
import { EventMapper } from "../../../infrastructure/mappers/event.mapper"
import type { Event } from "../../entities/event.entity"

export async function getEventByIdAction(eventId: string): Promise<ApiResponse<Event>> {
  try {
    const eventRef = doc(firestore, FIRESTORE_EVENTS_COLLECTION, eventId)
    const eventSnapshot = await getDoc(eventRef)

    if (!eventSnapshot.exists()) {
      return {
        success: false,
        data: null,
        error: "Evento no encontrado",
      }
    }

    const data = eventSnapshot.data()
    const eventData = { ...data, id: eventSnapshot.id } as EventDto
    const event = EventMapper.toEntity(eventData)

    return {
      success: true,
      data: event,
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
