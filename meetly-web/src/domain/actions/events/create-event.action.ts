import { addDoc, collection, Timestamp } from "firebase/firestore"

import { FIRESTORE_EVENTS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"
import { EventMapper } from "../../../infrastructure/mappers/event.mapper"
import type { Event } from "../../entities/event.entity"

export async function createEventAction(event: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<ApiResponse<string>> {
  try {
    const eventDto = EventMapper.toDto(event)
    const eventsRef = collection(firestore, FIRESTORE_EVENTS_COLLECTION)

    const docRef = await addDoc(eventsRef, {
      ...eventDto,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    return {
      success: true,
      data: docRef.id,
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
