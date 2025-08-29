import { useCallback, useEffect } from "react"

import { createEventAction } from "../../domain/actions/events/create-event.action"
import { deleteEventAction } from "../../domain/actions/events/delete-event.action"
import { getUserEventsAction } from "../../domain/actions/events/get-user-events.action"
import { updateEventAction } from "../../domain/actions/events/update-event.action"
import type { Event } from "../../domain/entities/event.entity"
import type { CreateUpdateEventDto } from "../../infrastructure/dtos/event.dto"
import { addEvent, deleteEvent, fetchEvents, onEditEvent, onError, onFetchingEvents, updateEvent } from "../store/events/events.slice"
import useAuthStore from "./use-auth-store"
import { useMeetlyDispatch, useMeetlySelector } from "./use-store"

export default function useEvents() {
  const { events, loading, error, editingEvent } = useMeetlySelector((state) => state.events)
  const dispatch = useMeetlyDispatch()
  const { user } = useAuthStore()

  const initEvents = useCallback(async () => {
    if (!user) return
    dispatch(onFetchingEvents())

    const data = await getUserEventsAction(user.id)

    if (data.success) {
      dispatch(fetchEvents(data.data))
    }

    if (!data.success) {
      dispatch(onError(data.error || "Error desconocido"))
    }
  }, [dispatch, user])

  useEffect(() => {
    initEvents()
  }, [initEvents])

  const handleAddEvent = async (event: Omit<CreateUpdateEventDto, "userId">) => {
    const data = await createEventAction({
      ...event,
      userId: user?.id || "",
    })

    if (data.success) {
      const newEvent: Event = {
        id: data.data || "",
        ...event,
        userId: user?.id || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      dispatch(addEvent(newEvent))
    }

    if (!data.success) {
      dispatch(onError(data.error || "Error desconocido"))
    }
  }

  const handleUpdateEvent = async (event: Event) => {
    const data = await updateEventAction(event.id, event)

    if (data.success) {
      dispatch(updateEvent(event))
    }

    if (!data.success) {
      dispatch(onError(data.error || "Error desconocido"))
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    const data = await deleteEventAction(eventId)

    if (data.success) {
      dispatch(deleteEvent(eventId))
    }

    if (!data.success) {
      dispatch(onError(data.error || "Error desconocido"))
    }
  }

  const handleSetEditingEvent = (event: Event | null) => {
    dispatch(onEditEvent(event))
  }

  return {
    events,
    loading,
    error,
    editingEvent,

    refetch: initEvents,
    handleAddEvent,
    handleUpdateEvent,
    handleDeleteEvent,

    handleSetEditingEvent,
  }
}
