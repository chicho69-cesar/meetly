import { createSlice } from "@reduxjs/toolkit"
import type { Event } from "../../../domain/entities/event.entity"

export interface EventsState {
  events: Event[]
  loading: boolean
  error?: string
  editingEvent: Event | null
}

export const initialEventsState: EventsState = {
  events: [],
  loading: false,
  error: undefined,
  editingEvent: null,
}

export const eventsSlice = createSlice({
  initialState: initialEventsState,
  name: 'events',
  reducers: {
    onFetchingEvents: (state) => {
      state.loading = true
      state.error = undefined
      state.events = []
    },

    fetchEvents: (state, action) => {
      state.loading = false
      state.error = undefined
      state.events = action.payload as Event[]
    },

    onError: (state, action) => {
      state.loading = false
      state.error = action.payload as string
      state.events = []
    },

    addEvent: (state, action) => {
      state.events.push(action.payload as Event)
    },

    updateEvent: (state, action) => {
      const updatedEvent = action.payload as Event
      const index = state.events.findIndex((event) => event.id === updatedEvent.id)

      if (index === -1) {
        state.error = "Error, el evento no existe"
        return
      }

      state.events[index] = updatedEvent
      state.editingEvent = null
    },

    deleteEvent: (state, action) => {
      const eventId = action.payload as string
      const index = state.events.findIndex((event) => event.id === eventId)

      if (index === -1) {
        state.error = "Error, el evento no existe"
        return
      }

      state.events.splice(index, 1)
      state.editingEvent = null
    },

    onEditEvent: (state, action) => {
      state.editingEvent = action.payload as Event | null
    },
  }
})

export const {
  onFetchingEvents,
  fetchEvents,
  onError,
  addEvent,
  updateEvent,
  deleteEvent,
  onEditEvent,
} = eventsSlice.actions

export default eventsSlice.reducer
