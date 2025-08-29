import { doc, Timestamp, updateDoc } from "firebase/firestore"

import { FIRESTORE_EVENTS_COLLECTION } from "../../../config/constants/firebase.constant"
import { firestore } from "../../../config/firebase/firebase-config"
import type { CreateUpdateEventDto } from "../../../infrastructure/dtos/event.dto"
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response"

export async function updateEventAction(
  eventId: string,
  event: Partial<CreateUpdateEventDto>
): Promise<ApiResponse<void>> {
  try {
    const eventRef = doc(firestore, FIRESTORE_EVENTS_COLLECTION, eventId)

    const updatedData = {
      ...event,
      updatedAt: Timestamp.now(),
      startDate: event.startDate instanceof Date ? Timestamp.fromDate(event.startDate) : event.startDate,
      endDate: event.endDate instanceof Date ? Timestamp.fromDate(event.endDate) : event.endDate,
    }

    await updateDoc(eventRef, updatedData)

    return {
      success: true,
      data: undefined,
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
