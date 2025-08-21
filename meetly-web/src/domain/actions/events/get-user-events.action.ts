import { collection, getDocs, orderBy, query, where } from "firebase/firestore"

import { FIRESTORE_EVENTS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { EventDto } from "../../../infrastructure/dtos/event.dto"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"
import { EventMapper } from "../../../infrastructure/mappers/event.mapper"
import type { Event } from "../../entities/event.entity"

export async function getUserEventsAction(userId: string): Promise<ApiResponse<Event[]>> {
  try {
    const eventsRef = collection(firestore, FIRESTORE_EVENTS_COLLECTION)
    const q = query(eventsRef, where("userId", "==", userId), orderBy("startDate", "asc"))
    const querySnapshot = await getDocs(q)

    const events: Event[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const eventData = { ...data, id: doc.id } as EventDto
      events.push(EventMapper.toEntity(eventData))
    })

    return {
      success: true,
      data: events,
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
