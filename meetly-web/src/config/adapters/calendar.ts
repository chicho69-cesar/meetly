import { format, getDay, parse, startOfWeek } from "date-fns"
import { es } from "date-fns/locale"
import { dateFnsLocalizer } from "react-big-calendar"

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    "es": es,
  },
})

export const MESSAGES_ES = {
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos',
  showMore: (total: number | string) => `+ Ver más (${total})`
}
