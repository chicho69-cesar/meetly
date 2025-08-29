import "react-big-calendar/lib/css/react-big-calendar.css"
import "./calendar.style.css"


import { useMemo, useState } from "react"
import { Calendar as BigCalendar, type SlotInfo, type View } from "react-big-calendar"

import { localizer, MESSAGES_ES } from "../../../../config/adapters/calendar"
import { THEMES_COLORS } from "../../../../config/constants/themes.constant"
import type { CalendarEvent as CalendarEventType } from "../../../../infrastructure/interfaces/calendar.interface"
import type { DatesEvent } from "../../../../infrastructure/interfaces/dates.interface"
import { CalendarMapper } from "../../../../infrastructure/mappers/calendar.mapper"
import useEvents from "../../../hooks/use-events"
import useUI from "../../../hooks/use-ui"
import ConfirmationModal from "../../ui/confirmation-modal/confirmation-modal"
import CalendarEventModal from "../calendar-event-modal/calendar-event-modal"
import CalendarEvent from "../calendar-event/calendar-event"
import EventDetails from "../event-details/event-details"

export default function Calendar() {
  const { events, handleSetEditingEvent, handleDeleteEvent } = useEvents()
  const { theme, calendarView, setCalendarView } = useUI()

  const [date, setDate] = useState<Date>(new Date())
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [eventDates, setEventDates] = useState<DatesEvent | null>(null)
  const [viewEvent, setViewEvent] = useState<CalendarEventType | null>(null)

  const calendarEvents = useMemo(() => events.map(CalendarMapper.toCalendar), [events])

  const eventStyleGetter = (event: CalendarEventType) => {
    const style = {
      backgroundColor: event.color || THEMES_COLORS[theme],
      borderRadius: "8px",
      color: "white",
    }

    return { style }
  }

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setEventDates({
      startDate: slotInfo.start instanceof Date ? slotInfo.start.toISOString().slice(0, 16) : "",
      endDate: slotInfo.end instanceof Date ? slotInfo.end.toISOString().slice(0, 16) : "",
    })

    setShowModal(true)
  }

  const handleSelect = (event: CalendarEventType) => {
    setViewEvent(event)
  }

  const handleViewChange = (view: View) => {
    setCalendarView(view)
  }

  const handleNavigate = (newDate: Date) => {
    setDate(newDate)
  }

  const handleEdit = () => {
    setEventDates({
      startDate: viewEvent?.start.toISOString().slice(0, 16) || "",
      endDate: viewEvent?.end.toISOString().slice(0, 16) || ""
    })

    setShowModal(true)
    setViewEvent(null)

    if (viewEvent) {
      const editing = events.find((ev) => ev.id === viewEvent.id) || null
      handleSetEditingEvent(editing)
    }
  }

  const handleDelete = async () => {
    await handleDeleteEvent(viewEvent?.id || "")

    setViewEvent(null)
    setShowDeleteModal(false)
  }

  return (
    <>
      <BigCalendar
        culture="es"
        localizer={localizer}
        events={calendarEvents}
        defaultView={calendarView}
        view={calendarView}
        date={date}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: "calc( 100vh - 80px )", marginTop: "20px" }}
        messages={MESSAGES_ES}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelect}
        onView={handleViewChange}
        onNavigate={handleNavigate}
      />

      {showModal && (
        <CalendarEventModal
          onCloseModal={() => {
            setShowModal(false);
            setEventDates(null);
          }}
          dates={eventDates}
        />
      )}

      {viewEvent && (
        <EventDetails
          event={viewEvent}
          onClose={() => setViewEvent(null)}
          onEdit={handleEdit}
          onDelete={() => setShowDeleteModal(true)}
        />
      )}

      {showDeleteModal && (
        <ConfirmationModal
          message="¿Estás seguro de que deseas eliminar este evento?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  )
}
