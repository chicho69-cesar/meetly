import "react-big-calendar/lib/css/react-big-calendar.css"

import { useState } from "react"
import { Calendar as BigCalendar, Views, type SlotInfo, type View } from "react-big-calendar"

import { localizer, MESSAGES_ES } from "../../../../config/adapters/calendar"
import CalendarEvent from "../calendar-event/calendar-event"

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [lastView, setLastView] = useState<View>(Views.WEEK)

  const eventStyleGetter = (event: unknown, start: Date, end: Date, isSelected: boolean) => {
    console.log({ event, start, end, isSelected })
    // const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

    const style = {
      // backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    }

    return {
      style,
    }
  }

  const handleDoubleClick = () => {
    console.log("Double clicked on event")
    // openDateModal()
  }

  const handleSelect = (event: unknown) => {
    console.log("Selected event:", event)
    // openDateModal(event)
  }

  const handleViewChange = (view: View) => {
    console.log("View changed to:", view)
    setLastView(view)
    // localStorage.setItem("lastView", view)
  }

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    console.log("Selected slot:", slotInfo)
  }

  return (
    <BigCalendar
      culture="es"
      localizer={localizer}
      events={events}
      defaultView={lastView}
      view={lastView}
      startAccessor="start"
      endAccessor="end"
      selectable
      style={{ height: "calc( 100vh - 80px )" }}
      messages={MESSAGES_ES}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onSelectSlot={handleSelectSlot}
      onDoubleClickEvent={handleDoubleClick}
      onSelectEvent={handleSelect}
      onView={handleViewChange}
    />
  )
}
