import "react-big-calendar/lib/css/react-big-calendar.css"
import "./dashboard-page.styles.css"

import { useState } from "react"
import { Calendar, Views, type SlotInfo, type View } from "react-big-calendar"

import { localizer, MESSAGES_ES } from "../../../config/adapters/calendar"
import CalendarEvent from "../../components/calendar/calendar-event/calendar-event"
import Title from "../../components/ui/title/title"

export default function DashboardPage() {
  const [events, setEvents] = useState([])
  const [lastView, setLastView] = useState<View>(Views.WEEK)
  const [date, setDate] = useState<Date>(new Date())

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

  const handleNavigate = (newDate: Date) => {
    setDate(newDate)
  }

  return (
    <main className="w-full mx-auto max-w-6xl my-12">
      <Title
        text="Panel de control"
        subtitle="Bienvenido al panel de control."
      />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        view={lastView}
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
        onDoubleClickEvent={handleDoubleClick}
        onSelectEvent={handleSelect}
        onView={handleViewChange}
        onNavigate={handleNavigate}
      />
    </main>
  )
}
