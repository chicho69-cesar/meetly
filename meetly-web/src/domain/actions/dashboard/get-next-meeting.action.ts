import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore"

import { FIRESTORE_EVENTS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { EventDto } from "../../../infrastructure/dtos/event.dto"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"
import { EventMapper } from "../../../infrastructure/mappers/event.mapper"
import type { Event } from "../../entities/event.entity"

export async function getNextMeetingAction(userId: string): Promise<ApiResponse<Event | null>> {
  try {
    const now = new Date()
    const eventsRef = collection(firestore, FIRESTORE_EVENTS_COLLECTION)

    const q = query(
      eventsRef,
      where("userId", "==", userId),
      where("startDate", ">=", Timestamp.fromDate(now)),
      orderBy("startDate", "asc"),
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return { data: null, error: null, success: true }
    }

    const data = querySnapshot.docs[0].data()
    const nextEventData = { ...data, id: querySnapshot.docs[0].id } as EventDto
    const nextEvent = EventMapper.toEntity(nextEventData)

    return {
      success: true,
      data: nextEvent,
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
